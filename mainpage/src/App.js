import React from 'react';
import "./App.css";
import { CommitPoint } from "./components"
import testData from "./testData.json"
import exampleCommits from "./exampleCommits.json"
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';


const adapter = new LocalStorage('db')
//const adapter = new FileSync('db.json')
const db = low(adapter)

const commits = db.get("commits").value()

function App() {
  
  return (
      <ul>
        {/* {
          commits.reverse().map((commit)=>(
            <CommitPoint tabs={commit} ></CommitPoint>
          ))
        } */}

        {
          //test with multiple commits data
          exampleCommits.map((commit, index)=>(
            <CommitPoint key={index} tabs={commit} ></CommitPoint>
          ))
        }

        
        {// test with single commit data
        /* <CommitPoint tabs={exampleCommits[0]}/> */}
      </ul>
  );
}

export default App;
