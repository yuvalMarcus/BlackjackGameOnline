import Hand from "./Hand";

export default class Player {

    constructor(state) {

        this.state = state;
    }

    doDouble(index) {

        if(this.state.humanPlayer.money < this.state.humanPlayer.hands[index].getBet()) {

            return [false, null];
        }

        const card = this.state.humanPlayer.hands[index].newCard();

        const bet = this.state.humanPlayer.hands[index].getBet() * 2;

        this.state.humanPlayer.money -= this.state.humanPlayer.hands[index].getBet();

        this.state.humanPlayer.hands[index].setBet(bet);

        return [true, card];
    }

    doHit(index) {

        const card = this.state.humanPlayer.hands[index].newCard();

        return card;
    }

    doSplit(index) {

        if(this.state.humanPlayer.money < this.state.humanPlayer.hands[index].getBet()) {

            return [false, null];
        }

        const lastIndexCard = this.state.humanPlayer.hands[index].cards.length - 1;

        const card = this.state.humanPlayer.hands[index].removeCard(lastIndexCard);

        const bet = this.state.humanPlayer.hands[index].bet;

        const hand = new Hand(this.state, bet, 0);

        this.state.humanPlayer.money -= bet;

        hand.addCard(card);

        this.state.humanPlayer.hands.push(hand);

        return [true, hand];
    }

    doStand(index) {

        this.state.humanPlayer.hands[index].setStatus(0);
    }

    moveHand(index) {

        let active = false;
        let nextIndex = index;

        for (let i = 0; !active && i < this.state.humanPlayer.hands.length; i++) {

            if(nextIndex === this.state.humanPlayer.hands.length - 1) {

                nextIndex = 0;
            } else {
                nextIndex = nextIndex + 1;
            }

            if(this.state.humanPlayer.hands[nextIndex].status === 1) {

                active = true;
            }
        }

        return [active, nextIndex];
    }
}