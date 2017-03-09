import React, {Component} from 'react';

class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`message ${this.props.className}`}>
        { this.props.message.username &&
          <span style={{"color": this.props.message.color}} className="message-username">
            {this.props.message.username}
          </span> }
        <span className="message-content"> {this.props.message.content} <br />
          { this.props.message.url &&
            <img className="resize" src={this.props.message.url} />}
        </span>
      </div>
    );
  }
}

export default Message;