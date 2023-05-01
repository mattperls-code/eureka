import data from "../data.json"

// helper to get alphabetic order list of people for the explore page and other use cases
const alphabetize = (arr) => {
    return arr.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()

        return (nameA < nameB) ? -1 : 1
    })
}

// querying from json data
const getFromId = (id) => {
    return [...data].find((person => person.id == id))
}

// alphabetize wrapper for json data
const getAll = () => {
    return alphabetize([...data])
}

// query by subject
const getFromSubject = (subject) => {
    return alphabetize([...data].filter(person => person.subjects.includes(subject)))
}

// sort by time order, accounts for CE and BCE
const getTimeline = () => {
    return [...data].sort((a, b) => {
        if(a.era == b.era){
            if(a.era == "CE"){
                return (a.born > b.born) ? 1 : -1
            } else {
                return (a.born < b.born) ? 1 : -1
            }
        } else if(a.era == "CE"){
            return 1
        } else {
            return -1
        }
    })
}

export {
    getFromId,
    getAll,
    getFromSubject,
    getTimeline
}