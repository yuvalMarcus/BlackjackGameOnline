export default class Dealer {

    constructor(state) {

        this.state = state;
    }

    turn() {

        const card = this.state.dealerPlayer.newCard();

        return card;
    }
}