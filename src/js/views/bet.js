
export const renderBet = () => {

    const markup = `<div class="row bet">
            <div class="col-sm-12 column column-pos-6 text-center p-2">
                <input type="number" value="30" class="form-control bet-value">
            </div>
            <div class="col-sm-12 column column-pos-6 text-center p-1">
                <button class="btn btn-success send-bet">Send Bet</button>
            </div>
            </div>
        </div>
    `;

    document.querySelector('.board-game.human-player .content').insertAdjacentHTML('beforeend', markup);
};