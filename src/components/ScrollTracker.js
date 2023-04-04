import React, { useEffect, useLayoutEffect, useState, useRef } from "react"

const ScrollTracker = ({ realScrollHeight, TrackingComponent }) => {
    const [offsetY, setOffsetY] = useState(0)
    const [progress, setProgress] = useState(0)
    const ref = useRef()

    const scrollHandler = () => {
        const box = ref.current.getBoundingClientRect()

        setOffsetY(-box.y)

        if(box.y < 0){
            if(-box.y / realScrollHeight > 1){
                setProgress(1)
            } else {
                setProgress(-box.y / realScrollHeight)
            }
        } else {
            setProgress(0)
        }
    }

    useEffect(() => {
        addEventListener("wheel", scrollHandler)
        addEventListener("resize", scrollHandler)

        return () => {
            removeEventListener("wheel", scrollHandler)
            removeEventListener("resize", scrollHandler)
        }
    }, [])

    useLayoutEffect(scrollHandler, [])
    
    return (
        <section ref={ref} style={{ height: `calc(100vh + ${realScrollHeight}px)` }}>
            <TrackingComponent progress={progress} offsetY={offsetY} />
        </section>
    )
}

export default ScrollTracker