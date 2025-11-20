import React from 'react';


//this is the array, linking the images into ids for the player and computer to use.
const CHOICES = [
    {id: 'rock', src: '/images/rock.png', alt: 'Rock'},
    {id: 'paper', src: '/images/paper.png', alt: 'Paper'},
    {id: 'scissors', src: '/images/scissors.png', alt: 'Scissors'},
];


//this is the export function for player throw.
export function PlayerThrow({selected, onSelect}) {
    return(
        //In here, I am using a loop with the map() function to iterate over the array of CHOICES images.
        <section className = "player-throw">
            <h2> Your Throw</h2>
            <div className = "choices">
            
            {CHOICES.map((c) => (
                <button key = {c.id} 
                className = {selected === c.id ? 'choice selected' : 'choice'} 
                onClick= {() => onSelect?.(c.id)}>

                    <img src={c.src} alt={c.alt} />
                    
                </button>
            ))}
            </div>
        </section>
    );
}