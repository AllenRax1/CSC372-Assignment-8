import React, { useEffect, useState } from 'react';

const CHOICES = ['rock', 'paper', 'scissors'];
const imgFor = (id) => `/images/${id}.png`;


//this is the main function for the computer Throw.
export function ComputerThrow({ reveal = 'idle', computerChoice = null }) {
  const [display, setDisplay] = useState('question');

  //the use effect used with the timers for the computer.
  useEffect(() => {
    if (reveal === 'animating') {
      const interval = setInterval(() => {
        setDisplay(CHOICES[Math.floor(Math.random() * CHOICES.length)]);
      }, 500);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        //this is the timeout interval in 3 seconds
      }, 3000);


      //this returns the interval.
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    if (reveal === 'done' && computerChoice) {
      setDisplay(computerChoice);
      return;
    }

    if (reveal === 'idle') {
      setDisplay('question');
    }
  }, [reveal, computerChoice]);


  //the return in HTML format.
  return (
    <section>
      <h2>Computer</h2>
      <div>
        <img
          src={display === 'question' ? '/images/question.png' : imgFor(display)}
          alt={display === 'question' ? 'question mark' : display}
        />
      </div>
    </section>
  );
}

export default ComputerThrow;