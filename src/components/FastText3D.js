import React, { useMemo } from "react"

import { CanvasTexture } from "three"

// create a image from text in real time with a lot more room for style control than built in r3f component
const createFastTextMap = (fontSize, fontFamily, color, text) => {
    const virtualCanvas = document.createElement("canvas")
    const ctx = virtualCanvas.getContext("2d")

    virtualCanvas.width = virtualCanvas.height = 1600

    ctx.fillStyle = color
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, 800, 800)

    return new CanvasTexture(virtualCanvas)
}

// memoized to prevent internal rerendering
// generate an image of the text and draw that as a texture to avoid high polygon geometry of actual text
const FastText3D = React.memo(({ width, position, rotation, scale, fontSize, fontFamily, color, opacity, children }) => {
    // memoize the image of the text so it is not regenerated every call
    const map = useMemo(() => {
        return createFastTextMap(fontSize, fontFamily, color, children)
    }, [])

    return (
        <mesh position={position} rotation={rotation} scale={scale}>
            <planeGeometry args={[width, width]} />
            <meshPhongMaterial transparent opacity={opacity} map={map} />
        </mesh>
    )
})

export default FastText3D