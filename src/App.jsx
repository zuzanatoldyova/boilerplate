import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      connections: 0,
      color: this.getRandomColor()
    }

    this.handleMessage = this.handleMessage.bind(this);
    this.handleName = this.handleName.bind(this);
    this.sendUpdate = this.sendUpdate.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  handleMessage(event) {
    if (event.key === "Enter") {
      const newMessage = {
        color: this.state.color,
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      }
      this.sendUpdate(this.socket, newMessage);
      event.target.value = '';
    }
  }

  handleName(event) {
    if (event.key === "Enter") {
      const newName = event.target.value;
      const message = {

        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${newName}.`
      }
      this.sendUpdate(this.socket, message);
      this.setState({currentUser: {name: newName}});
    }
  }

  sendUpdate(socket, message) {
    socket.send(JSON.stringify(message));
  }

  componentDidMount() {

    this.socket =  new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.connections) {
        this.setState({connections: data.connections});
      } else {
        this.setState({messages: this.state.messages.concat(data)});
      }
    }

  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="navbar-connections"> {`${this.state.connections}`} users online</p>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser} onEnterMessage = {this.handleMessage} onEnterName = {this.handleName}/>
      </div>
    );
  }
}

export default App;

