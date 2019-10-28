import React from 'react';
import './styles.scss';
const Argument = (props) => {
    const {text, type} = props;
    return (
        <section className={`argument-container ${type}-arg`}>
            <p>{text}</p>
        </section>)
}
export default Argument;