import React, {useState} from "react";
import "./styles.scss";

const ArgumentModal = props => {

  const [title, setTitle] = useState("");
  const [point, setPoint] = useState(0);
  const [required, setRequired] = useState(false);

  const { type, handleClose, handleSubmitArg} = props;
  const handleSubmit = (event) => {

    event.preventDefault();
  }
  const handleChange = (event) => {
    setTitle(event.target.value);
   }
   const handleSwiperChange = (event) => {
    setPoint(Number(event.target.value));
   }
   const handleClick = (event) => {
    const arg = {
      title: title, 
      type: type,
      point: point,
    };
    if ( title !== '' && point !== 0) {
      handleSubmitArg(event,arg)
      handleClose();
    }
    setRequired(true);
    event.preventDefault();
   }
  return (
    <div className="modal-container">
     
      <form onSubmit={handleSubmit}>
      <span className="close" onClick={handleClose}>
        x
      </span>
        <label className={`${required ? 'alert':''}`} htmlFor="title">Include your {type} argument</label>
        <input
          className={`${required ? 'alert':''}`}
          placeholder=" Add your argument"
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
        ></input>
        <label className={`${required ? 'alert':''}`} >Rate the relevance</label>
        <input 
          className={`${required ? 'alert':''}`}
          onChange={handleSwiperChange} 
          type="range"
          value={point}
          id="importance" 
          name="points" 
          min="1" 
          max="10"
        />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
};
export default ArgumentModal;
