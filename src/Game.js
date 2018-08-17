const EMPTYBOX      = '';
const CROSSDASH     = '-';
const CROSSVERTICAL = '|';
const CROSSSLASH    = '/';
const CROSSBSLASH   = '\\';
const PLAYER1       = 1;
const PLAYER2       = 2;
const OWIN          = 'OOO';
const XWIN          = 'XXX';
const GAMESTATE     = { 'INITIALIZED' : 'READY!!', 'STARTED' : 'Game Started', 'ONGOING' : 'Game Ongoing', 'ENDED': 'Game Ended' };

class Game {
    /**
     * Initialize players and grid
     */
    constructor() {
        this.current_player = Math.floor(Math.random() * 2)  + 1;
        this.other_player   = (this.current_player === PLAYER1) ? PLAYER2 : PLAYER1;
        this.players        = { 1 : {mark: 'O', wins: 0, losts: 0},
                                2 : {mark: 'X', wins: 0, losts: 0}};
        this.game_state     = GAMESTATE['INITIALIZED'];
        this.grid           = new Array(9).fill(EMPTYBOX);
        this.winner         = undefined;
    }

    /**
     * Wipes the grid and starts a new game but maintains player stats.
     */
    startNewGame(){
        this.current_player = Math.floor(Math.random() * 2)  + 1;
        this.other_player   = (this.current_player === PLAYER1) ? PLAYER2 : PLAYER1;
        this.game_state     = GAMESTATE['STARTED'];
        this.grid           = new Array(9).fill(EMPTYBOX);
        this.winner         = undefined;
    }

    /**
     * Getter for game state
     * @returns {String} the state of the game
     */
    getGameState(){
        return this.game_state;
    }

    /**
     * Retrieve the players
     * @returns {Object} an object containing players details 
     */
    getPlayers(){
        return this.players;
    }

    getGrid(){
        return this.grid;
    }

    /**
     * Switch to other player
     */
    switchPlayer(){
        let temp = this.current_player;
        this.current_player = this.other_player;
        this.other_player = temp;
    }
    
    /**
     * @returns {Number} the current player
     */
    currentPlayer(){ return this.current_player; }

    /**
     * @returns {Number} the winning player
     */
    getWinner(){ return this.winner };

    /**
     * Helper to determine if a string match a winning combo
     * @param {String} str string to compare to winning combo
     * @returns {Boolean} win or not
     */
    isWin(str){ return (str === OWIN || str === XWIN) ? true : false; }

    /**
     * Checks if a given set of boxes matches a winning combo
     * @param {Array} boxes indexs of boxes in grid to check
     * @param {String} cross the type of cross to replace the box with
     * 
     * @returns {Boolean} true if it's a win and false otherwise
     */
    checkBoxes(boxes, cross){
        let str = '';
        boxes.forEach( (i) =>  { str+= this.grid[i]});
        if(this.isWin(str)){ boxes.forEach( (i) =>  { this.grid[i] = cross }); return true; }
        return false;
    }

    /**
     * Determines if it's a row win
     * @returns {Boolean} true if it's a row win, false otherwise
     */
    checkRows(){
        return (this.checkBoxes([0,1,2], CROSSDASH) || this.checkBoxes([3,4,5], CROSSDASH) || this.checkBoxes([6,7,8], CROSSDASH));
    }

    /**
     * Determines if it's a col win
     * @returns {Boolean} true if it's a column win false otherwise
     */
    checkCols(){
        return (this.checkBoxes([0,3,6], CROSSVERTICAL) || this.checkBoxes([1,4,7], CROSSVERTICAL) || this.checkBoxes([2,5,8], CROSSVERTICAL));
    }

    /**
     * Determines if it's a diagonal win
     * @returns {Boolean} true if it's a diagonal win false otherwise
     */
    checkDiags(){
        return (this.checkBoxes([0,4,8], CROSSBSLASH) || this.checkBoxes([6,4,2], CROSSSLASH));
    }

    /**
     * @returns {Boolean} if last move was a winning move
     */
    checkWinner(){
        if (this.checkRows() || this.checkCols() || this.checkDiags()) {
            return true;
        }
        return false;
    }

    /**
     * Check if a game ends in a tie.
     * 
     * @returns {Boolean} true if it's a a tie false otherwise.
     */
    checkScratch(){
        let tie = true;
        this.grid.forEach( (cell) => { if(cell === EMPTYBOX ) { tie = false; }});
        return tie;
    }

    /**
     * Markes the selected box 
     * @param {Interger} pos the index of the box selected.
     * @returns {Boolean} true if valid selection false if invalid.
     */
    mark(pos){
        
        if(this.grid[pos] === EMPTYBOX && this.game_state !== GAMESTATE['ENDED']){
            this.grid[pos] = this.players[this.current_player].mark;
            if(this.checkWinner()){
                this.winner = this.current_player;
                this.players[this.current_player].wins+=1;
                this.players[this.other_player].losts+=1;
                this.game_state = GAMESTATE['ENDED'];
            } else if (this.checkScratch()) {
                this.game_state = GAMESTATE['ENDED'];
            }
             else {
                this.game_state = GAMESTATE['ONGOING'];
                this.switchPlayer();
            }
            return true;
        }
        return false;
    }
}

module.exports = { Game, GAMESTATE, PLAYER1, PLAYER2 };