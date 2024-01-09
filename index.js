/*
Introduction
You find a strange mirror that always shows a hand that is moving. The hand appears to be alive, and after a lot of questions of "yes" and "no" answer, you know that the hand is trying to teach you a program that is written in HPL (Hand Programming Language).

This language works with a memory of an indefinite size of bytes, with all values initialized to 0. This language haves 7 instructions:

👉 : moves the memory pointer to the next cell

👈 : moves the memory pointer to the previous cell

👆 : increment the memory cell at the current position

👇 : decreases the memory cell at the current position.

🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛

🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜

👊 : Display the current character represented by the ASCII code defined by the current position.

Notes:
As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
Loops of 🤜 and 🤛 can be nested.
Tests
The hand shows you two small programs and their outputs:

This program display "Hello"
👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊

This program (with nested loops) display "Hello World!"
👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊
*/

const Min_Cell = 0
const Max_Cell = 250

const clamp = value =>{
    if (value > Max_Cell) return Min_Cell
    if (value < Min_Cell) return Max_Cell
    return value
}

const getNextFistIndex = (index , instructions) => {
    let fists = 1
    for (let i = index + 1; i < ArrayOfIntructions.length; i++) {
        if( instructions[i] === "🤜") fists++
        if( instructions[i] === "🤛") fists--
        if (fists === 0) return i
    }

}

const getPrevFistIndex = (index , instructions) => {
    let fists = 1
    for (let i = index - 1; i >= 0; i--) {
        if( instructions[i] === "🤛") fists++
        if( instructions[i] === "🤜") fists--
        if (fists === 0) return i
    }

}

export function translate (string) {
    const memory = [0]

    const pointer = 0
    const index = 0
    const output = ""

    const ArrayOfIntructions = Array.from(string)

    const actions = {
        "👉": () => {
            pointer++
            memory[pointer] ??= 0
        },
        "👈": () => {
            pointer--
            memory[pointer] ??= 0
        },
        "👆": () => {
         memory[pointer] = clamp(memory[pointer] + 1)
        },

        "👇"  :() => {
            memory[pointer] = clamp(memory[pointer] - 1)
        },

        "🤜" :() =>{
            if (memory[pointer] === 0 ){
                index = getNextFistIndex(index, ArrayOfIntructions)
            }
            
        },

        "🤛" :() =>{
            if (memory[pointer] !== 0 ){
                index = getPrevFistIndex(index, ArrayOfIntructions)
            }
        },

        "👊" :() =>{
            output += String.fromCharCode(memory[pointer])
        }

    }

    while( index < ArrayOfIntructions.length) {
        const action = ArrayOfIntructions[index]
        actions[action]()
        console.log(action)
        index++
    }
     return output
    }


     console.log(
        translate("👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊")
     )
