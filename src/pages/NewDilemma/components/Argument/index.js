import React from 'react';
import './styles.scss';
const Argument = (props) => {
    const {text} = props;
    return (
        <section className="argument-container">
            <i class="fas fa-check"></i>
            <p>{text}</p>
        </section>)
}
export default Argument;