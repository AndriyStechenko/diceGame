export default class Dice {

    constructor () {
      this.id = null
      this.value = null
      this.onHold = false
      this.reRoll = false
      this.rollValue = null
    }

    throwDice() {
        this.value = this.roll()
    }

    diceValues() { return [1, 2, 3, 4, 5, 6] } 

    roll() {
        // shuffle array
        let values = this.diceValues()
        values.sort(() => (Math.random() > 0.5) ? 1 : -1)
        this.rollValue = values[0]
        return this.rollValue
    }

    setId(value) {
        this.id = value
    }

}

