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


  //create a setUser method on App, and pass that method down to the  User component as a prop
  setUser(user) {
    this.setState({
      user: user
    });
  }


  render() {
    return (
      <div className="App">
        <header>
          <h2>Bloc Chat React</h2>
        </header>

        <main>
          <div className="navbar navbar-light">
            <User firebase={firebase}
              setUser={this.setUser.bind(this)}
              user={this.state.user}
            />

          </div>

          <div className="row">
            <div className="col-sm-4">
              <RoomList firebase={firebase}
                activeRoom={this.state.activeRoom}
                setActiveRoom={this.setActiveRoom}
              />
            </div>

            
              <div className="col-sm-8">
                <MessageList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  setActiveRoom={this.setActiveRoom}
                />
              </div>
            

          </div>
        </main>
      </div>
    );
  }
}

export default App;
