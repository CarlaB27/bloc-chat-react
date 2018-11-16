import React, { Component } from 'react';
import './RoomList.css';

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
                        {this.state.rooms.map((room) => <li href="#" class="list-group-item list-group-item-action" key={room.name}
                            onClick={() => this.handleClick(room)}>{room.name}</li>)}
                    </ul>

                </div>

                <div className="newRoom">
                    <form className="newRooms" onSubmit={(e) => this.createRoom(e)}>
                        <input type="text" classname="form-control form-control-lg" placeholder="create new chat room" value={this.state.newRoom} onChange={(e) => this.handleSubmit(e)} />

                        <input type="submit" className="btn btn-outline-dark" value="Submit" />
                    </form>
                </div>


            </div>


        );
    }
}
export default RoomList;