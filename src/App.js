import React from 'react';
import "./App.css";
import { CommitPoint } from "./components"
import testData from "./testData.json"

function App() {
  
  return (
      <ul>
          <CommitPoint tabs={testData} >
          </CommitPoint>
          <CommitPoint tabs={testData} >
          </CommitPoint>
      </ul>
  );
}

export default App;
