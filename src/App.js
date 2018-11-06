import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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

  render() {
    return (
      <div className="App">
        <header>
          Bloc Chat React
        </header>

        <main>
          <RoomList firebase={firebase} />  
        </main>
      </div>
    );
  }
}

export default App;
