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


    handleClick(room) {
        this.props.setActiveRoom(room);
    }

    render() {
        return (

            <div>

                <div className="row">
                    <div className="col-12">
                        <div className="list-group">
                            {this.state.rooms.map((room) =>
                                <li href="#" className="list-group-item list-group-item-action list-group-item-info" key={room.name}
                                    onClick={() => this.handleClick(room)}>{room.name}</li>)}
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center align-items-center">
                    <div className="row">
                        <div className="col">
                            <div className="newRoom">
                                <form className="newRooms" onSubmit={(e) => this.createRoom(e)}>
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="create new chat room" value={this.state.newRoom} onChange={(e) => this.handleSubmit(e)} />
                                </form>

                                <div className="row">
                                    <div className="col">
                                        <input type="submit" className="btn btn-outline-info" value="Submit" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RoomList;