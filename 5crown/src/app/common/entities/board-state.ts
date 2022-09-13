import { TurnPhases } from "src/app/game-manager/turn-phase";
import { Card } from "./card";
import { Player } from "./player";

export class Board {
    public deck: Card[] = [];
    public discard: Card[] = [];
    public playerTurn: number;
    public round: number;
    public players: Player[] = [];
    public playerPhase: TurnPhases;
}