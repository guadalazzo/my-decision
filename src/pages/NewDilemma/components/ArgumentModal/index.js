import React, {useState} from "react";
import "./styles.scss";

const ArgumentModal = props => {

  const [title, setTitle] = useState("");
  const [point, setPoint] = useState("");

  const { type, handleClose, handleSubmitArg} = props;
  const handleSubmit = (event) => {

    event.preventDefault();
  }
  const handleChange = (event) => {
    setTitle(event.target.value);
   }
   const handleSwiperChange = (event) => {
    setPoint(event.target.value);
   }
   const handleClick = (event) => {
    const arg = {
      title: title, 
      type: type,
      point: parseInt(point, 10),
    };
    handleSubmitArg(event,arg)
    handleClose();
    event.preventDefault();
   }
  return (
    <div className="modal-container">
     
      <form onSubmit={handleSubmit}>
      <span className="close" onClick={handleClose}>
        x
      </span>
        <label htmlFor="title">Include your {type} argument</label>
        <input
          placeholder=" Add your argument"
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
        ></input>
        <label>Rate the relevance</label>
        <input 
          onChange={handleSwiperChange} 
          type="range"
          value={point}
          id="importance" 
          name="points" 
          min="0" 
          max="10"
        />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
};
export default ArgumentModal;
