import React,{ useEffect, useState }from 'react';
import axios from 'axios';
import './styles.scss';

function Dilemmas() {
  const [ dilemmas, setDilemmas ] = useState([]); 
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
      {dilemmas && dilemmas.map(dilemma => (
        <section>
          <p>{dilemma.title}</p>
          
        </section>
      ))}
    </div>
  );
}

export default Dilemmas;