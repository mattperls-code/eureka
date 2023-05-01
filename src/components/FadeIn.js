import React, { useState, useRef, useEffect, useLayoutEffect } from "react"

// an abstraction for fading in and out based on visibility of an element on the screen
const FadeIn = ({ delay, threshold=0.8, className="", children }) => {
    const [applyAnimation, setApplyAnimation] = useState(false)
    const fadeElementRef = useRef()

    // determine if the bounding box is within the specified view threshold, then update animation styling to reflect this
    const handleFadeElementEvent = () => {
        if (fadeElementRef.current == null) return

        const box = fadeElementRef.current.getBoundingClientRect()

        setApplyAnimation()

        if(box.y < threshold * window.innerHeight){
            setApplyAnimation(true)
        }
    }

    // this is important to call or else all element styling will not reflect true visibility until another event fires
    useLayoutEffect(handleFadeElementEvent, [])

    // check visibility and update whenever user scrolls or resizes (anything that would change viewport)
    useEffect(() => {
        addEventListener("wheel", handleFadeElementEvent)
        addEventListener("resize", handleFadeElementEvent)

        return () => {
            removeEventListener("wheel", handleFadeElementEvent)
            removeEventListener("resize", handleFadeElementEvent)
        }
    }, [])

    const transitionDelay = typeof delay == "string" ? delay : "0s"

    // render supplied child with a wrapper to handle the faded in and out states
    return (
        <div ref={fadeElementRef} style={{ transitionDelay }} className={className + (applyAnimation ? " fade fade-in" : " fade fade-out")}>
            {
                children
            }
        </div>
    )
}

export default FadeIn