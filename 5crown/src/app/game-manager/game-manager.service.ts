import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, tap } from 'rxjs';
import { Board } from '../common/entities/board-state';
import { Player } from '../common/entities/player';
import { Card } from '../common/entities/card';
import { CardSuit } from '../common/entities/card-suite.enum';
import { Commands } from './game-command.enum';
import { GameCommandHandler } from './game-command-handler';
import { TurnPhases } from './turn-phase';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  private _boardState: Board;
  private roomNumber: string;

  constructor(private firestore: AngularFireDatabase) { }


  public joinRoom(roomNum: string): Observable<Board> {
    this.roomNumber = roomNum;
    return this.firestore.object(roomNum).valueChanges()
      .pipe(
        map(a => {
          let i = new Board();
          Object.assign(i, a);
          return i;
        }),
        tap(a => this._boardState = a)
      );
  }

  public issueCommand(command: Commands) {
    const newState = GameCommandHandler.handleCommand(this._boardState, command)
    this._boardState = newState;
    this.updateState();
  }

  public updateState() {
    this.firestore.object(this.roomNumber).update(this._boardState);
  }

  public startRound(room: string, round: number) {
    let deck = this.getDeck();
    deck = this.shuffleArray(deck)

    let numOfCards = round + 3;
    
    this._boardState.players.forEach(a => {
      a.hand = []
      let newHand = deck.slice(0, numOfCards);
      a.hand = newHand;
      deck = deck.slice(3);
    });
    
    let discard = [deck[0]]
    deck = deck.slice(1);
    this._boardState.discard = discard;
    this._boardState.deck = deck;
    
    let StartPlayer = round % this._boardState.players.length;
    this._boardState.playerTurn = StartPlayer
    this._boardState.playerPhase = TurnPhases.PickUp;
    this.firestore.object(room).update(this._boardState);
    console.log(this._boardState);
  }

  public initPlayer(room: string, name: string): number {
    let l = this._boardState.players.filter(a => a.name == name);
    if (l.length == 0) {
      let p = new Player();
      p.name = name;
      this._boardState.players.push(p);
      this.firestore.object(room).update(this._boardState);
      return this._boardState.players.length;
    } else {
      let i = this._boardState.players.findIndex(a => {
        return a && a.name == name
      }
      );
      return i;
    }
  }

  private getDeck(): Card[] {
    let cards = []
    const suits = Object.keys(CardSuit).filter((v) => isNaN(Number(v)));
    suits.forEach((suit, index) => {
      // 👇️ Small, Medium, Large
      for (let i = 3; i <= 13; i++) {
        cards.push(new Card(i, suit as unknown as CardSuit))
      }
      console.log(suit);
    });
    cards.push(new Card(50, CardSuit.Clovers))
    cards.push(new Card(50, CardSuit.Diamonds))
    cards.push(new Card(50, CardSuit.Hearts))



    return [...cards, ...cards];
  }

  private shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
