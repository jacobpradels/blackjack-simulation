var cards = [2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11];
var faceCards = ["10","J","Q","K"]
var drawnCards = [];
var dealerCards = [];
var playerCards = [];
var dealerCardValue;
var playerCardValue;
var playerCashValue = 10;
var dealerText = document.getElementById("dealer-text");
var playerText = document.getElementById('player-text');
var playerCash = document.getElementById("player-cash");
var recentAction = document.getElementById("most-recent");
var dealerDisplayCards = document.getElementById("dealer-cards");
var playerDisplayCards = document.getElementById("player-cards");
var playButton = document.getElementById("play-button");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");

function drawRandom(n,player) {
  drawnCards;
  var total = 0;
  var i;
  for (i = 0; i < n; i++) {
    cardsChoice = Math.floor(Math.random() * cards.length)
    total += cards[cardsChoice];
    drawnCards.push(cards[cardsChoice]);
    player.push(cards[cardsChoice])
    cards.splice(cardsChoice, 1);
  }
  return total;
}

function countAces(cards) {
  var total = 0;
  var g;
  for (g = 0; g < cards.length; g++) {
    if (cards[g] == 11) {
      total += 1;
    }
  }
  return total;
}

function countDeductions(cards) {
  var total = 0;
  var g;
  for (g = 0; g < cards.length; g++) {
    if (cards[g] == -1) {
      total += 1;
    }
  }
  return total;
}

function updateRecent(text) {
  recentAction.innerHTML = text;
}

function showPlayAgain() {
  playButton.style.visibility = "visible";
  hitButton.style.visibility = "hidden";
  stayButton.style.visibility = "hidden";

}

function mainFunction() {
  playButton.style.visibility = "hidden";
  hitButton.style.visibility = "visible";
  stayButton.style.visibility = "visible";
  if (cards.length < 8) {
    //updateRecent("Re-shuffling cards")
    cards = [2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11];
    //cards = [10,10,10,10,10,11,11,11,11,11,11,10,10,10,10,10,11,11,11,11,11,11,10,10,10,10,10,11,11,11,11,11,11]
    drawnCards = []
  }
  dealerCards = []
  playerCards = []
  dealerCardValue = drawRandom(2,dealerCards);
  playerCardValue = drawRandom(2, playerCards);
  checkBlackjack();

  updateHands();
  updateCash();
}

function checkAces(playerValue, playerCards) {
  if (playerValue > 21 && countAces(playerCards) > countDeductions(playerCards)) {
    return true;
  }
  return false;
}

function updateHands() {
  dealerDisplayCards.innerHTML = "Dealer's Cards : ";
  playerDisplayCards.innerHTML = "Player's Cards : ";
  dealerText.innerHTML = "Dealer's hand : " + dealerCardValue;
  playerText.innerHTML = "Your hand : " + playerCardValue;
  var g;
  for (g = 0; g < dealerCards.length; g++) {
    if (dealerCards[g] == 10) {
      var randomChoice = Math.floor(Math.random() * faceCards.length)
      dealerDisplayCards.innerHTML += faceCards[randomChoice] + " ";
    } else if (dealerCards[g] == 11) {
      dealerDisplayCards.innerHTML += "A ";
    } else if (dealerCards[g] != -1) {
      dealerDisplayCards.innerHTML += dealerCards[g] + " ";
    }
  }
  var c;
  for (c = 0; c < playerCards.length; c++) {
    if (playerCards[c] == 10) {
      var randomChoice = Math.floor(Math.random() * faceCards.length)
      playerDisplayCards.innerHTML += faceCards[randomChoice] + " ";
    } else if (playerCards[c] == 11) {
      playerDisplayCards.innerHTML += "A ";
    } else if (playerCards[c] != -1) {
      playerDisplayCards.innerHTML += playerCards[c] + " ";
    }
  }
  var p;
}

function updateCash() {
  playerCash.innerHTML = "Cash : " + playerCashValue;
}

function hit() {
  playerCardValue += drawRandom(1, playerCards);
  updateHands();
  if (playerCardValue > 21 && !checkAces(playerCardValue,playerCards)) {
    updateRecent("Player loses, bust " + playerCardValue)
    playerCashValue--;
    showPlayAgain();
  } else if (playerCardValue > 21 && checkAces(playerCardValue, playerCards)) {
    //alert('Player had an ace removed 10');
    playerCards.push(-1);
    playerCardValue -= 10;
    updateHands();
  }
}

function stay() {
  while (dealerCardValue < 17) {
    dealerCardValue += drawRandom(1, dealerCards);
    updateHands();
    if (dealerCardValue > 21 && checkAces(dealerCardValue, dealerCards)) {
      //alert('Dealer had aces removed 10');
      dealerCards.push(-1);
      dealerCardValue -= 10;
      updateHands();
    }
  }
  checkWinner();
}

function checkBlackjack() {
  if (playerCardValue == 21) {
    updateRecent("Player wins, blackjack");
    playerCashValue += 1;
    showPlayAgain();
  } else if (dealerCardValue == 21) {
    updateRecent("Dealer wins, blackjack");
    playerCashValue += 1;
    showPlayAgain();
  } else if (dealerCardValue == playerCardValue) {
    updateRecent("Push");
    showPlayAgain();
  }
}

function checkWinner() {
  if (dealerCardValue > 21 && !checkAces(dealerCardValue, dealerCards)){
    updateRecent("Dealer busts " + dealerCardValue + ", player wins");
    playerCashValue += 1;
    showPlayAgain();
  } else if (playerCardValue > dealerCardValue) {
    updateRecent("Player wins, higher cards than dealer. Player : " + playerCardValue + " Dealer : " + dealerCardValue);
    showPlayAgain();
    playerCashValue += 1;
  } else if (playerCardValue < dealerCardValue) {
    updateRecent("Dealer wins, higher cards than player. Player : " + playerCardValue + " Dealer : " + dealerCardValue);
    showPlayAgain();
    playerCashValue -= 1;
  } else if (dealerCardValue == playerCardValue) {
    updateRecent("Push");
    showPlayAgain();
  }
}

mainFunction();

function displayArray(array) {
  var p;
  for (p = 0; p < array.length; p++) {
    updateRecent(array[p]);
  }
}
