import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoom: "",
      user: ""
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room,
    });
  }

  setUser(user) {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <div className="App">
        <header className="d-block p-2 bg-info text-black">
          <h1>Bloc Chat React</h1>
        </header>

        <main>

          <div className="row">
            <div className="col-md-4">
              <User firebase={firebase}
                setUser={this.setUser.bind(this)}
                user={this.state.user}
              />
            </div>
            <div className="container">
              <div className="col-md-8">
                <MessageList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  setActiveRoom={this.setActiveRoom}
                  user={this.state.user}
                />
              </div>

              <div className="col-md-4">
                <RoomList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  setActiveRoom={this.setActiveRoom}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

    );
  }
}

export default App;
