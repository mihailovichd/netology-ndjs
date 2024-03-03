const readline = require('readline')
const { stdin: input, stdout: output } = require('process')
const fs = require('fs')

const rl = readline.createInterface({ input, output })
rl.question('Напишите имя файла для логирования игры', (answer) => {
    const logFile = fs.createWriteStream(answer, { flags: 'a' })
    const playGame = () => {
        rl.question('Загадно число от 1 до 2', (answer) => {
            const number = Math.ceil(Math.random() * 2)
            const isWon = +answer == number
            console.log(isWon ? 'Вы выиграли!' : `Было загадано число ${number}`)
            logFile.write(isWon ? 'true\n' : 'false\n')
            playGame()
        })
    }
    playGame()
})
