class InterpolationNode {
    constructor(startPosition, endPosition, startDirection, endDirection, length){
        this.startPosition = startPosition
        this.startDirection = startDirection
        this.length = length

        this.deltaPosition = [
            endPosition[0] - startPosition[0],
            endPosition[1] - startPosition[1]
        ]
        this.deltaDirection = [
            endDirection[0] - startDirection[0],
            endDirection[1] - startDirection[1]
        ]
    }
    calculate(displacement){
        const percent = 1 - (displacement / this.length)

        const position = [
            this.startPosition[0] + percent * this.deltaPosition[0],
            this.startPosition[1] + percent * this.deltaPosition[1]
        ]
        const direction = [
            this.startDirection[0] + percent * this.deltaDirection[0],
            this.startDirection[1] + percent * this.deltaDirection[1]
        ]

        const angle = Math.atan2(direction[1], direction[0])

        return {
            position,
            angle
        }
    }
}

class SlideAcrossEdge extends InterpolationNode {
    constructor(position1, position2, angle){
        const direction = [ Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180) ]

        const distance = Math.hypot(position2[0] - position1[0], position2[1] - position1[1])

        super(position1, position2, direction, direction, distance)
    }
}

class RotateInPlace extends InterpolationNode {
    constructor(position, angle1, angle2){
        const direction1 = [ Math.cos(angle1 * Math.PI / 180), Math.sin(angle1 * Math.PI / 180) ]
        const direction2 = [ Math.cos(angle2 * Math.PI / 180), Math.sin(angle2 * Math.PI / 180) ]

        super(position, position, direction1, direction2, 4 * Math.abs(angle1 - angle2) / 90)
    }
}

const getPathLength = (path) => {
    let sum = 0

    path.forEach(node => {
        sum += node.length
    })

    return sum
}

const interpolate = (path, position) => {
    const pathLength = getPathLength(path)

    while(position < 0){
        position += pathLength
    }

    position = position % getPathLength(path)

    let distanceTraveled = 0

    let i = 0

    while(distanceTraveled < position){
        distanceTraveled += path[i].length
        i++
        if(distanceTraveled >= position){
            i--
        }
    }

    const displacement = distanceTraveled - position

    return path[i].calculate(displacement)
}

export {
    interpolate,
    SlideAcrossEdge,
    RotateInPlace
}