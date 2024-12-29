import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/1.png';
import cross_icon from '../Assets/2.png';

export default function TicTacToe() {
    let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [player1, setPlayer1] = useState("");
    let [player2, setPlayer2] = useState("");
    let [currentPlayer, setCurrentPlayer] = useState("");
    let [winner, setWinner] = useState(null);
    let titleRef = useRef(null);

    const handleStart = () => {
        if (player1 && player2) {
            setCurrentPlayer(player1);
        } else {
            alert("Please enter names for both players!");
        }
    };

    const toggle = (e, num) => {
        if (lock || data[num] !== "" || !currentPlayer) {
            return;
        }
        let newData = [...data];
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='cross'>`;
            newData[num] = "x";
            setCurrentPlayer(player2);
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' alt='circle'>`;
            newData[num] = "o";
            setCurrentPlayer(player1);
        }
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }
    };

    const won = (winnerSymbol) => {
        setLock(true);
        if (winnerSymbol === "x") {
            setWinner(player1);
        } else {
            setWinner(player2);
        }
    };

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        setCurrentPlayer(player1);
        setWinner(null);
        titleRef.current.innerHTML = "Tic Tac Toe Game";
        document.querySelectorAll(".boxes").forEach(box => (box.innerHTML = ""));
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>
                Tic Tac Toe Game in <span>React</span>
            </h1>
            <div className="player-inputs">
                <input
                    type="text"
                    placeholder="Enter Player 1 Name"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Player 2 Name"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                />
                <button className="start-button" onClick={handleStart}>
                    Start Game
                </button>
            </div>
            {currentPlayer && (
                <h2 className="current-turn">
                    Current Turn: <span>{currentPlayer}</span>
                </h2>
            )}
            <div className="board">
                {data.map((_, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={(e) => toggle(e, index)}
                    ></div>
                ))}
            </div>
            <button className="reset-button" onClick={resetGame}>
                Reset
            </button>

            {winner && (
                <div className="winner-popup">
                    <div className="popup-content">
                        <h2>🎉 Congratulations {winner}! 🎉</h2>
                        <p>You Won the Game!</p>
                        <button onClick={resetGame} className="reset-button2">
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
