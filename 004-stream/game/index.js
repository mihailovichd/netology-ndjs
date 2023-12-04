const readline = require('readline')
const { stdin: input, stdout: output } = require('process')
const fs = require('fs')

const rl = readline.createInterface({ input, output })
rl.question('Напишите имя файла для логирования игры', (answer) => {
    const logFile = fs.createWriteStream(answer, { flags: 'a' })
    const playGame = () => {
        rl.question('Загадно число от 1 до 2', (answer) => {
            const number = Math.ceil(Math.random() * 2)
            if (+answer == number) {
                console.log('Вы выиграли!')
                logFile.write('true\n')
            } else {
                console.log(`Было загадано число ${number}`)
                logFile.write('false\n')
            }
            playGame()
        })
    }
    playGame()
})
