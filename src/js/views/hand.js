
const renderMenu = index  => `
<div class="col-sm-12 column column-pos-6 text-center p-1 hand-menu">
                <button class="btn btn-dark do-double" data-index="${index}">Double</button>
                <button class="btn btn-dark do-hit" data-index="${index}">Hit</button>
                <button class="btn btn-dark do-split" data-index="${index}">Split</button>
                <button class="btn btn-dark do-stand" data-index="${index}">Stand</button>
</div>`;

export const renderCard = (card, index, indexHand) => `
    <span class="card-game card-${index}"><img src="images/cards/${card.photo}" class="card-deck card-game-img" data-hand="${indexHand}" data-card="${index}" /></span>
`;

export const renderHand = (indexHand, hand, player) => {

    const classPlayer = player === 'human' ? 'human-player' : 'dealer-player' ;

    const betPlayer = player === 'human' ? `<div class="col-sm-6 column column-pos-6 text-center"> Bet : <span class="bet">${hand.bet}</span></div>` : '' ;

    const classActive = indexHand === 0 ? 'active' : '' ;

    const markup = `<div class="col-sm-6 hand hand-index-${indexHand} ${classActive}" style="margin: 0 auto;">
            <div class="row">
            ${betPlayer}
            <div class="col-sm-6 column column-pos-6 text-center" style="margin: auto;">
                Card Total : <span class="card-total">${hand.cardTotal}</span>
            </div>
            <div class="col-sm-12 column column-pos-6 text-center p-2">
                <div class="cards">
                    ${hand.cards.map((el, index) => renderCard(el, index, indexHand)).join('')}
                </div>
            </div>
            ${player === 'human' ? renderMenu(indexHand) : '' }
        </div>
        </div>
    `;

    document.querySelector(`.board-game.${classPlayer} .content > div.hands`).insertAdjacentHTML('beforeend', markup);
};