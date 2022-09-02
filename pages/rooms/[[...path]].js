import * as styles from '../../styles/rooms.module.scss'

import { useEffect, useState, useRef } from 'react'

import Header from '../../components/Header'
import RoomsBar from '../../components/RoomsBar'
import CreateRoom from '../../components/CreateRoom'
import JoinRoom from '../../components/JoinRoom'
import Messages from '../../components/Messages'

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

  const onMessage = (event) => {
    console.log('Message from server ', event.data);
    const json = JSON.parse(event.data)
    if ('message' in json) {
      console.log('NEW MESSGE')
      var newRooms = [...roomsRef.current]
      console.log(newRooms.length)
      console.log(rooms.length)
      for (var i = 0; i < newRooms.length; i++) {
        console.log(newRooms[i].id, json.id)
        if (newRooms[i].id === json.id) {
          console.log('CHANGE MESSGAE')
          //newRooms[i].messages = [...newRooms[i].messages, {from: json.from, text: json.message}]
          newRooms[i].messages.push({from: json.from, text: json.message})
          setRooms(newRooms)
          break
        }
      }
      //console.log(rooms)
    }
  }

  const joinRooms = (socket, rooms) => {
    console.log('JOIN ROOMS')
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
      console.log('Connected to WS Server')
      setSocket(socket)
      setLoading(false)
    });

      // Listen for messages
  }, [])

  useEffect(() => {
    if (socket !== null) {
      console.log(`Joining rooms:   ${rooms.length}`)
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
      console.log(`Rooms use effect::::::::`)
      console.log(rooms)
      localStorage.setItem('rooms', JSON.stringify(rooms))
    }
  }, [rooms])

  //Every page navigation
  useEffect(() => {
    setPath(location.pathname)
  })

  return (
    <div className='roomsPage'>
      <Header />
      <div className='roomsPageContainer'>
        <RoomsBar rooms={rooms} />
        <main className='roomsPageMain'>
        {
          loading ?
          <></>
          : path === '/rooms/create' ? 
            <CreateRoom socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms} />
          : path === '/rooms/join' ?
            <JoinRoom socket={socket} joinRooms={joinRooms} rooms={rooms} setRooms={setRooms}/>
          : path === '/rooms/@me' || path === '' ?
          <></>
          : <Messages id={path.replace('/rooms/', '')} rooms={rooms} socket={socket} />
        }
        </main>
      </div>
    </div>
  )
}

export default CreateRoomPage