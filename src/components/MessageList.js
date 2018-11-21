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
        let date = new Date(timestamp);
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
                <div>
                    <h2>You are in <span className="badge badge-info">{this.props.activeRoom.name}</span></h2>
                </div>
                <h3>Messages</h3>

                <ul className="table">
                    {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
                        <div key={index} className="list-group-item">
                            {message.content}<br />
                            <strong>{message.username}</strong><br />
                            {this.formatTime(message.sentAt)}
                        </div>
                    )}
                </ul>

                <div>
                    <form className="newMessages" onSubmit={(e) => this.createMessage(e)}>
                        <input type="text" className="form-control" placeholder="create new message"
                            value={this.state.newMessage} onChange={(e) => this.handleSubmit(e)} />
                        <input type="submit" className="btn btn-outline-info" value="Send" />
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList;

//To Do:
//1fix message list spacing, add lines
//2 fix submit forms to full length