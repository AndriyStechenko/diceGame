// import dice from "/js/models/dice.js";
import Dice from "/js/models/dice.js";

function createDiceWithValue () {
   let dice = new Dice()
   dice.throwDice()
   return dice
//    let diceWithValue = Object.assign({},obj)
    // diceWithValue.throwDice()
    // return diceWithValue;
}

function drowNewDiceFromObj (diceContainer, dice) {
    const newDiv = document.createElement("div");
    newDiv.className = `dice_pic_${dice.value} main_item `
    diceContainer.appendChild(newDiv);
    newDiv.setAttribute('id' , `dice_${dice.id}`)
}

function createDicesWithDiceValues () {
    const dices = []
    for (let i = 0; i < 5; i++) {
        const dice = createDiceWithValue();
        dice.setId(i + 1)
        dices.push(dice);
    }
    return dices
}

function drawAllDices (dices) {
    let diceContainer = document.getElementById("dice-container");
    for (const dice of dices) {
        drowNewDiceFromObj(diceContainer, dice)
    }
}



export {createDicesWithDiceValues, drawAllDices}