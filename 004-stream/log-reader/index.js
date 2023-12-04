const readline = require("readline")
const { stdin: input, stdout: output } = require("process")
const fs = require('fs')

const rl = readline.createInterface({ input, output })
rl.question('Укажите путь к файлу логов', (answer) => {
    const data = fs.readFileSync(answer).toString()
    const games = data.replace(/\r/g, '').split('\n')

    const countInGames = (element) => games.filter((value) => value == element).length
    const wons = countInGames('true')

    console.log(`Общее кол-во партий: ${games.length}, кол-во побед ${wons},
        кол-во проигрышей: ${countInGames('false')}, соотношение выигранных партий к общей сумме: ${wons / games.length * 100}%`)
})