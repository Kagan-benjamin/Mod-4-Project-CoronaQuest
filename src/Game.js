import React from 'react';
import Cell from './components/Cell.js'
import Obstacle from './components/Obstacle.js'
import './styling/Game.css';
import obstaclesList from './resources/obstaclesList.js'

// Specs for map + grid size, values below for wireframe map size
const CELL_SIZE = 45; // 45
const WIDTH = 495;    // 495
const HEIGHT = 585;   // 585
//                    //

class Game extends React.Component {

    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [ {x: 5, y: 5} ],  // Player Character starting location
        obstacles: obstaclesList  // Obstacle locations imported 
    }                              //    from resources folder        

         //  Generates Underlying Grid  //

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

         // Basic Movement Methods for Player Char //

    moveSquareUp = () => {
        this.setState( {cells: [{ x: this.state.cells[0].x , y: this.state.cells[0].y - 1 }] }) 
    }

    moveSquareDown = () => {
        this.setState( {cells: [{ x: this.state.cells[0].x , y: this.state.cells[0].y + 1 }] }) 
    }

    moveSquareLeft = () => {
        this.setState( {cells: [{ x: this.state.cells[0].x - 1 , y: this.state.cells[0].y }] }) 
    }

    moveSquareRight = () => {
        this.setState( {cells: [{ x: this.state.cells[0].x + 1 , y: this.state.cells[0].y }] }) 
    }

        // Conditional Method that directs response to
        // all key presses

    detectLeftObstacles = () => {
        let emptyObstacles = [];
        this.state.obstacles.forEach((obstacle) => {
           if (obstacle.x === this.state.cells[0].x - 1 && obstacle.y === this.state.cells[0].y) {
              console.log("You hit an obstacle left")
              return true
           } else {
            emptyObstacles.push(obstacle)           
           }
        })
        if (emptyObstacles.length > 58) {
            this.moveSquareLeft()
        }
    }

    detectUpObstacles = () => {
        let emptyObstacles = [];
        this.state.obstacles.forEach((obstacle) => {
           if (obstacle.x === this.state.cells[0].x && obstacle.y === this.state.cells[0].y - 1) {
              console.log("You hit an obstacle up")
              return true
           } else {
            emptyObstacles.push(obstacle)           
           }
        })
        if (emptyObstacles.length > 58) {
            this.moveSquareUp()
        }
    }

    detectDownObstacles = () => {
        let emptyObstacles = [];
        this.state.obstacles.forEach((obstacle) => {
           if (obstacle.x === this.state.cells[0].x && obstacle.y === this.state.cells[0].y + 1) {
              console.log("You hit an obstacle down")
              return true
           } else {
            emptyObstacles.push(obstacle)           
           }
        })
        if (emptyObstacles.length > 58) {
            this.moveSquareDown()
        }
    }

    detectRightObstacles = () => {
        let emptyObstacles = [];
        this.state.obstacles.forEach((obstacle) => {
           if (obstacle.x === this.state.cells[0].x + 1 && obstacle.y === this.state.cells[0].y) {
              console.log("You hit an obstacle right")
              return true
           } else {
            emptyObstacles.push(obstacle)           
           }
        })
        if (emptyObstacles.length > 58) {
            this.moveSquareRight()
        }
    }

    handleKeyPress = (e) => {
        e.preventDefault()
        e.persist()
        let charCoordX = this.state.cells[0].x
        let charCoordY = this.state.cells[0].y
        const direction = e.key 
        switch (direction) {
            case 'ArrowUp':
                if (charCoordY > 0) {
                    this.detectUpObstacles();
                } else {
                    console.log('Barrier Up');
                }
                break;
            case 'ArrowDown':
                if (charCoordY < 12) {
                    this.detectDownObstacles();
                } else {
                    console.log('Barrier Down')
                }
                break;
            case 'ArrowLeft':
                if (charCoordX > 0) {
                    this.detectLeftObstacles()
                } else {
                    console.log('Barrier Left')
                }
                break;
            case 'ArrowRight':
                if (charCoordX < 10) {
                    this.detectRightObstacles();
                } else {
                    console.log('Barrier Right')
                }
                break;
                default:
                    console.log('Not a Movement Key')
        }
    }
        // Map Render function //

    render() {
        
        const { cells, obstacles } = this.state;
        let div = document.getElementById("Board")
        
        return (
            <div>
                <div className="Board" id="Board" tabIndex="0"   // tabIndex enables recognition of keyPress by div
                    onKeyDown={this.handleKeyPress} 
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                    ref={(n) => { this.boardRef = n; }}>
                    {obstacles.map(obstacle => (
                        <Obstacle x={obstacle.x} y={obstacle.y} key={`${obstacle.x},${obstacle.y}`}/>
                    ))}        
                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                        
                    ))} 
                </div>
                <div className="text-box">
                  
                </div>
            </div>
        );
    }
}
export default Game