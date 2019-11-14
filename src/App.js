import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { withAuthenticator } from 'aws-amplify-react';

class App extends React.Component {
  state = {
    notes: [{
      id: 1,
      note: "Hello World"
    }]
  }
  render() {
    const { notes } = this.state
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">Amplify Notetacker</h1>
        <form className="mb3">
          <input type="text" className="pa2 f4" placeholder="Write a note"/>
          <button className="pa2 f4" type="submit">
            Add Note
          </button>
        </form>
  
        {/* List */}
        <div>
          {notes.map(item => (
            <div key={item.id} className="flex items-center">
              <li className="list pa1 f3">
                {item.note}
              </li>
              <button className="bg-transparent bn f4">
                <span>&times;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
