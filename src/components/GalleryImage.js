import React from "react"

import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

import FastText3D from "./FastText3D"

// abstraction of several r3f components to create a framed image with the desired transforms
const GalleryImage = React.memo(({ x, y, w, h, borderWidth=0.125, angle, pitch=0, opacity=1, realHeight=5.5, img, caption, redirectTo=null }) => {
    const texture1 = useLoader(THREE.TextureLoader, img)
    const texture2 = useLoader(THREE.TextureLoader, "/assets/images/textures/frame.jpg")

    const theta = angle * Math.PI / 180
    const pitchRadians = pitch * Math.PI / 180

    return (
        <React.Fragment>
            <mesh castShadow position={[x + 0.04 * Math.sin(theta), realHeight, y + 0.04 * Math.cos(theta)]} rotation={[pitchRadians, theta, 0]}>
                <boxGeometry args={[w - 2 * borderWidth, h - 2 * borderWidth, 0.13]} />
                <meshBasicMaterial transparent opacity={opacity} map={texture1} />
            </mesh>
            <mesh castShadow position={[x, realHeight, y]} rotation={[pitchRadians, theta, 0]} onClick={() => {
                if(redirectTo != null){
                    open(location.href.split("#")[0] + "#" + redirectTo)
                }
            }}>
                <boxGeometry args={[w, h, 0.15]} />
                <meshBasicMaterial transparent opacity={opacity} map={texture2} />
            </mesh>
            {
                caption && (
                    <FastText3D width={w + 0.5} position={[x + 0.01 * Math.sin(theta), realHeight - 0.5 * h - 0.5, y + 0.01 * Math.cos(theta)]} rotation={[pitchRadians, theta, 0]} scale={[1, 1, 0.02]} fontSize={100} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={opacity}>
                        {
                            caption
                        }
                    </FastText3D>
                )
            }
        </React.Fragment>
    )
}, (prev, next) => {
    return (
        prev.x == next.x &&
        prev.y == next.y &&
        prev.angle == next.angle &&
        prev.opacity == next.opacity
    )
})

export default GalleryImage