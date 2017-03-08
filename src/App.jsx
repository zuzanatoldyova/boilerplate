import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    }

    this.socket =  new WebSocket("ws://0.0.0.0:3001");
    this.handleMessage = this.handleMessage.bind(this);
    this.handleName = this.handleName.bind(this);

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.setState({messages: this.state.messages.concat(message)});
    }
  }


  handleMessage(event) {
    if (event.key === "Enter") {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      }
      this.socket.send(JSON.stringify(newMessage));
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
      this.socket.send(JSON.stringify(message));
      this.setState({currentUser: {name: newName}});
    }

  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser} onEnterMessage = {this.handleMessage} onEnterName = {this.handleName}/>
      </div>
    );
  }
}

export default App;

