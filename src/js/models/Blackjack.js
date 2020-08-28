import Hand from "./Hand";
import CardDecks from "./CardDecks";

export default class Blackjack {

    constructor(state, money) {

        this.state = state;
        this.money = money;
    }

    setGameStatus(status) {

        this.state.gameStatus = status;
    }

    startGame(value) {

        const PlayerHand = new Hand(this.state, value, 2);

        const dealerHand = new Hand(this.state, 0, 0);

        this.state.humanPlayer.hands.push(PlayerHand);

        this.state.dealerPlayer = dealerHand;

        this.state.humanPlayer.money -= value;

        return PlayerHand;
    }

    gameEnded() {

    }

    newGame() {

        this.state.humanPlayer.hands = [];

        this.state.dealerPlayer = new Hand(this.state, 0, 0);
    }

    restartGame() {

        this.state.humanPlayer.money = this.money;

        this.state.humanPlayer.hands = [];

        this.state.dealerPlayer = new Hand(this.state, 0, 0);

        this.state.cardDecks = new CardDecks();
    }

    gameSummary() {

        const playerHandsLength = this.state.humanPlayer.hands.length;
        const dealerTotalCard = this.state.dealerPlayer.cardTotal;

        for (let i = 0; i < playerHandsLength; i++) {

            if(dealerTotalCard <= 21 && this.state.humanPlayer.hands[i].cardTotal <= 21) {

                if(dealerTotalCard === this.state.humanPlayer.hands[i].cardTotal) {

                    this.state.humanPlayer.money += this.state.humanPlayer.hands[i].bet;
                }

                if(this.state.humanPlayer.hands[i].cardTotal > dealerTotalCard) {

                    this.state.humanPlayer.money += this.state.humanPlayer.hands[i].bet * 2;
                }
            }

            if(dealerTotalCard > 21 && this.state.humanPlayer.hands[i].cardTotal <= 21) {

                this.state.humanPlayer.money += this.state.humanPlayer.hands[i].bet * 2;
            }
        }
    }
}