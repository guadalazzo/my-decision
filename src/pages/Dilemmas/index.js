import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Argument from '../../components/Argument';
import './styles.scss';

function Dilemmas(props) {
  const [ dilemmas, setDilemmas ] = useState([]);
  
  const handleClick = () => {
    props.history.push("/new-dilemma")
  }
  useEffect(() => {
    axios
      .get(
        "https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemmas"
      )
      .then(response => {
        setDilemmas(response.data);
        return response.data;
      });
  }, []);
  return (
    <div className="App">
      <header>
      <h1>Your Dilemmas</h1>
      </header>  
      <div className="dilemmas">
      {dilemmas && dilemmas.map((dilemma, index) => {
        const type = dilemma.totalPro > dilemma.totalCons ? 'pro': 'cons';
        return <Argument key={index.toString()} text={dilemma.title} type={type} id={dilemma.id} setDilemmas={setDilemmas}/>
      })}
      </div>
      <button onClick={handleClick}>New Decision</button>
    </div>
  );
}

export default Dilemmas;