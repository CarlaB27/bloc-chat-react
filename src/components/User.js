import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
    }

    //to respond to sign-in and sign-out events in Firebase, 
    //add a  componentDidMount method to the User component 
    //that registers an  onAuthStateChanged event handler.

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }


    //Render the text "Guest" for anonymous users
    //renders a sign-in button. On click, button should call Firebase's signInWithPopup method.
    //Add a sign-out button to the User component. It should call the Firebase's signOut method.
    render() {

        return (
            <div>

                <h3 className="display username">
                    {this.props.user ? this.props.user.displayName : "Guest"}
                </h3>

                <button className="btn btn-outline-dark" onClick={this.handleSignIn.bind(this)}>Sign In</button>
                <button className="btn btn-outline-dark" onClick={this.handleSignOut.bind(this)}>Sign Out</button>

            </div>


        );
    }

}

export default User;