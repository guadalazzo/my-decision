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
  const handleSubmitArg = (arg) => {
    console.log(arg,'arg');
    if (arg.type === 'con') {
      setConArg(arg);
    }
    setProArg(arg);
  };
  const handleClick = (type) => {
    //argument button
    setArgType(type);
    setShowModal(true);
    console.log('type and show', argType, showModal);
  }
  const handleClose = () => {
    setShowModal(false);
  }
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
      <PercentBar />
      <article>
        <section className="pros">
          <Argument text="bla bla bla" />
          <Argument text="lorem ipsum rtas aksj ereras " />
          <button onClick={handleClick.bind(this,'pro')} className="secondary">Add pro argument</button>
        </section>
        <span className="line"></span>
        <section className="cons">
          <Argument text="bla bla bla" />
          <button onClick={handleClick.bind(this,'cons')} className="secondary">Add cons argument</button>
        </section>
      </article>
      <button>Save Dilemma</button>
      {showModal && <ArgumentModal type={argType} handleClose={handleClose} handleSubmitArg={handleSubmitArg}/>}
    </div>
  );
}

export default NewDilemma;
