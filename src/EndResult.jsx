import React from 'react';

//This is the main EndResult Function.
export function EndResult({result}) {
    if (!result) return <div className = "result">Make your throw</div>

    //This returns the HTML formatted result, like you win, lose or tied.
    return (
        <div className = {result === 'win' ? 'result win' :'result'}>
            {result === 'win' && <p>You win!</p>}
            {result === 'lose' && <p>You lose!</p>}
            {result === 'tie' && <p>It's a tie!</p>}
        </div>
    );
}