import React, { useState, useRef, useEffect, useLayoutEffect } from "react"

const FadeIn = ({ delay, threshold=0.8, className="", children }) => {
    const [applyAnimation, setApplyAnimation] = useState(false)
    const fadeElementRef = useRef()

    const handleFadeElementEvent = () => {
        if (fadeElementRef.current == null) return

        const box = fadeElementRef.current.getBoundingClientRect()

        setApplyAnimation()

        if(box.y < threshold * window.innerHeight){
            setApplyAnimation(true)
        }
    }

    useLayoutEffect(handleFadeElementEvent, [])

    useEffect(() => {
        addEventListener("wheel", handleFadeElementEvent)
        addEventListener("resize", handleFadeElementEvent)

        return () => {
            removeEventListener("wheel", handleFadeElementEvent)
            removeEventListener("resize", handleFadeElementEvent)
        }
    }, [])

    const transitionDelay = typeof delay == "string" ? delay : "0s"

    return (
        <div ref={fadeElementRef} style={{ transitionDelay }} className={className + (applyAnimation ? " fade fade-in" : " fade fade-out")}>
            {
                children
            }
        </div>
    )
}

export default FadeIn