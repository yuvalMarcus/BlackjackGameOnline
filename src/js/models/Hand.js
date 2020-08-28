
export default class Hand {

    constructor(state, bet, numberCards) {

        this.state = state;
        this.status = 1;
        this.bet = bet;
        this.cards = [];

        for(let i = 0; i < numberCards; i++) {
            this.cards.push(this.state.cardDecks.getCard());
        }

        this.cardTotal = numberCards > 0 ? this.cards.map(el => el.number).reduce((accumulator, currentValue) => accumulator + currentValue) : 0 ;
    }

    setBet(bet) {

        this.bet = bet;
    }

    getBet() {

        return this.bet;
    }

    newCard() {

        const card = this.state.cardDecks.getCard();

        this.cards.push(card);

        this.cardTotal += card.number;

        return card;
    }

    addCard(card) {

        this.cards.push(card);

        this.cardTotal += card.number;

        return card;
    }

    removeCard(indexCard) {

        const card = this.cards[indexCard];

        this.cards.splice(indexCard, 1);

        this.cardTotal -= card.number;

        return card;
    }

    getLengthCards() {

        return this.cards.length;
    }

    setStatus(status) {

        this.status = status;
    }

    getStatus() {

        return this.status;
    }

}