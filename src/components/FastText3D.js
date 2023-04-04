import React, { useMemo } from "react"

import { CanvasTexture } from "three"

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

const FastText3D = React.memo(({ width, position, rotation, scale, fontSize, fontFamily, color, opacity, children }) => {
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