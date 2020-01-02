import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

let query = document.getElementById('query');
let commit =document.getElementById('commit')
let go = document.getElementById('go');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

query.onclick = (element)=>{
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    console.log(tabs)
  });
  };

commit.onclick = (element) =>{
  // this button will save changes as a commit and then
  // reset it
  console.log("committed:)")

  // changes field from DB
  let changes = db.get("changes")

  // TODO: save current changes as a commit to commits in DB

  // delete closed tabs
  changes.remove({closed: true}).write()

  // reset the fields
  changes.each(tab => {
    tab.opened = false
    tab.changed = false
  }).write()
}

go.onclick = (element)=>{
  chrome.tabs.create({url: "../index.html"}, (tab)=>{})
}