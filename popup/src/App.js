/*global chrome*/
import React from 'react';
import './App.css';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

console.log("popup!!!!!!!!!!!!!")

const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

// [changes] field from DB
let changes = db.get("changes")
let commits = db.get("commits")

const commitOnClick = () => {
  // this button will save changes as a commit and then
  // reset it
  console.log("committed:)")

  // TODO: save current changes as a commit to commits in DB
  commits.push(changes.value()).write()

  // delete closed tabs
  changes.remove({closed: true}).write()

  // reset the fields
  changes.each(tab => {
    tab.opened = false
    tab.changed = false
  }).write()
}

const goToMainpage = () => {
  console.log("going tot mainpage")
  chrome.tabs.create({url: "../mainpage/index.html"}, (tab)=>{})
}

function App() {
  return (
    <div className="App">
      <button
        onClick={goToMainpage}
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
