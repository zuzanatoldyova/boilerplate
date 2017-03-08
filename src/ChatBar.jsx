import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue = {this.props.currentUser.name} onKeyPress = {this.props.onEnterName}/>
          <input type="text" className="chatbar-message" onKeyPress = {this.props.onEnterMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

ChatBar.defaultProps = {
  currentUser: {name: "Anonymous"}
}


export default ChatBar;