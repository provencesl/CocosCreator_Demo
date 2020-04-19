/** 
var game = require("Game");
FBInstant.player
  .setDataAsync({ 
    best: game.score,
  })
  .then(function() {
    console.log('data is set');
  });

  */