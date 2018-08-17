var assert = require('assert');
var { Game, GAMESTATE } = require('../src/Game');


describe( 'game startup', ()=>{ 
    let game = new Game();

    it( 'should be initialized by default', ()=> {
        assert.equal(game.getGameState(), GAMESTATE['INITIALIZED']);
    })
      
    it( 'should be starting a new when new game started', ()=> {
        game.startNewGame();
        assert.equal(game.getGameState(), GAMESTATE['STARTED']);
    })

    it( 'should be ongoing after first move', ()=> {
        game.mark(0);
        assert.equal(game.getGameState(), GAMESTATE['ONGOING']);
    })

    it( 'should be ended after first winner', ()=> {
        game.startNewGame();
        game.mark(0); // FIRST PLAYER
        game.mark(3); // SECOND PLAYER
        game.mark(1); // FIRST PLAYER
        game.mark(4); // SECOND PLAYER
        game.mark(2); // FIRST PLAYER
        game.mark(5); // SECOND PLAYER

        assert.equal(game.getGameState(), GAMESTATE['ENDED']);
    })
})

describe( 'game play', ()=>{
  
    let game = {};

    beforeEach(function() {
        game = new Game();
    });

    it( 'should change players after selection', ()=> {
        let current_player = game.currentPlayer();
        game.mark(0);
        assert.notEqual(current_player, game.currentPlayer());
    })

    it( 'should not allow double selection of selected boxes', ()=> {
        assert.equal(game.mark(0), true);
        assert.equal(game.mark(0), false);
    })

    it( 'should make anyone that gets a full row first to be the winner', ()=> {
        let player = game.currentPlayer();
        game.mark(0); // FIRST PLAYER
        let other_player = game.currentPlayer();
        game.mark(3); // SECOND PLAYER
        game.mark(1); // FIRST PLAYER
        game.mark(4); // SECOND PLAYER
        game.mark(2); // FIRST PLAYER
        game.mark(5); // SECOND PLAYER

        assert.equal(game.getGameState(), GAMESTATE['ENDED']);
        assert.equal(game.getWinner(), player);

        let players = game.getPlayers();
        assert.equal(players[player].wins, 1);
        assert.equal(players[player].losts, 0);
        assert.equal(players[other_player].wins, 0);
        assert.equal(players[other_player].losts, 1);
    })

    it( 'should make anyone that gets a full col first to be the winner', ()=> {
        let player = game.currentPlayer();
        game.mark(0); // FIRST PLAYER
        let other_player = game.currentPlayer();
        game.mark(1); // SECOND PLAYER
        game.mark(3); // FIRST PLAYER
        game.mark(4); // SECOND PLAYER
        game.mark(6); // FIRST PLAYER
        game.mark(7); // SECOND PLAYER

        assert.equal(game.getGameState(), GAMESTATE['ENDED']);
        assert.equal(game.getWinner(), player);

        let players = game.getPlayers();

        assert.equal(players[player].wins, 1);
        assert.equal(players[player].losts, 0);
        assert.equal(players[other_player].wins, 0);
        assert.equal(players[other_player].losts, 1);
    })

    it( 'should make anyone that gets a full diagonal first to be the winner', ()=> {
        let player = game.currentPlayer();
        game.mark(0); // FIRST PLAYER
        let other_player = game.currentPlayer();
        game.mark(2); // SECOND PLAYER
        game.mark(4); // FIRST PLAYER
        game.mark(5); // SECOND PLAYER
        game.mark(8); // FIRST PLAYER
        game.mark(6); // SECOND PLAYER

        assert.equal(game.getGameState(), GAMESTATE['ENDED']);
        assert.equal(game.getWinner(), player);

        let players = game.getPlayers();

        assert.equal(players[player].wins, 1);
        assert.equal(players[player].losts, 0);
        assert.equal(players[other_player].wins, 0);
        assert.equal(players[other_player].losts, 1);
    })
})