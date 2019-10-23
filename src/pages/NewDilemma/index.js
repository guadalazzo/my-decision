import React from 'react';
import './styles.scss';
import PercentBar from '../../components/PercentBar';
import Argument from './components/Argument';
function NewDilemma() {
  return (
    <div className="App">
      <header>
        <input 
          placeholder=" Add your dilemma" 
          type="text" 
          id="name" 
          name="name"
          required 
          />
      </header>
        <PercentBar/>
        <article>
          <section className="pros">
            <Argument text="bla bla bla" />
            <button>Add pro argument</button>  
          </section>
          <span className="line"></span> 
          <section className="cons">
            <Argument text="bla bla bla" />
            <button>Add cons argument</button>
          </section>
        </article>

    </div>
  );
}

export default NewDilemma;