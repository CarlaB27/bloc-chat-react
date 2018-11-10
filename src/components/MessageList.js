import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: "",
            content: "",
            roomId: "",
            sentAt: ""
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



    //filter results by the ID of the active room.
    render() {
        return (
            <div>
                <h3>Messages</h3>
                <ul className="list message">
                    {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
                        <div key={index}>
                            <li>{message.content}</li>
                            <li>{message.username}</li>
                            <li>{message.sentAt}</li>
                            <li>{message.roomId}</li>
                        </div>
                    )}
                </ul>
            </div>
        )
    }
}


export default MessageList;