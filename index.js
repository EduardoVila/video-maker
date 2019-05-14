const readline = require('readline-sync');
let start = ()=> {
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
    console.log(content);
}
start()