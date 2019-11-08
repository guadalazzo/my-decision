import React from 'react';
import axios from 'axios';
import './styles.scss';
const Argument = (props) => {
    const {text, type, id, setDilemmas} = props;
    const deleteDilemma = () => {
        axios
        .delete(`https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemma/${id}`)
        .then(() => { 
            axios.get(`https://us-central1-my-decision-ad541.cloudfunctions.net/api/dilemmas`)
            .then((response)=> {
                console.log(response.data);
                return setDilemmas(response.data);
            })
        })
    }
    return (
        <section className={`argument-container ${type}-arg`}>
            {id && <span onClick={deleteDilemma}>eliminar</span>}<p>{text}</p>{id && <span>editar</span>}
        </section>)
}
export default Argument;