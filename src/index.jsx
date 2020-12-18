import React from 'react'
import ReactDom from 'react-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


function Square(props) {
  return (
    <Button container justify="center" style={{ height:"60px"  }}variant="contained" size="large" color="white" onClick={props.onClick}>
      {props.value}
    </Button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <Grid container direction="row"
      alignItems="baseline"  spacing={0}>
        <Grid item xs={12} j>
        <Grid container justify="center" spacing={0}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          </Grid>
        </Grid>
        
        <Grid item xs={12} >
        <Grid container justify="center" spacing={0}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          </Grid>
        </Grid>

        <Grid item xs={12} >
        <Grid container justify="center" spacing={0}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <Grid container justify="center" spacing={0}>
          <Button color='white' onClick={() => this.jumpTo(move)}>{desc}</Button>
          </Grid>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
        <Grid container justify="center" spacing={0}>
          <Grid container style={{ padding: "10px 10px 10px 10px", fontWeight:"bold" ,fontSize:"200%"}} justify="center" spacing={0} xs={12}>{status}</Grid>
          <ol>{moves}</ol>
        </Grid>
        </div>
      </div>
    );
  }
}


ReactDom.render(<Game />, document.getElementById("root"));


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





