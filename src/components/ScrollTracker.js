import React, { useEffect, useLayoutEffect, useState, useRef } from "react"

// an abstraction of scroll handling to create easier parallax and interactivity
const ScrollTracker = ({ realScrollHeight, TrackingComponent }) => {
    const [offsetY, setOffsetY] = useState(0)
    const [progress, setProgress] = useState(0)
    const ref = useRef()

    // determine scroll progress through provided element whenever the user scrolls
    const scrollHandler = () => {
        const box = ref.current.getBoundingClientRect()

        setOffsetY(-box.y)

        // clamp progress from 0 to 1 to make sure the tracking component does not animate outside the desired range
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

    // update progress on any event where scroll progress may change
    useEffect(() => {
        addEventListener("wheel", scrollHandler)
        addEventListener("resize", scrollHandler)

        return () => {
            removeEventListener("wheel", scrollHandler)
            removeEventListener("resize", scrollHandler)
        }
    }, [])

    // important to call this or else progress responding styles will not work as desired on loading a page partially scrolled
    useLayoutEffect(scrollHandler, [])
    
    // render provided tracking component inside an element that absorbs the actual scroll event to be tracked
    return (
        <section ref={ref} style={{ height: `calc(100vh + ${realScrollHeight}px)` }}>
            <TrackingComponent progress={progress} offsetY={offsetY} />
        </section>
    )
}

export default ScrollTracker