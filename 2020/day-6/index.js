const fs = require('fs');

const main = async () => {

    // let input = fs.readFileSync('test.txt', 'utf-8');
    let input = fs.readFileSync('input.txt', 'utf-8');
    let groups = input.split('\n\n');

    // PART 1
    console.log(`Part 1:`)
    let yesCounter = 0
    groups.forEach((group) => {

        // remove newlines
        let responses = group.replaceAll('\n','')

        let groupResponses = {}
        for (let response of responses){
            groupResponses[response] = 1
        }

        yesCounter += Object.keys(groupResponses).length

    })
    console.log(`Total number of yes responses: ${yesCounter}`)



    // PART 2
    console.log(`Part 2:`)
    let counter = 0

    // iterate through all groups
    groups.forEach((group) => {

        let obj = {}
        let persons = group.trim().split('\n')

        persons.forEach((person) => {

            let checkedRes = []

            for(let res of person){
                if(!checkedRes.includes(res)){
                    if(obj[res]){
                        obj[res]++
                    } else {
                        obj[res] = 1
                    }
                } else {
                    console.log('person said yes twice')
                }
                checkedRes.push(res)

            }
        })

        for(let key in obj){
            if(obj[key] >= persons.length){
                counter++
            }
        }


        // // get list of all the group's responses by removing newline and spliting each character
        // let groupAnswers = group.replaceAll('\n','').split('')
        // let completedAnswers = []
        //
        // // split up people
        // let individualResponses = group.split('\n')
        //
        // // iterate through each response
        // groupAnswers.forEach((res) => {
        //     if(!completedAnswers.includes(res)){
        //         // if you can't find
        //         let flag = true
        //         individualResponses.forEach((ir) => {
        //             if(ir.indexOf(res) === -1) flag = false;
        //         })
        //         if (flag) counter++;
        //     }
        //     completedAnswers.push(res)
        // })

    })
    console.log(`Number of questions that everyone in a group answered yes to: ${counter}`)
};


main();