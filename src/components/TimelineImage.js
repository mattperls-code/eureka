import React from "react"

import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

import FastText3D from "./FastText3D"

// memoized to avoid costly rerender of this component in a scene with 100+ children
// abstracts the process of displaying a timeline image
const TimelineImage = React.memo(({ x, z, opacity, img, name, dob, dod, era, redirectTo="" }) => {
    const texture1 = useLoader(THREE.TextureLoader, img)
    const texture2 = useLoader(THREE.TextureLoader, "/assets/images/textures/frame.jpg")

    const w = 3
    const h = 3

    return (
        <React.Fragment>
            <mesh position={[x, 0, z + 0.02]} rotation={[0, 0, 0]}>
                <boxGeometry args={[w - 0.25, h - 0.25, 0.13]} />
                <meshPhongMaterial transparent opacity={opacity} map={texture1} />
            </mesh>
            <mesh position={[x, 0, z]} rotation={[0, 0, 0]} onClick={() => {
                open(location.href.split("#")[0] + "#" + redirectTo)
            }}>
                <boxGeometry args={[w, h, 0.15]} />
                <meshPhongMaterial transparent opacity={opacity} map={texture2} />
            </mesh>
            <FastText3D width={w + 0.5} position={[x, -0.5 * h - 0.5, z]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={160} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={opacity}>
                {
                    name
                }
            </FastText3D>
            <FastText3D width={w + 0.5} position={[x, -0.5 * h - 1.0, z]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={100} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={opacity}>
                {
                    dob + " - " + dod + " " + era
                }
            </FastText3D>
        </React.Fragment>
    )
}, (prev, next) => {
    return (
        prev.x == next.x &&
        prev.z == next.z &&
        prev.opacity == next.opacity
    )
})

export default TimelineImage