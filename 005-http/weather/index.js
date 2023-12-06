const http = require('http')
const readline = require('readline')
const { stdin: input, stdout: output } = require("process")

const rl = readline.createInterface({ input, output })
rl.question('Напишите свой город', (answer) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.apiKey}&query=${answer}`
    http.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.log(res.statusCode)
            return
        }

        let data = ''
        res.on('data', (chunk) => data += chunk)
        res.on('end', () => {
            const parseData = JSON.parse(data)
            console.log(parseData)
        })
    }).on('error', (err) => {
        console.log(err)
    })
})