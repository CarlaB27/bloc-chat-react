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
            username: this.state.user ? this.props.user.displayName : "Guest",
            roomId: this.props.activeRoom.key,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
        e.preventDefault();
        this.setState({ newMessage: '' })
    }

    handleSubmit(e) {
        this.setState({ newMessage: e.target.value });
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
                            <li className="list-group-item">{message.sentAt}</li>
                            <li className="list-group-item">{message.roomId}</li>

                        </div>
                    )}
                </ul>

                <div>
                    <form className="newMessages" onSubmit={(e) => this.createMessage(e)}>
                        <input type="text" classname="form-control form-control-lg" placeholder="create new message"
                            value={this.state.newMessage} onChange={(e) => this.handleSubmit(e)} />
                        <input type="submit" className="btn btn-outline-dark" value="Send" />
                    </form>
                </div>

            </div>
        )
    }
}


export default MessageList;

//Issues:
//1 unix time convert to local time toLocaleTimeString()
//2 shows guest even after signed in
//3 How can i show the room name instead of the roomid