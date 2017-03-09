import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const messages = this.props.messages.map((message) => {
      if (message.type === "incomingNotification") {
        return <Message className="system" key={message.id} message={message} />
      } else {
        return <Message key={message.id} message={message} />
      }
    });

    return (
      <main className="messages">
        {messages}
      </main>
    );

  }
}



export default MessageList;