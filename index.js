const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js')
}
let start = async ()=> {
    const content = {}
    let askAndReturnSearchTerm = ()=>{
        return readline.question('Type a Wikipedia search term: ')
    }
    let askAndReturnPrefix = ()=>{
        const prefixes = ['Who is','What is','The history of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes,'Choose one option: ')
        const selectedPrefixText = prefixes[selectedPrefixIndex]
        return selectedPrefixText
    }
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()
    await robots.text(content);
    console.log(content);
}
start()