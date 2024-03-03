#!/usr/bin/env node

const readline = require("readline")
const { stdin: input, stdout: output } = require("process")

// Максимальное число, которое может быть загадано
const MAX_NUMBER = 100

const minRangeNumber = Math.round(Math.random() * MAX_NUMBER)
const maxRangeNumber = Math.round(Math.random() * (MAX_NUMBER - minRangeNumber) + minRangeNumber);
const number =  Math.round(Math.random() * (maxRangeNumber - minRangeNumber) + minRangeNumber);

const rl = readline.createInterface({input, output})
const askQuestion = (text) => {
    rl.question(text, (answer) => {
        answer = +answer
        if (answer == number) {
            console.log("Победа!")
            rl.close()
        } else if (answer > number) {
            askQuestion("Меньше")
        } else if (answer < number) {
            askQuestion("Больше")
        }
    })
}
askQuestion(`Загадано число от ${minRangeNumber} до ${maxRangeNumber}`)