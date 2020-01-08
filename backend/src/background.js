// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
  changes: [],
  commits: []
}).write()

const updateIndexes = () => {
  chrome.tabs.query({}, (tabs)=>{
    tabs.forEach(tab => {
      db.get("changes")
        .find({id: tab.id})
        .assign({index: tab.index})
        .write()
    });
  })
}

chrome.tabs.onCreated.addListener((tab)=>{
  console.log("A new tab created! id:", tab.id)

  // update the db to operate on its latest state
  db.read()

  // save tab to DB
  // tab isn't tagged with "opened" here because no address is visited yet
  db.get("changes")
    .push({
      id: tab.id,
      index: tab.index,
      links: []
    })
    .write()
  //console.log("db!!!!!", db.get((tab.id).toString()).value())
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
  console.log("A tab closed! Id:", tabId)

  db.read()

  db.get("changes")
    .find({id: tabId})
    .assign({closed: true})
    .write()

  // TODO: update tab indexes
  // since a closed tab continues to be monitored, update is actually unnecessary
  // updateIndexes()

  // tab no longer exists at this point
  // this will return Unchecked runtime.lastError: No tab with id: [tabId]
  // chrome.tabs.get(tabId, function(tab){
  //   console.log("tab:", tab);
  // })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{

  // update the db to operate on its latest state
  db.read()

  let changes = db.get("changes")
  // find tab from localStotrage DB
  let dbTab = changes.find({id: tabId})

  if(changeInfo.url && changeInfo.url.startsWith("http")){
    console.log("Tab changed! id:", tabId, "url: ", changeInfo.url)

    // get the links field from tab
    let links = dbTab.get("links")

    // if links is empty it means the tab wasn't used to go to a site
    // but now it is going so tab can be tagged with "opened"
    if(links.value().length === 0){
      dbTab.assign({opened: true})
           .write()

    // if there was at least one item on links that means tab is used
    // for another address so now tab can
    // be tagged with "changed"
    // first visit doesn't add closed tag because
    // it doesn't qualify for change
    }else{
      dbTab.assign({changed: true})
           .write()
    }

    // save visited url
    links.push(changeInfo.url).write()

    // db.set(`${tabId}.changed`, true).write()
    // db.get(`${tabId}.links`).push(changeInfo.url).write()
  }
})

chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
  db.read()
  updateIndexes()
})

// no need if there is a popup
// chrome.browserAction.onClicked.addListener((tab)=>{
//   console.log("browserAction clicked")
// })