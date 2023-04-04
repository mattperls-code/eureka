import React, { Suspense, useState } from "react"

import { Canvas } from "@react-three/fiber"

import TimelineImage from "../components/TimelineImage"
import FastText3D from "../components/FastText3D"

const positionFunction = (x) => {
    const scalar = Math.sqrt(Math.abs(x))
    const num = 3 * x ** 4 + x ** 2
    const den = 2 * x ** 4 + 1000

    return scalar * num / den + 7
}

const TimelineNode = ({ position, offset, img, name, dob, dod, redirectTo }) => {
    const x = position + 5.5 * offset + 17
    
    if (Math.abs(x) > 30) return null

    const z = -positionFunction(x)

    const opacity = Math.abs(x) < 10 ? 1 : 1.7 - Math.abs(0.07 * x)

    return (
        <TimelineImage x={x} z={z} opacity={opacity} img={img} name={name} dob={dob} dod={dod} redirectTo={redirectTo} />
    )
}

const TimelinePage = () => {
    const [position, setPosition] = useState(5)

    const instructionsOpacity = position / 5

    const timelineNodes = []

    for(let i = 0;i<100;i++){
        timelineNodes.push({ offset: i + 1, img: "/assets/images/people/euler.jpg" })
    }

    const timelineNodeRenders = []

    timelineNodes.forEach((node, index) => {
        timelineNodeRenders.push(
            <TimelineNode key={index} position={position} offset={node.offset} img={node.img} name={"Leonhard Euler"} dob={1707} dod={1783} redirectTo={"/bio/euler"} />
        )
    })

    return (
        <React.Fragment>
            <Canvas style={{ width: "100vw", height: "100vh", transform: "translateY(-40px)" }} camera={{ position: [0, 0, 0], rotation: [0, 0, 0] }} frameloop={"demand"} onWheel={(e) => {
                setPosition(Math.max(Math.min(position - 0.02 * e.deltaY, 5), -5.5 * timelineNodes.length - 17))
            }}>
                <perspectiveCamera fov={180} />
                <ambientLight color={"white"} intensity={2} />
                <mesh position={[0, 0, -400]}>
                    <planeGeometry args={[10000, 10000]} />
                    <meshStandardMaterial color={"rgb(240, 240, 240)"} />
                </mesh>
                {
                    position > 0 ? (
                        <Suspense fallback={null}>
                            <FastText3D width={100} position={[0, 0, -50]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={56} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={instructionsOpacity}>Keep scrolling to move forward in time</FastText3D>
                            <FastText3D width={100} position={[0, -10, -50]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={32} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={instructionsOpacity}>To learn more, click on an image</FastText3D>
                        </Suspense>
                    ) : (
                        <Suspense fallback={null}>
                            {
                                timelineNodeRenders
                            }
                        </Suspense>
                    )
                }
            </Canvas>
        </React.Fragment>
    )
}

export default TimelinePage