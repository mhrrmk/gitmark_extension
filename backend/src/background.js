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

// chrome.runtime.onStartup.addListener(()=>{
//   chrome.tabs.query({}, (tabs)=>{
//     tabs.forEach(tab=>{
//       db.get("changes")
//         .push({
//           id: tab.id,
//           index: tab.index,
//           title: tab.title,
//           links: [(tab.url)],
//           active: tab.active
//         })
//         .write()
//     })
//   })
// })

chrome.runtime.onInstalled.addListener((details)=>{

  db.set("changes", []).write()
  db.set("commits", []).write()

  chrome.tabs.query({}, (tabs)=>{
    tabs.forEach(tab=>{
      db.get("changes")
        .push({
          id: tab.id,
          index: tab.index,
          title: tab.title,
          links: [(tab.url)],
          active: tab.active
        })
        .write()
    })
  })
})

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
      title: tab.title,
      // active: tab.active,
      links: []
    })
    .write()

  // update is required especially because of ctrl + shift + T
  updateIndexes()
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
  console.log("A tab closed! Id:", tabId)
  //console.log("Date.now():", Date.now())

  // update the db to operate on its latest state
  db.read()

  // tag with closed
  // add closingTime
  db.get("changes")
    .find({id: tabId})
    .assign({
      closed: true,
      closedTime: Date.now()
    })
    .write()

  // update tab indexes
  // Revisited: since a closed tab continues to be monitored, update is actually unnecessary
  updateIndexes()

  // tab no longer exists at this point
  // this will return Unchecked runtime.lastError: No tab with id: [tabId]
  // chrome.tabs.get(tabId, function(tab){
  //   console.log("tab:", tab);
  // })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
  //console.log("Tab: ", tab)

  // update the db to operate on its latest state
  db.read()

  let changes = db.get("changes")

  // find tab from localStotrage DB
  let dbTab = changes.find({id: tabId})

  // operate on the tab only if its status is completed thus has a url
  // and that url is a webpage rather than browser specific pages
  // for example extensions or settings
  if(tab.status === "complete" && tab.url.startsWith("http")){

    // get the links field from tab
    let links = dbTab.get("links")

    // if links is empty it means the tab wasn't used to go to a site
    // but now it is going so tab can be tagged with "opened"
    if(links.value().length === 0){
      console.log("Tab used for the first time! id:", tabId, "url: ", tab.url)
      dbTab.assign({opened: true})
           .write()

    // if there was at least one item on links that means tab is used
    // for another address so now tab can
    // be tagged with "changed"
    // first visit doesn't add changed tag because
    // it doesn't qualify for change
    }else{
      console.log("Tab changed! id:", tabId, "url: ", changeInfo.url)
      dbTab.assign({changed: true})
           .write()
    }

    dbTab.assign({title: tab.title}).write()

    // save visited url
    links.push(tab.url).write()
  }
})

chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
  db.read()
  updateIndexes()
})

chrome.tabs.onActivated.addListener((activeInfo)=>{
  console.log("Active Tab changed id:", activeInfo.tabId)

  db.read()

  db.get("changes")
    .find({active: true})
    .assign({active: false})
    .write()

  db.get("changes")
    .find({id: activeInfo.tabId})
    .assign({active: true})
    .write()
})

// no need if there is a popup
// chrome.browserAction.onClicked.addListener((tab)=>{
//   console.log("browserAction clicked")
// })