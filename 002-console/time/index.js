#!/usr/bin/env node
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const currentDate = new Date()

const commandOptions = {
    year: {
        alias: "y",
        func: {
            get: () => currentDate.getFullYear(),
            set: (value) => currentDate.setFullYear(value)
        }
    },

    month: {
        alias: "m",
        func: {
            get: () => currentDate.getMonth() + 1,
            set: (value) => currentDate.setMonth(value - 1),
        },
    },

    day: {
        alias: "d",
        func: {
            get: () => currentDate.getDate(),
            set: (value) => currentDate.setDate(value),
        },
    }
}

const GET_OPERATION = 0
const ADD_OPERATION = 1
const SUB_OPERATION = 2

const getOperationResultWithOption = (argv, operation) => {
    const option = Object.keys(commandOptions).find(option => argv[option])
    if (!option) return currentDate

    const func = commandOptions[option].func
    const optionValue = func.get()

    switch (operation) {
        case GET_OPERATION:
            return optionValue
        case ADD_OPERATION:
            func.set(optionValue + argv[option])
            break
        case SUB_OPERATION:
            func.set(optionValue - argv[option])
            break
    }
    return currentDate
}

yargs(hideBin(process.argv))
    .command("current", "current time",
        () => {},
        (argv) => {
            console.log(getOperationResultWithOption(argv, GET_OPERATION))
        })
    .command("add", "add to current time",
        () => {},
        (argv) => {
            console.log(getOperationResultWithOption(argv, ADD_OPERATION))
        })
    .command("sub", "sub from current time",
        () => {},
        (argv) => {
            console.log(getOperationResultWithOption(argv, SUB_OPERATION))
        })
    .options(commandOptions)
    .argv