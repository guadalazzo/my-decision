import React,{ useEffect, useState }from 'react';
import './styles.scss';
import axios from 'axios';
import {Loading} from './../../components/Loading';
function App(props) {

  const [ hasDilemmas,setHasDilemma ] =  useState(false);
  const [ isLoading, setLoading ] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemmas"
      )
      .then(response => {
        setHasDilemma(response.data.length !== 0);
        setLoading(false);
        return response.data;
      });
  }, []);

  const handleClick = () => {
    return !hasDilemmas ? props.history.push("/new-dilemma") : props.history.push("/dilemmas");
  }
  return (
    <div className="App">
      {isLoading ?  
      <Loading /> :
      <header className="App-header">
        <section className="arrows">
            <span className="arrow-1"></span>
            <span className="arrow-2"></span>
            <span className="arrow-3"></span>
        </section>
        <button onClick={handleClick}>New Decision</button> 
      </header>}
    </div>
  );
}

export default App;
