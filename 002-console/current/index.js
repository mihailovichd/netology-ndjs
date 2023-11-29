#!/usr/bin/env node
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const currentDate = new Date()

const commandsOptions = {
    "year": {
        alias: "y",
        def: {
            get: () => currentDate.getFullYear(),
            set: (value) => currentDate.setFullYear(value)
        },
    },
    "month": {
        alias: "m",
        def: {
            get: () => currentDate.getMonth() + 1,
            set: (value) => currentDate.setMonth(value)
        },
    },
    "date": {
        alias: "d",
        def: {
            get: () => currentDate.getDate(),
            set: (value) => currentDate.setDate(value)
        },
    }
}

const getParam = (argv) => {
    const contains = Object.keys(commandsOptions).filter(option => argv[option])
    if (contains.length > 0) {
        return contains[0]
    }
}

const manageDate = (argv, operation) => {
    const param = getParam(argv)
    const def = commandsOptions[getParam(argv)].def
    if (def) {
        const result = def.set(eval(def.get() + operation + argv[param]))
        console.log(currentDate)
    }
}

const argv = yargs(hideBin(process.argv))
    .command("current", "current time",
        () => {},
        (argv) => {
            const param = getParam(argv)
            console.log(param ? commandsOptions[param].def.get() : currentDate)
        })
    .command("add", "add to current time",
        () => {},
        (argv) => {
            manageDate(argv, "+")
        })
    .command("sub", "sub from current time",
        () => {},
        (argv) => {
            manageDate(argv, "-")
        })
    .options(commandsOptions)
    .argv