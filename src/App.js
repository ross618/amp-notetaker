import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';

class App extends React.Component {
  state = {
    note: "",
    notes: []
  };

  handleChangeNote = event => {
    this.setState({ note: event.target.value })
  }

  async componentDidMount() {
    const result = await API.graphql(graphqlOperation(listNotes));
    this.setState({ notes: result.data.listNotes.items });
  }

  handleAddNote = async event => {
    event.preventDefault()
    const { note, notes } = this.state;
    const input = { note }
    const result = await API.graphql(graphqlOperation(createNote, { input }))
    const newNote = result.data.createNote;
    const updatedNotes = [newNote, ...notes];
    this.setState({ notes: updatedNotes, note: '' });
  }

  handleDeleteNote = async noteId => {
    const { notes } = this.state
    const input = { id: noteId }
    const result = await API.graphql(graphqlOperation(deleteNote, { input }))
    const deletedNoteId = result.data.deleteNote.id;
    const updatedNotes = notes.filter(note => note.id !== deletedNoteId)
    this.setState({ notes: updatedNotes })
  }

  render() {
    const { notes, note } = this.state
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">Amplify Notetacker</h1>
        <form onSubmit={this.handleAddNote} className="mb3">
          <input type="text" className="pa2 f4" placeholder="Write a note" onChange={this.handleChangeNote}
          value={note} />
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
              <button onClick={() => this.handleDeleteNote(item.id)} className="bg-transparent bn f4">
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
