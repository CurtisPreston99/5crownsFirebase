import { Board } from "../common/entities/board-state";
import { Commands } from "./game-command.enum";
import { TurnPhases } from "./turn-phase";

export class GameCommandHandler {

    static functionMap = new Map<Commands, (state: Board) => Board>([
        [Commands.PickUpFromDiscard, this.PickUpFromDiscard],
        [Commands.PickUpFromDeck, this.PickUpFromDeck]
    ]);


    static handleCommand(state: Board, command: Commands): Board {

        const commandHandler = this.functionMap.get(command);
        if (!commandHandler) {
            console.error("command :", command, " did not have associated command handler")
            return state;
        }
        const newState = commandHandler(state);

        return newState;

    }

    static PickUpFromDiscard(state: Board): Board {
        if (state.playerPhase !== TurnPhases.PickUp) {
            return state;
        }
        const player = state.players[state.playerTurn];
        const topOfDiscard = state.discard[0];
        const newDiscardPile = state.discard.slice(1)
        player.hand.push(topOfDiscard);
        state.discard = newDiscardPile;
        state.playerPhase = TurnPhases.PutDown;
        return state;
    }

    static PickUpFromDeck(state: Board): Board {
        if (state.playerPhase !== TurnPhases.PickUp) {
            return state;
        }
        const player = state.players[state.playerTurn];
        const topOfDeck = state.deck[0];
        const newDeckPile = state.deck.slice(1)
        player.hand.push(topOfDeck);
        state.deck = newDeckPile;
        state.playerPhase = TurnPhases.PutDown;
        return state;
    }
}
