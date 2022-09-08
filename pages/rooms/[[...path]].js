import * as styles from '../../styles/rooms.module.scss'

import { useEffect, useState, useRef } from 'react'

import Header from '../../components/Header'
import RoomsBar from '../../components/RoomsBar'
import CreateRoom from '../../components/CreateRoom'
import JoinRoom from '../../components/JoinRoom'
import Room from '../../components/Room'

import Head from 'next/head'

const CreateRoomPage = () => {
  const [path, setPath] = useState()
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)
  const [rooms, _setRooms] = useState([])

  const roomsRef = useRef(rooms)
  const setRooms = (data) => {
    roomsRef.current = data
    _setRooms(data)
  }
  
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

  const onMessage = (event) => {
    const json = JSON.parse(event.data)
    if ('message' in json) {
      var newRooms = [...roomsRef.current]
      for (var i = 0; i < newRooms.length; i++) {
        if (newRooms[i].id === json.id) {
          newRooms[i].messages.push({from: json.from, text: decrypt(json.message, newRooms[i].key)})
          setRooms(newRooms)
          break
        }
      }
    }
  }

  const joinRooms = (socket, rooms) => {
    socket.send(JSON.stringify({rooms: rooms}))
  }

  //Only once
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    const local_rooms = window.localStorage.getItem('rooms')
    if (local_rooms !== null) {
      setRooms(JSON.parse(local_rooms))
    }

    // Connection opened
    socket.addEventListener('open', (event) => {
      setSocket(socket)
      setLoading(false)
    });

      // Listen for messages
  }, [])

  useEffect(() => {
    if (socket !== null) {
      joinRooms(socket, rooms)
    }
  }, [socket])

  useEffect(() => {
    if (!loading) {
      socket.addEventListener('message', (event) => {
        onMessage(event)
      });
    }
  }, [loading])

  useEffect(() => {
    if (rooms.length !== 0) {
      localStorage.setItem('rooms', JSON.stringify(rooms))
    }
  }, [rooms])

  //Every page navigation
  useEffect(() => {
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
        <RoomsBar rooms={rooms} />
        <main className='roomsPageMain'>
        {
          loading || path === '/rooms' ?
          <></>
          : path === '/rooms/create' ? 
            <CreateRoom socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms} />
          : path === '/rooms/join' ?
            <JoinRoom socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms}/>
          : path === '/rooms/@me' || path === '' ?
          <></>
          : <Room id={path.replace('/rooms/', '')} rooms={rooms} socket={socket} />
        }
        </main>
      </div>
    </div>
  )
}

export default CreateRoomPage