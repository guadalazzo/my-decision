import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Argument from '../../components/Argument';
import { Loading } from '../../components/Loading';
import './styles.scss';

function Dilemmas(props) {
  const [ dilemmas, setDilemmas ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);

  const handleClick = () => {
    props.history.push("/new-dilemma")
  }

  const openDetail = (id) => {
    setLoading(false);
    props.history.push(`/dilemma/${id}`);
  }
  useEffect(() => {
    axios
      .get(
        "https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemmas"
      )
      .then(response => {
        setDilemmas(response.data);
        setLoading(false);
        return response.data;
      });
  }, []);
  return (
    <div className="App">
       {isLoading ?  
      <Loading /> :
      (<> 
      <header>
      <h1>Your Dilemmas</h1>
      </header>  
      <div className="dilemmas">
      {dilemmas && dilemmas.map((dilemma, index) => {
        const type = dilemma.totalPro > dilemma.totalCons ? 'pro': 'cons';
        return <Argument 
                key={index.toString()} 
                text={dilemma.title} 
                type={type} 
                id={dilemma.id} 
                setDilemmas={setDilemmas}
                openDetail={openDetail}/>
      })}
      </div>
      <button onClick={handleClick}>New Decision</button>
      </>)}
    </div>
  );
}

export default Dilemmas;