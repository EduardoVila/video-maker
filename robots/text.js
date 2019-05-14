const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const setenceBoundaryDetection = require('sbd')
const robot = async content =>{
    //beackContentIntoSentences(content)    
    const fetchContentFromWikipedia = async content => {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponde.get()
        content.sourceContentOriginal = wikipediaContent.content
    }
    const sanitizeContent = content =>{
        let removedBlankLines = text =>{
            const allLines = text.split('\n')
            const withoutBlankLines = allLines.filter((line)=>{
                if(line.trim().length === 0){
                    return false
                }
                return true
            })
            return withoutBlankLines
        }
        let removeMarkdown = lines =>{
            const withoutMarkdown = lines.filter((line)=>{
                if(line.trim().startsWith('=')){
                    return false
                }
                return true
            })
            return withoutMarkdown.join(' ')
        }
        let removeDatesInParentheses = text =>{
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /, ' ')
        }
        const withoutBlankLines = removedBlankLines(content.sourceContentOriginal)
        const withoutMarkdown = removeMarkdown(withoutBlankLines)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutMarkdown)
        content.sourceContentSanitized = withoutDatesInParentheses
    }
    let breakContentIntoSentences = content =>{
        content.sentences = []
        const sentences = setenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence)=>{
            content.sentences.push({
                text: sentence,
                keyworkds:[],
                images:[]
            })
        })
    }
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
}
module.exports = robot;