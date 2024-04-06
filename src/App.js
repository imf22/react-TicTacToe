import React, {useState} from 'react';

function Square({value, onSquareClick}){
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
        );
}



function Board({isXTurn, squares, onPlay}) {

    function handleClick(i){
        if (calculateWinner(squares) || squares[i]) return;

        const nextSquares = squares.slice();
        nextSquares[i] = isXTurn ? "X" : "O";

        onPlay(nextSquares);
    }
    
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner "+ winner;
    }
    else if (calculateIfFull(squares)){
        status = 'Draw!';
    }
    else {
        status = "Next player: " + (isXTurn? "X" : "O");
    }

    return (
        <>
            <p className='game-info'>{status}</p>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <div className='vl1'></div>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <div className='vl1'></div>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='hl'></div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <div className='vl1'></div>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <div className='vl1'></div>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                
            </div>
            <div className='hl'></div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <div className='vl1'></div>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <div className='vl1'></div>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
        );
  }

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);      // Contains the list of every board state 
    const [currentMove, setCurrentMove] = useState(0);                  // Tracks which turn number we are on #1, 2, 3 ... etc
    const isXNext = currentMove % 2 === 0;                              // Determine the current player
    const currentSquares = history[currentMove];                        // Gets the current board state

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    const moves = history.map((square, move) =>{
        // Generate button text based on move index
        let desciprtion;
        if (move > 0){
            desciprtion = `Go to move #${move}`;
        }
        else {
            desciprtion = 'Clear Board';
        }

        // Return React button component with generated description
        return(
            <React.Fragment key={move}>
                <button className="move-item" onClick={() => jumpTo(move)}>
                    {desciprtion}
                </button>
                
                <hr className="rounded"></hr>
            </React.Fragment>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board isXTurn={isXNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="board-info">
                {moves}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}

function calculateIfFull(squares){
    for ( var i = 0, l = squares.length; i < l; i++ )    {
        if ( 'undefined' == typeof squares[i] || null === squares[i] ){
            return false
        }
    }
    return true;
}
  