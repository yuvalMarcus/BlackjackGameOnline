import CardDecks from './models/CardDecks';
import Player from './models/Player';
import Dealer from "./models/Dealer";
import Blackjack from './models/Blackjack';
import { renderBet } from './views/bet';
import * as handView from './views/hand';
import { elements, clearBoard, isAce, valueChangeAce } from './views/base';

const state = {
    gameStatus: 'waiting',
    cardDecks: new CardDecks(),
    dealerPlayer:  {},
    humanPlayer: {
        money: 200,
        hands: [
        ]
    }

};

const player = new Player(state);
const dealer = new Dealer(state);
const blackjack = new Blackjack(state, state.humanPlayer.money);

elements.playerMoney.textContent = state.humanPlayer.money.toString();

renderBet();

const controlDealer = () => {

    if(!state.dealerPlayer.getStatus())
        return;

    if(state.dealerPlayer.cardTotal >= 18) {

        state.dealerPlayer.setStatus(0);
    }

    if(state.dealerPlayer.getStatus()) {

        const card = dealer.turn();

        document.querySelector('.board-game.dealer-player .content .hand.hand-index-0 .cards').insertAdjacentHTML('beforeend', handView.renderCard(card, state.dealerPlayer.cards.length - 1, 0));

        document.querySelector('.board-game.dealer-player .content .hand.hand-index-0 .card-total').textContent = state.dealerPlayer.cardTotal;
    }
}

const controlCore = (index) => {

    document.querySelector(`.board-game.human-player .hand.hand-index-${index}`).classList.remove('active');

    const [active, nextIndex] = player.moveHand(index);

    if(active) {

        if (document.querySelector(`.board-game.human-player .hand.hand-index-${nextIndex}`))
            document.querySelector(`.board-game.human-player .hand.hand-index-${nextIndex}`).classList.add('active');
    }

    if(!active) {

        blackjack.setGameStatus('finished');

        elements.menuGameStatus.textContent = 'finished';

        elements.boxStatusText.textContent = `Game finished`;

        document.querySelector('.board-game.dealer-player').classList.remove('cards-hidden');

        while (state.dealerPlayer.getStatus()) {

            controlDealer();
        }

        blackjack.gameSummary();

        elements.playerMoney.textContent = state.humanPlayer.money.toString();
    }

    return active;
}

const controlAlert = (text) => {

    elements.boxAlertText.textContent = text;

    elements.boxAlert.style.display = 'block';

    setTimeout(() => {

        elements.boxAlert.style.display = 'none';
    }, 2000);
};

document.querySelector('.board-game.human-player .send-bet').addEventListener('click', e => {

    const value = parseInt(document.querySelector('.board-game.human-player .bet-value').value, 10);

    if(state.humanPlayer.money < value) {

        controlAlert('Illegal action, you do not have enough money');

        return;
    }

    const hand = blackjack.startGame(value);

    elements.playerMoney.textContent = state.humanPlayer.money.toString();

    handView.renderHand(0, hand, 'human');

    elements.playerHands.textContent = state.humanPlayer.hands.length;

    dealer.turn();

    handView.renderHand(0, state.dealerPlayer, 'dealer');

    blackjack.setGameStatus('play');

    elements.menuGameStatus.textContent = 'play';

    elements.boxStatusText.textContent = `Game play`;

    document.querySelector('.board-game.human-player .content .row.bet').style.display = 'none';

});

elements.playerBoard.addEventListener('click', e => {

    if(e.target.matches('.card-game-img')) {

        const indexHand = parseInt(e.target.closest('.card-game-img').dataset.hand, 10);
        const indexCard = parseInt(e.target.closest('.card-game-img').dataset.card, 10);

        if(state.humanPlayer.hands[indexHand].cards[indexCard].setNumber.active) {

            elements.choiceNumber1.dataset.hand = indexHand.toString();
            elements.choiceNumber1.dataset.card = indexCard.toString();
            elements.choiceNumber11.dataset.hand = indexHand.toString();
            elements.choiceNumber11.dataset.card = indexCard.toString();

            elements.popupFullScreen.style.display = 'block';
        }
    }

    if(e.target.matches('.do-double')) {

        const index = parseInt(e.target.closest('.do-double').dataset.index, 10);

        const [active, card] = player.doDouble(index);

        if(!active) {

            controlAlert('Illegal action, you do not have enough money');

            return;
        }

        if(card.setNumber.active) {

            isAce(index, state.humanPlayer.hands[index].cards.length - 1);
        }

        elements.playerMoney.textContent = state.humanPlayer.money.toString();

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .cards`).insertAdjacentHTML('beforeend', handView.renderCard(card, state.humanPlayer.hands[index].cards.length - 1, index));

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .bet`).innerHTML = state.humanPlayer.hands[index].getBet();

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .card-total`).innerHTML = state.humanPlayer.hands[index].cardTotal;

        controlDealer();

        controlCore(index);


    }

    if(e.target.matches('.do-hit')) {

        const index = parseInt(e.target.closest('.do-hit').dataset.index, 10);

        const card = player.doHit(index);

        if(card.setNumber.active) {

            isAce(index, state.humanPlayer.hands[index].cards.length - 1);
        }

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .cards`).insertAdjacentHTML('beforeend', handView.renderCard(card, state.humanPlayer.hands[index].cards.length - 1, index));

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .card-total`).innerHTML = state.humanPlayer.hands[index].cardTotal;

        controlDealer();
    }

    if(e.target.matches('.do-split')) {

        const index = parseInt(e.target.closest('.do-split').dataset.index, 10);

        const lastIndexCard = state.humanPlayer.hands[index].cards.length - 1;

        const [active, hand] = player.doSplit(index);

        elements.playerHands.textContent = state.humanPlayer.hands.length;

        if(!active) {

            controlAlert('Illegal action, you do not have enough money');

            return;
        }

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .card-total`).innerHTML = state.humanPlayer.hands[index].cardTotal;

        elements.playerMoney.textContent = state.humanPlayer.money.toString();

        const item = document.querySelector(`.board-game.human-player .content .hand.hand-index-${index} .card-${lastIndexCard}`);

        item.parentElement.removeChild(item);

        handView.renderHand(state.humanPlayer.hands.length - 1, hand, 'human');

        controlDealer();

    }

    if(e.target.matches('.do-stand')) {

        const index = parseInt(e.target.closest('.do-stand').dataset.index, 10);

        player.doStand(index);

        controlDealer();

        controlCore(index);
    }

});

elements.choiceNumber.addEventListener('click', function (e) {

    if(e.target.matches('.choice-number-1')) {

        const indexHand = parseInt(e.target.closest('.choice-number-1').dataset.hand, 10);
        const indexCard = parseInt(e.target.closest('.choice-number-1').dataset.card, 10);

        valueChangeAce(state, 1, indexHand, indexCard);

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${indexHand} .card-total`).innerHTML = state.humanPlayer.hands[indexHand].cardTotal;

        elements.popupFullScreen.style.display = 'none';
    }

    if(e.target.matches('.choice-number-11')) {

        const indexHand = parseInt(e.target.closest('.choice-number-11').dataset.hand, 10);
        const indexCard = parseInt(e.target.closest('.choice-number-11').dataset.card, 10);

        valueChangeAce(state, 11, indexHand, indexCard);

        document.querySelector(`.board-game.human-player .content .hand.hand-index-${indexHand} .card-total`).innerHTML = state.humanPlayer.hands[indexHand].cardTotal;

        elements.popupFullScreen.style.display = 'none';
    }
});

elements.popupFullScreenClose.addEventListener('click', function () {

    elements.popupFullScreen.style.display = 'none';
});

elements.btnMenu.addEventListener('click', function () {

    elements.menuFullScreen.style.display = 'block';
});

elements.menuFullScreenClose.addEventListener('click', function () {

    elements.menuFullScreen.style.display = 'none';
});

elements.newGame.addEventListener('click', function () {

    clearBoard();

    blackjack.newGame();

    document.querySelector('.board-game.human-player .content .bet-value').value = '';

    blackjack.setGameStatus('waiting');

});

elements.restartGame.addEventListener('click', function () {

    clearBoard();

    blackjack.restartGame();

    elements.playerMoney.textContent = state.humanPlayer.money.toString();

    document.querySelector('.board-game.human-player .content .bet-value').value = '';

    blackjack.setGameStatus('waiting');
});

window.state = state;