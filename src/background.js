// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({})
  .write()

// Data is automatically saved to localStorage
// db.get('posts')
//   .push({ title: 'lowdb' })
//   .write()

chrome.tabs.onCreated.addListener((tab)=>{
  console.log("A new tab created! id:", tab.id)
  db.set(`${tab.id}.opened`, true).write()
  db.set(`${tab.id}.links`, []).write()
  //console.log("db!!!!!", db.get((tab.id).toString()).value())
})
chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
  console.log("A tab closed! Id:", tabId)
  db.set(`${tabId}.closed`, true).write()

  // tab no longer exists at this point
  // this will return Unchecked runtime.lastError: No tab with id: [tabId]
  // chrome.tabs.get(tabId, function(tab){
  //   console.log("tab:", tab);
  // })

})
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
  if(changeInfo.url && changeInfo.url.startsWith("http")){
    // if(tab.status === "complete"){
    console.log("Tab changed! id:", tabId, "url: ", changeInfo.url)
    db.set(`${tabId}.changed`, true).write()
    db.get(`${tabId}.links`).push(changeInfo.url).write()
  }
})

chrome.browserAction.onClicked.addListener((tab)=>{
  console.log("browserAction clicked")
})