import React from 'react';
import "./App.css";
import { CommitPoint } from "./components"
import testData from "./testData.json"
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';


const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

const commits = db.get("commits").value()

function App() {
  
  return (
      <ul>
        {
          commits.map((commit)=>(
            <CommitPoint tabs={commit} ></CommitPoint>
          ))
        }
          {/* <CommitPoint tabs={testData} >
          </CommitPoint>
          <CommitPoint tabs={testData} >
          </CommitPoint> */}
      </ul>
  );
}

export default App;
