#!/usr/bin/env node

const readline = require("readline")
const { stdin: input, stdout: output } = require("process")

const minNumber = Math.round(Math.random() * 100)
const maxNumber = Math.round(Math.random() * (100 - minNumber) + minNumber);
const number =  Math.round(Math.random() * (maxNumber - minNumber) + minNumber);

const start = readline.createInterface({input, output})
const writeQuestion = (text) => {
    start.question(text, (answer) => {
        answer = +answer
        if (answer == number) {
            console.log("Победа!")
            start.close()
        } else if (answer > number) {
            writeQuestion("Меньше")
        } else if (answer < number) {
            writeQuestion("Больше")
        }
    })
}
writeQuestion(`Загадано число от ${minNumber} до ${maxNumber}`)