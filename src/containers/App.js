import React, { Component } from 'react';
import Letter from '../components/Letter.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordOnConstruction: "",
      selectedWord: "",
      dico: ["google", "apple", "facebook", "amazon"],
      win: "",
      usedLetters: [],
    };
  }

  // computeDisplay (phrase, usedLetters) => {
  //   return phrase.replace(/\w/g,
  //     (letter) => (usedLetters.has(letter) ? letter : '_')
  //   )
  // }


  onSelectedLetterHandle = (event) => {
    let clickedLetter = event.target.innerHTML;
    let newWord = "";

    this.state.selectedWord.split("").forEach( (letter) => {
      console.log("usedLetter : " + this.state.usedLetters);
      console.log("letter  : " + letter);
      if (letter === clickedLetter || this.state.usedLetters.includes(letter)) {
        newWord += letter;
        let newUsedLetters = this.state.usedLetters.concat(letter);
        if (letter === clickedLetter) {
          this.setState({
            usedLetters: newUsedLetters
          });
        }
      } else {
        newWord += "_";
      }
    })

    if (newWord === this.state.selectedWord) {
      this.setState({
        win: "GAGNE !",
        wordOnConstruction: newWord
      });
    } else {
      this.setState({
        wordOnConstruction: newWord
      });
    }
  }


  newGame = () => {
    let initWord = "";
    let dicoLength = this.state.dico.length;
    let randomWordIndex = Math.floor(Math.random() * dicoLength);
    let selectedWord = this.state.dico[randomWordIndex].toUpperCase();

    const numberLetterSelectedWord = selectedWord.length;
    for (let i=0; i < numberLetterSelectedWord; i++) {
      initWord += "_";
    }
    this.setState({
      wordOnConstruction: initWord,
      selectedWord: selectedWord
    });

    console.log("Mot à trouver est: " + selectedWord);
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
