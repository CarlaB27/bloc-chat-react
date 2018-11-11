import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');

    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    handleSubmit(e) {
        this.setState({ newRoom: e.target.value });
    }

    createRoom(e) {
        this.roomsRef.push({
            name: this.state.newRoom
        });
        e.preventDefault();
        this.setState({ newRoom: '' })
    }

    // highlight the active room
    handleClick(room) {
        this.props.setActiveRoom(room);
    }

    render() {
        return (
            <div className="roomlist">
                <div>
                    <ul className="list-group">
                    {this.state.rooms.map((room) => <li className="list-group-item-primary" key={room.name}
                        onClick={() => this.handleClick(room)}>{room.name}</li>)}
                    </ul>
                   
                </div>

                <form className="newRooms" onSubmit={(e) => this.createRoom(e)}>
                    <input type="text" value={this.state.newRoom} onChange={(e) => this.handleSubmit(e)} />
                    <input type="submit" value="Submit" />
                </form>

            </div>


        );
    }
}
export default RoomList;