#!/usr/bin/env node

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const time = new Date()

const options = {
    "year": {
        alias: "y",
        def: time.getFullYear,
    },
    "month": {
        alias: "m",
    },
    "date": {
        alias: "d"
    }
}

function contains(argv) {
    return Object.keys(options).filter(option => argv[option])
}

function callDef(argv) {

}

const argv = yargs(hideBin(process.argv))
    .command("current", "current time",
        () => {},
        (argv) => {

        })
    .command("add", "add to current time",
        () => {},
        (argv) => {
            if (argv.year) {
                time.setFullYear(time.getFullYear() + argv.year)
            } else if (argv.month) {
                time.setMonth(time.getMonth() + argv.month)
            } else if (argv.date) {
                time.setDate(time.getDate() + argv.date)
            }
            console.log(time)
        })
    .options(options)
    .argv

console.log(argv)