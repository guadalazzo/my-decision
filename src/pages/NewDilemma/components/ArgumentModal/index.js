import React, {useState} from "react";
import "./styles.scss";

const ArgumentModal = props => {

  const [title, setTitle] = useState("");
  const [point, setPoint] = useState("");

  const { type, handleClose, handleSubmitArg} = props;
  const handleSubmit = (event) => {
    const arg = {
        title: title, 
        type: type,
        point: point,
    };
    handleSubmitArg(arg)
    event.preventDefault();
  }
  const handleChange = (event) => {
    setTitle(event.target.value);
   }
   const handleSwiperChange = (event) => {
    setPoint(event.target.value);
   }
  return (
    <div className="modal-container">
      <span className="close" onClick={handleClose}>
        x
      </span>
      <form onSubmit={handleSubmit}>
        <input
          placeholder=" Add your argument"
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
        ></input>
        <input onChange={handleSwiperChange} type="range" name="points" min="0" max="10"/>
      </form>
    </div>
  );
};
export default ArgumentModal;
