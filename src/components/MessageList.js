import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: "",
            content: "",
            roomId: "",
            sentAt: "",
            newMessage: "",
        };

        this.messagesRef = this.props.firebase.database().ref('messages');

    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) });
        });
    }

    //Use the .push() method on your messages reference to 
    //add new messages, just as you did when creating new rooms 
    //in the RoomList component.
    createMessage(e) {
        this.messagesRef.push({
            content: this.state.newMessage,
            username: this.props.user ? this.props.user.displayName : "Guest",
            roomId: this.props.activeRoom.key,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
        e.preventDefault();
        this.setState({ newMessage: '' })
    }

    handleSubmit(e) {
        this.setState({ newMessage: e.target.value });
    }

    formatTime(timestamp) {
        let date = new Date(timestamp);	// Convert the passed timestamp to milliseconds
        let hours = date.getHours();
        hours = hours > 12 ? date.getHours() - 12 : date.getHours();
        let amPm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let time = hours + ':' + minutes + ' ' + amPm;
        return time;
    }


    render() {
        return (
            <div>
                <h3>Messages</h3>
                <ul className="list-group">
                    {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
                        <div key={index}>
                            <li className="list-group-item">{message.content}</li>
                            <li className="list-group-item">{message.username}</li>
                            <li className="list-group-item">{this.formatTime(message.sentAt)}</li>
                            <li className="list-group-item">{message.roomId}</li>

                        </div>
                    )}
                </ul>

                <div>
                    <form className="newMessages" onSubmit={(e) => this.createMessage(e)}>
                        <input type="text" classname="form-control form-control-lg" placeholder="create new message"
                            value={this.state.newMessage} onChange={(e) => this.handleSubmit(e)} />
                        <input type="submit" className="btn btn-outline-info" value="Send" />
                    </form>
                </div>

            </div>
        )
    }
}


export default MessageList;

//Issues:
//1 shows NaN for the manually entered messages in firebase (per checkpoint task)
//2 shows guest even after signed in
//3 show room name instead of the roomid