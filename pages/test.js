import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'

const ws_port = 3001

/*import React from 'react'

export default class test extends React.Component {
	componentDidMount() {
		console.log('Did mount')

		const socket = new WebSocket('ws://localhost:3000');

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WS Server')
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

		this.socket = socket
	}

	sendMessage() {
		this.socket.send(
			document.getElementById('input').innerHTML
		);
	}

	render() {
		return (
			<div>
				<Head>
					<title>chat-app-test</title>
					<meta name='description' content='Anonymous chat application' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<main>
					<input id='input' type='text'></input>
					<button onClick={this.sendMessage}>Send Msg</button>
				</main>
			</div>
		)
	}
}*/



const Test = () => {
	var socket = null

	useEffect(() => {
		console.log('Did mount')

		socket = new WebSocket(`ws://localhost:${ws_port}`);

    	// Connection opened
    	socket.addEventListener('open', function (event) {
    	    console.log('Connected to WS Server')
    	});
	
    	// Listen for messages
    	socket.addEventListener('message', function (event) {
    	    console.log('Message from server ', event.data);
    	});
	}, [])

	const sendMessage = () => {
		const text = document.getElementById('text-input').value
		
		console.log(text)

		socket.send(text);
	}

	return (
		<div>
			<Head>
				<title>chat-app-test</title>
				<meta name='description' content='Anonymous chat application' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<input id='text-input' type='text'></input>
				<button onClick={sendMessage}>Send Msg</button>
			</main>
		</div>
	)
}

export default Test