export const elements = {
    playerBoard: document.querySelector('.board-game.human-player'),
    playerMoney: document.querySelector('.board-game.human-player .content .money'),
    playerHands: document.querySelector('.board-game.human-player .content .hands'),
    boxStatusText: document.querySelector('.box-status .text'),
    boxAlert: document.querySelector('.box-alert'),
    boxAlertText: document.querySelector('.box-alert .content'),
    choiceNumber: document.querySelector('.choice-number'),
    choiceNumber1: document.querySelector('.choice-number-1'),
    choiceNumber11: document.querySelector('.choice-number-11'),
    menuGameStatus: document.querySelector('.menu .game-status'),
    btnMenu: document.querySelector('.btn-menu'),
    menuFullScreen: document.querySelector('.menu-full-screen'),
    menuFullScreenClose: document.querySelector('.menu-full-screen .close'),
    newGame: document.querySelector('.new-game'),
    restartGame: document.querySelector('.restart-game'),
    popupFullScreen: document.querySelector('.popup-full-screen'),
    popupFullScreenClose: document.querySelector('.popup-full-screen .close')
};

export const clearBoard = () => {

    document.querySelector('.board-game.human-player .row.hands').innerHTML = '';

    document.querySelector('.board-game.human-player .content > .bet').style.display = 'block';

    document.querySelector('.board-game.dealer-player .row.hands').innerHTML = '';

    elements.playerHands.textContent = '0';

    elements.menuGameStatus.textContent = 'waiting';

    elements.boxStatusText.textContent = `Game waiting`;

    elements.menuFullScreen.style.display = 'none';
};

export const isAce = (indexHand, indexCard) => {

    elements.choiceNumber1.dataset.hand = indexHand;
    elements.choiceNumber1.dataset.card = indexCard;
    elements.choiceNumber11.dataset.hand = indexHand;
    elements.choiceNumber11.dataset.card = indexCard;

    elements.popupFullScreen.style.display = 'block';
};

export const valueChangeAce = (state, number, indexHand, indexCard) => {

    state.humanPlayer.hands[indexHand].cardTotal -= state.humanPlayer.hands[indexHand].cards[indexCard].number;

    state.humanPlayer.hands[indexHand].cards[indexCard].number = number;

    state.humanPlayer.hands[indexHand].cardTotal += number;
};