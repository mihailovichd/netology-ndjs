#!/usr/bin/env node

const readline = require("readline")
const { stdin: input, stdout: output } = require("process")

// Максимальное число, которое может быть загадано
const MAX_NUMBER = 100

const minNumber = Math.round(Math.random() * MAX_NUMBER)
const maxNumber = Math.round(Math.random() * (MAX_NUMBER - minNumber) + minNumber);
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