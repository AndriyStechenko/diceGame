// const dice = {
//     id: null,
//     value: null,
//     onHold: false,
//     reRoll: false,
//     throwDice() {
//         this.value = this.roll()
//     },
//     roll() {
//         let rollValue
//         const diceValues = [1, 2, 3, 4, 5, 6];
//         // shuffle array
//         diceValues.sort(() => (Math.random() > 0.5) ? 1 : -1)
//         rollValue = diceValues[0]
//         return rollValue
//     }
// }

// export default dice;

export default class Dice {

    constructor () {
      this.id = null
      this.value = null
      this.onHold = false
      this.reRoll = false
      this.diceValues = [1, 2, 3, 4, 5, 6]
      this.rollValue = null
    }

    throwDice() {
        this.value = this.roll()
    }

    roll() {
        // shuffle array
        this.diceValues.sort(() => (Math.random() > 0.5) ? 1 : -1)
        this.rollValue = this.diceValues[0]
        return this.rollValue
    }

    setId(value) {
        this.id = value
    }
}

