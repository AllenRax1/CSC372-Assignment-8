import React, { useState } from 'react'
import './App.css'
import { PlayerThrow} from './PlayerThrow.jsx';
import { ComputerThrow} from './ComputerThrow.jsx';
import { EndResult} from './EndResult.jsx';
//These are all the necessary imports, which act as childs to the App parent.

const CHOICES = ['rock', 'paper', 'scissors'];

//the function that determines the random choice for the computer.
function randomChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

//this function is almsot exactly like normal js, uses if statements to determine the win/loss/tie.
function determineWinner(player, comp) {
  if (player === comp) return 'tie';
  if (
    (player === 'rock' && comp === 'scissors') ||
    (player === 'paper' && comp === 'rock') ||
    (player === 'scissors' && comp === 'paper')
  ) return 'win';
  return 'lose';
}


//this is the main default function, App, which is called into the main.jsx has most of the
//functionality linked together.
export default function App() {

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [revealState, setRevealState] = useState('idle');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ wins : 0, losses: 0, ties: 0 });

  const handlePlayerSelect = (choice) => {
    if (revealState === 'animating') return
    setPlayerChoice(choice)
    setRevealState('animating')
    setComputerChoice(null)
    setResult(null)

    //this is the time interval.
    setTimeout(() => {
      const comp = randomChoice()
      setComputerChoice(comp)
      setRevealState('done')
      const r = determineWinner(choice, comp)
      setResult(r)
      setScore((s) => (
        {wins: s.wins + (r === 'win' ? 1: 0),
          losses: s.losses + (r === 'lose' ? 1: 0),
          ties: s.ties + (r === 'tie' ? 1: 0),

      }))
      //This is the interval set to 3 seconds.
    }, 3000)
  }

  //reset.
  const resetAll = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setRevealState('idle')
    setResult(null)
    setScore({ wins: 0, losses: 0, ties: 0})
  }

//returns the HTML formatted page.
return (
  <main>
    <h1>Rock, Paper, SCISSORS!</h1>

    <div>
      <PlayerThrow selected = {playerChoice} onSelect = {handlePlayerSelect} disabled = {revealState === 'animating'} />
      <ComputerThrow reveal = {revealState} computerChoice = {computerChoice} />
    </div>

    <EndResult result = {result} />

    <aside>
      <p> Wins: {score.wins} Losses: {score.losses} Ties: {score.ties}</p>
      <button type = "button" onClick = {resetAll}>Reset</button>
    </aside>
  </main>
)


}

