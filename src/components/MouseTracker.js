import React, { useEffect, useState, useRef } from "react"

const MouseTracker = ({ TrackingComponent }) => {
    const [target, setTarget] = useState(null)
    const [position, setPosition] = useState(null)
    const ref = useRef()

    const mouseMoveHandler = (e) => {
        setTarget({
            x: e.pageX,
            y: e.pageY
        })

        if(position == null){
            setPosition({
                x: e.pageX,
                y: e.pageY
            })
        }
    }

    const mouseLeaveHandler = () => setTarget(null)

    const animationRef = useRef()

    const animate = () => {
        if(target != null && position != null) {
            const dx = target.x - position.x
            const dy = target.y - position.y

            let m = Math.hypot(dx, dy)

            if(m < 10){
                return setPosition({
                    x: target.x,
                    y: target.y
                })
            }

            const nx = dx / m
            const ny = dy / m

            const newPositionX = position.x + 10 * nx
            const newPositionY = position.y + 10 * ny

            setPosition({
                x: newPositionX,
                y: newPositionY
            })
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        addEventListener("mousemove", mouseMoveHandler)
        addEventListener("mouseleave", mouseLeaveHandler)

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            removeEventListener("mousemove", mouseMoveHandler)
            removeEventListener("mouseleave", mouseLeaveHandler)

            cancelAnimationFrame(animationRef.current)
        }
    }, [target, position])

    return (
        <TrackingComponent ref={ref} position={position} />
    )
}

export default MouseTracker