import data from "../data.json"

const alphabetize = (arr) => {
    return arr.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()

        return (nameA < nameB) ? -1 : 1
    })
}

const getFromId = (id) => {
    return [...data].find((person => person.id == id))
}

const getAll = () => {
    return alphabetize([...data])
}

const getFromSubject = (subject) => {
    return alphabetize([...data].filter(person => person.subjects.includes(subject)))
}

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