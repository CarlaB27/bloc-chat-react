import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyAjzE0EHNSBALQzTtoMD0exYKJHqDFPj4U",
  authDomain: "bloc-chat-react-eff00.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-eff00.firebaseio.com",
  projectId: "bloc-chat-react-eff00",
  storageBucket: "bloc-chat-react-eff00.appspot.com",
  messagingSenderId: "673999418383"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ""
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  //active room should be triggered by clicking on the name of the room in the  RoomList component.
  setActiveRoom(room) {
    this.setState({
      activeRoom: room,
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat React</h1>
        </header>

        <main>
          <RoomList firebase={firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={this.setActiveRoom}
          />

          <MessageList firebase={firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={this.setActiveRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
