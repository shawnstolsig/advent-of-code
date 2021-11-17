const fs = require('fs');

const runCode = (code) => {
    let indexRun = []
    let accumulator = 0

    for(let i = 0; i <= code.length; i++){
        if(i === code.length){
            console.log(`Attempting to run instruction after final instruction...this is a success!`)
            return {accumulator, success: true}
        }
        else if(i<0){
            console.log(`index less than zero...length of code: `, code.length, 'length of indexRun', indexRun.length)
            return {accumulator, success: false}
        }
        else if (indexRun.includes(i)){
            // console.log(`trying to re-run index`, i)
            console.log(`trying to re-run same instruction...length of code: `, code.length, 'length of indexRun', indexRun.length)
            return {accumulator, success: false}
        }
        else {
            indexRun.push(i)
        }

        let {command, value} = parseRow(code[i])

        if (command === 'nop'){
            // do nothing
            // console.log(`No operation, doing nothing`)
        }
        else if (command === 'acc'){
            // console.log(`Adding ${value} to acc`)
            accumulator += value
        } else if (command === 'jmp'){
            // console.log(`Adding ${value-1} to index`)
            i += value - 1

        }

    }
}

const parseRow = (row) => {
    return {
        command: row.slice(0,3),
        value: parseInt(row.slice(4))
    }
}

const main = async () => {

    // let input = fs.readFileSync('test2.txt', 'utf-8');
    let input = fs.readFileSync('input.txt', 'utf-8');
    let code = input.trim().split('\n');

    // PART 1
    console.log(`Part 1:`)
    const { accumulator } = runCode(code)
    console.log('Accumulator: ', accumulator)


    // PART 2
    console.log(`Part 2:`)

    let i = 0                                                       // track which index we are changing
    let codeAttempt = code.map((el) => el)                   // get a fresh copy of the input code
    let {success} = runCode(codeAttempt)                            // set initial success (is positive when all lines of code are executed)
    while(!success){                                                // continue to loop while we have unsucessful code execution
        codeAttempt = code.map((el) => el)                   // get a fresh copy of the input code

        const {command, value} = parseRow(codeAttempt[i])
        if(command === 'nop'){
            codeAttempt[i] = `jmp ${value === 0 ? '+0' : value}`
            console.log(`reset nop to jmp, value`, value, i)
        } else if (command === 'jmp'){
            codeAttempt[i] = `nop ${value === 0 ? '+0' : value}`
            console.log(`reset jmp to nop, value`, value, i)

        }
        success = runCode(codeAttempt).success
        i++
    }
    console.log(`found successful combo, index is ${i} row is ${i+1}`)
};


main();