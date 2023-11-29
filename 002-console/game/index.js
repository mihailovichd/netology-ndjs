#!/usr/bin/env node

const readline = require("readline")
const { stdin: input, stdout: output } = require("process")

const start = readline.createInterface({ input, output })
const number = Math.round(Math.random() * 100)

function question(text) {
    start.question(text, (answer) => {
        game(+answer)
    })
}

function game(answer) {
    if (answer == number) {
        console.log("Победа!")
        start.close()
    } else if (answer > number) {
        question("Меньше")
    } else if (answer < number) {
        question("Больше")
    }
}

question("Загадано число от 0 до 100")