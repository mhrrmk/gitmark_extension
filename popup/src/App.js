/*global chrome*/
import React from 'react';
import './App.css';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

// [changes] field from DB
let changes = db.get("changes")

const commitOnClick = () => {
  // this button will save changes as a commit and then
  // reset it
  console.log("committed:)")

  // TODO: save current changes as a commit to commits in DB

  // delete closed tabs
  changes.remove({closed: true}).write()

  // reset the fields
  changes.each(tab => {
    tab.opened = false
    tab.changed = false
  }).write()
}

function App() {
  return (
    <div className="App">
      <button
        onClick={()=>{chrome.tabs.create({url: "../mainpage/index.html"}, (tab)=>{})}}
        >mainpage
      </button>
      <button
        onClick={commitOnClick}
        >commit
      </button>
    </div>
  );
}

export default App;
