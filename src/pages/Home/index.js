import React from 'react';
import './styles.scss';

function App(props) {
    const handleClick = () => {
        props.history.push("/new-dilemma");
    }
  return (
    <div className="App">
      <header className="App-header">
        <section className="arrows">
            <span className="arrow-1"></span>
            <span className="arrow-2"></span>
            <span className="arrow-3"></span>
        </section>
        <button onClick={handleClick}>New Decision</button> 
      </header>
    </div>
  );
}

export default App;
