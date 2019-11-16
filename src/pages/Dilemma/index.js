import React, { useState, useEffect } from "react";
import "./styles.scss";
import PercentBar from "../../components/PercentBar";
import Argument from "../../components/Argument";
import ArgumentModal from "../../components/ArgumentModal";
import axios from "axios";
import { Loading } from '../../components/Loading';

function Dilemma(props) {
  const [ title, setTitle ] = useState("");
  const [ errorMessage, setError ] = useState("");
  const [ proArgs, setProArg ] = useState([]);
  const [ totalPro, setTotalPro ] = useState(0);
  const [ totalCons, setTotalCons ] = useState(0);
  const [ totalPoints, setTotalPoints ] = useState(0);
  const [ conArgs, setConArg ] = useState([]);
  const [ argType, setArgType] = useState("");
  const [ showModal, setShowModal ] = useState(false);
  const [ required, setRequired ] = useState(false);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
      axios
      .get(`https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemma/${props.match.params.id}`)
      .then(res => {
        setTitle(res.data.title);
        setProArg(res.data.proArgs);
        setConArg(res.data.conArgs);
        setTotalCons(res.data.totalCons);
        setTotalPro(res.data.totalPro);
        setTotalPoints(res.data.totalPoints);
        setLoading(false);
      } )
      .catch(err => console.log('err',err));
  }, []);
  const handleChange = event => {
    event.preventDefault();
    setError('');
    setTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    setError('');
    setTitle(title);
    event.preventDefault();
  };
  const handleSubmitArg = (event,arg) => {
    setError('');
    switch (arg.type) {
      case 'cons':
        setConArg(oldArray => [...oldArray, arg]);
        break;
      case 'pro':
        setProArg(oldArray => [...oldArray, arg]);
        break;
      default: console.log('no arg');
        break;
    }
    event.preventDefault();
  };
  const handleClick = (type) => {
    //argument button
    setError('');
    setArgType(type);
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
  }
  const sum = (array) => {
    let count = 0;
    array && array.length > 0 && array.forEach(element => {
      count += element.point;
    });
    return count;
  }
    const getTotalCon = sum(conArgs);
    const getTotalPro = sum(proArgs);
  const handleDilemmaSubmit = () => {
   
    setError('');
    setTotalCons(getTotalCon);
    setTotalPro(getTotalCon);
    setTotalPoints(getTotalPro + getTotalCon);
    if (title === '' || conArgs.length === 0 || proArgs.length === 0) {
      setRequired(true);
      return setError('Please charge title and arguments');
    }
    setRequired(false);
    axios
    .put(`https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemma/${props.match.params.id}`,{
      title,
      proArgs,
      conArgs,
      totalCons,
      totalPro,
      totalPoints,
    })
    .then(response => {
      props.history.push("/dilemmas");
    })

    .catch(err => console.log('Err',err))
  }  
  return (
    <div className="App">
      {isLoading ? <Loading /> : 
      <>
        <header>
          {errorMessage !== '' && alert(errorMessage) }
          {title && <h1>{title}</h1>}
          <form onSubmit={handleSubmit}>
            <input
              className={required ? 'alert':''}
              placeholder=" Add your dilemma"
              type="text"
              id="title"
              name="title"
              value={title}
              required
              onChange={handleChange}
            />
          </form>
        </header>
        <PercentBar proAmount={getTotalPro} conAmount={getTotalCon} />
        <article>
          <section className="pros">
          { proArgs.map((arg, index) => (<Argument type={arg.type} key={`arg-${index}`} text={arg.title} />))}
            <button onClick={() => handleClick('pro')} className="secondary pro-btn">Add pro argument</button>
          </section>
          <span className="line"></span>
          <section className="cons">
            { conArgs.map((arg, index) => (<Argument type={arg.type} key={`arg-${index}`} text={arg.title} />))}
            <button onClick={() => handleClick('cons')} className="secondary cons-btn">Add cons argument</button>
          </section>
        </article>
        <button onClick={handleDilemmaSubmit} >Save Dilemma</button>
        {showModal && <ArgumentModal type={argType} handleClose={handleClose} handleSubmitArg={handleSubmitArg}/>}
      </>}
      
    </div>
  );
}

export default Dilemma;
