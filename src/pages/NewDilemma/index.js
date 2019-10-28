import React, { useState } from "react";
import "./styles.scss";
import PercentBar from "../../components/PercentBar";
import Argument from "./components/Argument";
import ArgumentModal from "./components/ArgumentModal";

function NewDilemma() {
  const [title, setTitle] = useState("");
  const [ proArgs, setProArg ] = useState([]);
  const [ conArgs, setConArg ] = useState([]);
  const [ argType, setArgType] = useState("");
  const [ showModal, setShowModal ] = useState(false);
  const handleChange = event => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    setTitle(title);
    event.preventDefault();
  };
  const handleSubmitArg = (event,arg) => {
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
    setArgType(type);
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
  }
  const sum = (array) => {
    let count = 0;
    array.length > 0 && array.forEach(element => {
      count += element.point;
      console.log(count, 'count');
    });
    return count;
  }
  const getTotalCon = sum(conArgs);
  const getTotalPro = sum(proArgs);
  return (
    <div className="App">
      <header>
        {title && <h1>{title}</h1>}
        <form onSubmit={handleSubmit}>
          <input
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
      <button>Save Dilemma</button>
      {showModal && <ArgumentModal type={argType} handleClose={handleClose} handleSubmitArg={handleSubmitArg}/>}
    </div>
  );
}

export default NewDilemma;
