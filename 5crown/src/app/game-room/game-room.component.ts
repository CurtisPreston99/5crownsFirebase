import { Component, OnInit } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Board } from '../common/entities/board-state';
import { Card } from '../common/entities/card';
import { Player } from '../common/entities/player';
import { Commands } from '../game-manager/game-command.enum';
import { GameManagerService } from '../game-manager/game-manager.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.less']
})
export class GameRoomComponent implements OnInit {

  private _room: string;
  private _name: string;
  private _playerNumber: number;

  public board: Board;
  public commands = Commands;

  public get players(): Player[] {
    return this.board.players;
  }

  public get player(): Player {
    return this.board.players.filter(a => a.name == this._name)[0];
  }

  public get topOfDiscard(): Card {
    return this.board.discard[0];
  }
  public get topOfDeck(): Card {
    return this.board.deck[0];
  }

  constructor(private _route: ActivatedRoute,
    private _gameManager: GameManagerService) { }

  ngOnInit(): void {
    this._room = this._route.snapshot.params['id'] as string;;
    this._name = this._route.snapshot.fragment as string;

    this._gameManager.joinRoom(this._room).pipe(
    ).subscribe(a => {
      this.board = a;
      console.log(a);
    });

    this._gameManager.joinRoom(this._room).pipe(
      first()
    ).subscribe(a => {
      this._playerNumber = this._gameManager.initPlayer(this._room, this._name);
      console.log(this._playerNumber);
    });
  }

  public issueCommand(command:Commands){
    console.log("issued command :",command)
    this._gameManager.issueCommand(command);
  }

  public start() {
    this._gameManager.startRound(this._room, 0);
  }
}
