import React,{ useEffect, useState }from 'react';
import './styles.scss';
import axios from 'axios';

function App(props) {

  const [ hasDilemmas,setHasDilemma ] =  useState(false);
  useEffect(() => {
    axios
      .get(
        "https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemmas"
      )
      .then(response => {
        setHasDilemma(response.data.length !== 0);
        return response.data;
      });
  }, []);

  const handleClick = () => {
    return !hasDilemmas ? props.history.push("/new-dilemma") : props.history.push("/dilemmas");
  }
  return (
    <div className="App">
      <header className="App-header">
        <section className="arrows">
            <span className="arrow-1"></span>
            <span className="arrow-2"></span>
            <span className="arrow-3"></span>
        </section>
        <button onClick={handleClick}>New Decision</button> 
      </header>
    </div>
  );
}

export default App;
