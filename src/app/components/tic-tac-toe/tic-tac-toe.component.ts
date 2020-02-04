import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  constructor() { }
  array = ['', '', '', '', '', '', '', '', ''];
  originalArray = ['', '', '', '', '', '', '', '', ''];
  selected = false;
  start = false;
  count = 0;
  show = false;
  play = true;
  message = '';
  computerLetter = '0';
  playerLetter = 'X';
  ngOnInit() {
  }
  chooseComputerIndex() {
    this.selected = false;
    for (let index = 0; index < 9; index++) {
      if (this.checkAvailable(index)) {
        this.array[index] = this.computerLetter;
        if (this.checkWin(this.computerLetter)) {
          this.selected = true;
          this.originalArray[index] = this.computerLetter;
          index = 10;
        } else {
          this.array[index] = '';
        }
      }
    }
  }
  checkOpponentWin() {
    this.selected = false;
    for (let index = 0; index < 9; index++) {
      if (this.checkAvailable(index)) {
        this.array[index] = this.playerLetter;
        if (this.checkWin(this.playerLetter)) {
          this.selected = true;
          this.array[index] = this.computerLetter;
          this.originalArray[index] = this.computerLetter;
          index = 10;
        } else {
          this.array[index] = '';
        }
      }
    }
  }
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);

  }
  checkCornerAvailable() {
    this.selected = false;
    const corners = [0, 2, 6, 8];
    this.shuffle(corners);
    for (let cor = 0; cor < corners.length; cor++) {
      if (this.checkAvailable(corners[cor])) {
        this.array[corners[cor]] = this.computerLetter;
        this.selected = true;
        this.originalArray[corners[cor]] = this.computerLetter;
        cor = 5;
      }
    }
  }
  checkCenter() {
    this.selected = false;
    if (this.checkAvailable(4)) {
      this.selected = true;
      this.array[4] = this.computerLetter;
      this.originalArray[4] = this.computerLetter;
    }
  }
  checkMiddleOfCorner() {
    this.selected = false;
    const middle = [1, 3, 5, 7];
    this.shuffle(middle);
    for (let cor = 0; cor < middle.length; cor++) {
      if (this.checkAvailable(middle[cor])) {
        this.array[middle[cor]] = this.computerLetter;
        this.selected = true;
        this.originalArray[middle[cor]] = this.computerLetter;
        cor = 5;
      }
    }
  }



  async choose(ind) {
    if (await !this.checkAvailable(ind) || !this.play) {
      return;
    }
    this.array[ind] = this.playerLetter;
    this.originalArray[ind] = this.playerLetter;

    if (this.checkWin('X')) {
      this.message = 'congratulation you win';
      this.play = false;
      return;
    }
    this.count++;
    await this.computerTurn();
    console.log(this.play, '    ', this.count);

    if (this.play && (this.count === 9 || this.count === 10)) {
      this.message = 'Game over';
      this.play = false;
    }
  }
  async computerTurn() {
    await this.chooseComputerIndex();
    if (!this.selected) {
      await this.checkOpponentWin();
      if (!this.selected) {
        await this.checkCornerAvailable();
        if (!this.selected) {
          await this.checkCenter();
          if (!this.selected) {
            await this.checkMiddleOfCorner();
          }
        }
      }
    }
    this.count++;
    console.log(this.play, ' in c   ', this.count);
    if (this.checkWin(this.computerLetter)) {
      this.message = 'ohh you loss';
      this.play = false;
    }
  }
  computerChance() {
    let selected = false;
    while (!selected && this.count < 9) {
      const random = (Math.floor(Math.random() * 100)) % 9;
      if (this.checkAvailable(random)) {
        this.count++;
        selected = true;
        this.array[random] = '0';
        if (this.checkWin('0')) {
          console.log('computer win');
          this.message = 'ohh you loss';
          this.play = false;

        }
      }
    }
  }
  checkWin(symbol) {
    if ((this.array[0] === symbol && this.array[1] === symbol && this.array[2] === symbol) ||
      (this.array[3] === symbol && this.array[4] === symbol && this.array[5] === symbol) ||
      (this.array[6] === symbol && this.array[7] === symbol && this.array[8] === symbol)) {
      return true;
    } else if ((this.array[0] === symbol && this.array[3] === symbol && this.array[6] === symbol) ||
      (this.array[1] === symbol && this.array[4] === symbol && this.array[7] === symbol) ||
      (this.array[2] === symbol && this.array[5] === symbol && this.array[8] === symbol)) {
      return true;
    } else if ((this.array[0] === symbol && this.array[4] === symbol && this.array[8] === symbol) ||
      (this.array[2] === symbol && this.array[4] === symbol && this.array[6] === symbol)) {
      return true;
    } else {
      return false;
    }
  }
  checkAvailable(index) {
    if (this.array[index] === 'X' || this.array[index] === '0') {
      return false;
    } else {
      return true;
    }
  }
  replay() {
    this.array = ['', '', '', '', '', '', '', '', ''];
    this.originalArray = ['', '', '', '', '', '', '', '', ''];
    this.count = 0;
    this.play = true;
    this.message = '';
    this.toss();
  }
  toss() {
    const randomNumber = Math.floor(Math.random() * 10) % 2;
    this.show = true;
    if (randomNumber === 0) {
      this.computerTurn();
      this.message = 'computer win the toss';
    } else {
      this.message = 'you win the toss';

    }
  }
}
