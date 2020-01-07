import React, { useState } from 'react';
import { render } from 'react-dom';
import { motion } from 'framer-motion';
import './App.css';
import Logo from './Logo';
import Carousel from './Carousel';

function App() {
  const [colour, setColour] = useState('#ffd200');

  function handleColour(colour) {
    setColour(colour);
  }

  return (
    <div className="App">
      <motion.header
        className="header"
        animate={{
          backgroundColor: colour,
          transition: {
            duration: 0.8
          }
        }}
        transition={{ duration: 0.3 }}
      >
        <Logo colour={colour} />
        <div className="wrapper">
          <Carousel onChange={handleColour} />
        </div>
      </motion.header>
    </div>
  );
}

export default App;

render(<App />, document.getElementById('root'));
