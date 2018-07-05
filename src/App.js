import React, { Component } from 'react';
import Letter from './components/Letter.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordOnConstruction: "",
      selectedWord: "",
      dico: ["google", "apple", "facebook", "amazon"],
      win: "",
      usedLetters: ""
    };
  }

  onSelectedLetterHandle = (event) => {
    let clickedLetter = event.target.innerHTML;
    let wordOnConstruction  = this.state.wordOnConstruction;


    this.state.selectedWord.split("").forEach( (letter) => {
      if (letter === clickedLetter) {
        wordOnConstruction += letter;
      } else {
        wordOnConstruction += "_";
      }
    })

    this.setState({
      wordOnConstruction
    });
  }


  newGame = () => {
    let wordOnConstruction = this.state.wordOnConstruction;
    let dicoLength = this.state.dico.length;
    let randomWordIndex = Math.floor(Math.random() * dicoLength);
    let selectedWord = this.state.dico[randomWordIndex].toUpperCase();

    const numberLetterSelectedWord = selectedWord.length;
    for (let i=0; i < numberLetterSelectedWord; i++) {
      wordOnConstruction += "_";
    }
    this.setState({
      wordOnConstruction,
      selectedWord
    });

    console.log("Mot à trouver est: " + selectedWord);
    return selectedWord;
  }



  render() {

    const letters = "azertyuiopqsdfghjklmwxcvbn".split("");
    const keyboard = letters.map((letter, index) => {
      return <Letter
        key={index}
        oneLetter={letter.toUpperCase()}
        click={this.onSelectedLetterHandle} />
    });

    return (
      <div className="app">
        <h1 className="title">Jeu du Pendu</h1>
        <div className="wordtofind">{this.state.wordOnConstruction}</div>
        <div className="keyboardBlock">
          <div className="keyboard">
            {keyboard}
          </div>
        </div>
        <button className="newGameButton"
          onClick={this.newGame}>New Game</button>
        <div className="usedLetters">
          <p>Lettre utilisées : {this.state.usedLetters}</p>
        </div>
        <p className="win">{this.state.win}</p>
      </div>
    );
  }
}

export default App;
