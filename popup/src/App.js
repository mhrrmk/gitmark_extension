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
// let changes = db.get("changes")
// let commits = db.get("commits")

const updateIndexes = () => {
  db.read()
  chrome.tabs.query({}, (tabs)=>{
    tabs.forEach(tab => {
      db.get("changes")
        .find({id: tab.id})
        .assign({index: tab.index})
        .write()
    });
  })
}

const commitOnClick = () => {
  db.read()
  console.log("db before:", db.__wrapped__)

  // this button will save changes as a commit and then
  // reset it
  console.log("committed:)")

  // let changes = db.get("changes")
  // let commits = db.get("commits")

  // save current changes as a commit to commits in db
  db.get("commits")
    .push(db.get("changes")
            .cloneDeep()
            .value())
    .write()

  // delete closed tabs
  db.get("changes").remove({closed: true}).write()

  // reset the fields
  db.get("changes").each(tab => {
    tab.opened = false
    tab.changed = false
  }).write()

  updateIndexes()
  console.log("db after:", db.__wrapped__)
}

const goToMainpage = () => {
  console.log("going to mainpage")
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
