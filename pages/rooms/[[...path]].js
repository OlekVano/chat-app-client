import { useEffect, useState, useRef } from 'react'

import Header from '../../components/Header'
import RoomsBar from '../../components/RoomsBar'
import CreateRoom from '../../components/CreateRoom'
import JoinRoom from '../../components/JoinRoom'
import Room from '../../components/Room'

import Head from 'next/head'

const CreateRoomPage = () => {
  const [path, setPath] = useState('')
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)
  const [rooms, _setRooms] = useState([])


  const roomsRef = useRef(rooms)
  const setRooms = (data) => {
    roomsRef.current = data
    _setRooms(data)
  }
  
  const encrypt = (text, key) => {
    const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
    const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
    const applyKeyToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);
  
    return text
      .split('')
      .map(textToChars)
      .map(applyKeyToChar)
      .map(byteHex)
      .join('');
  };

  const decrypt = (encrypted, key) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applyKeyToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);

    return encrypted
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applyKeyToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };

  const addRoom = (room) => {
    var newRooms = [...roomsRef.current]
    newRooms.push(room)
    setRooms(newRooms)
  }

  const onMessage = (event) => {
    const json = JSON.parse(event.data)
    if ('message' in json) {
      var newRooms = [...roomsRef.current]
      const room = newRooms.find(e => e.id === json.id)
      room.messages.push({from: json.from, text: decrypt(json.message, room.key)})
      document.getElementById('message-input').focus()
      const messagesContainer = document.getElementById('messagesContainer')
      messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      setRooms(newRooms)
    }
  }

  const joinRooms = (socket, rooms) => {
    socket.send(JSON.stringify({rooms: rooms}))
  }

  //Called once, when the user navigates to /rooms/... url for the first time
  //Not called if the user navigates to /rooms/123 while being on /rooms/ or /rooms/456
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    //Loads rooms from the local storage if they are present
    const local_rooms = window.localStorage.getItem('rooms')
    if (local_rooms !== null) {
      setRooms(JSON.parse(local_rooms))
    }

    socket.addEventListener('open', (event) => {
      setSocket(socket)
      setLoading(false)
    });
  }, [])

  //When socket connection is established, joins rooms
  useEffect(() => {
    if (socket === null) return
    joinRooms(socket, rooms)
  }, [socket])

  //When the variable "loading" has become false, adds an event listener to listen to messages
  useEffect(() => {
    if (loading) return 
    socket.addEventListener('message', (event) => {
      onMessage(event)
    });
  }, [loading])

  //When the variable "rooms" has been updated and is not empty, saves the updated rooms to the local storage
  useEffect(() => {
    if (rooms.length === 0) return
    localStorage.setItem('rooms', JSON.stringify(rooms))
  }, [rooms])

  //Called very page navigation
  useEffect(() => {
    //Needed in order to achieve the single page application experience
    setPath(location.pathname)
  })

  return (
    <div className='roomsPage'>
      <Head>
        <title>Datura</title>
        <meta name='description' content='The first trully anonymous messaging app' />
        <link rel='icon' href='/images/daturaLogo.png' />
      </Head>
      <Header />
      <div className='roomsPageContainer'>
        <RoomsBar rooms={rooms} selected_id={path.replace('/rooms/', '') || ''} />
        <main className='roomsPageMain'>
        {
          loading || path === '/rooms' ?
          <></>
          : path === '/rooms/create' ? 
            <CreateRoom socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms} addRoom={addRoom} />
          : path === '/rooms/join' ?
            <JoinRoom socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms} addRoom={addRoom} />
          : path === '/rooms/@me' || path === '' ?
          <></>
          : <Room id={path.replace('/rooms/', '')} socket={socket} encrypt={encrypt} rooms={rooms} />
        }
        </main>
      </div>
    </div>
  )
}

export default CreateRoomPage