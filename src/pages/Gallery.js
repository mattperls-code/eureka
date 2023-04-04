import React, { useState, useMemo, Suspense } from "react"

import { Canvas, useThree } from "@react-three/fiber"
import { Vector3 } from "three"

import GalleryImage from "../components/GalleryImage"

import { interpolate, SlideAcrossEdge, RotateInPlace } from "../scripts/interpolate"

const GalleryMeshes = React.memo(() => {
    const segmentVertices = [
        [0, 0],
        [10, 0],
        [10, 4],
        [28, 4],
        [28, 12],
        [24, 12],
        [24, 16],
        [16, 16],
        [16, 20],
        [6, 20],
        [6, 10],
        [0, 10],
        [0, 0]
    ]

    const wallRenders = []

    for(let i = 0;i<segmentVertices.length - 1;i++){
        const x = Math.min(segmentVertices[i][0], segmentVertices[i + 1][0])
        const y = Math.min(segmentVertices[i][1], segmentVertices[i + 1][1])
        const w = Math.max(Math.abs(segmentVertices[i][0] - segmentVertices[i + 1][0]), 0.1)
        const h = Math.max(Math.abs(segmentVertices[i][1] - segmentVertices[i + 1][1]), 0.1)

        wallRenders.push(
            <mesh key={i} position={[ x + w / 2, 5, y + h / 2 ]}>
                <boxGeometry args={[ w, 10, h ]} />
                <meshStandardMaterial color={"rgb(240, 240, 240)"} />
            </mesh>
        )
    }
    
    return (
        <React.Fragment>
            <perspectiveCamera fov={180} />

            <pointLight position={[5, 8, 2.5]} intensity={0.7} />
            <pointLight position={[16, 8, 6]} intensity={0.3} />
            <pointLight position={[11, 8, 15]} intensity={0.7} />
            <pointLight position={[20, 8, 12]} intensity={0.3} />
            <pointLight position={[24, 8, 8]} intensity={0.7} />

            <mesh position={[14, -0.05, 10]}>
                <boxGeometry args={[32, 0.1, 24]} />
                <meshStandardMaterial color={"rgb(240, 240, 240)"} />
            </mesh>
            <mesh position={[14, 10.05, 10]}>
                <boxGeometry args={[32, 0.1, 24]} />
                <meshStandardMaterial color={"rgb(240, 240, 240)"} />
            </mesh>
            <mesh position={[16, 0, 10.5]}>
                <boxGeometry args={[10, 4, 3]} />
                <meshStandardMaterial color={"rgb(240, 240, 240)"} />
            </mesh>

            {
                wallRenders
            }

            <Suspense fallback={null}>
                <GalleryImage x={5} y={0.1} w={3} h={3} borderWidth={0.5} angle={0} realHeight={6.0} img={"/assets/images/logo/main.jpg"} />
                
                {
                    // TODO: write a label
                }

                {/* <Text3D position={[ 2.5, 4.25, 0.1 ]} scale={[1, 1, 0.02]} size={0.15} font={"/assets/fonts/content.json"}>
                    Eureka is a site dedicated to recognize the greatest {"\n"}
                    minds throughout history. The hope is that our collection {"\n"}
                    will honor their work as well as inspire the future.
                    <meshBasicMaterial color={"rgb(40, 40, 40)"} />
                </Text3D>
                <Text3D position={[ 2.5, 3.25, 0.1 ]} scale={[1, 1, 0.02]} size={0.15} font={"/assets/fonts/content.json"}>
                    Keep scrolling to tour our virtual museum or investigate {"\n"}
                    other pages to learn more.
                    <meshBasicMaterial color={"rgb(40, 40, 40)"} />
                </Text3D> */}

                <GalleryImage x={10} y={2.2} w={3} h={3} angle={-90} img={"/assets/images/people/mozart.jpg"} caption={"Amadeus Mozart"} redirectTo={"/bio/mozart"} />
                <GalleryImage x={12} y={4.1} w={3} h={3} angle={0} img={"/assets/images/people/newton.jpg"} caption={"Isaac Newton"} redirectTo={"/bio/newton"} />
                <GalleryImage x={15.5} y={4.1} w={3} h={3} angle={0} img={"/assets/images/people/picasso.jpg"} caption={"Pablo Picasso"} redirectTo={"/bio/picasso"} />
                <GalleryImage x={19} y={4.1} w={3} h={3} angle={0} img={"/assets/images/people/lovelace.jpg"} caption={"Ada Lovelace"} redirectTo={"/bio/lovelace"} />
                <GalleryImage x={22.5} y={4.1} w={3} h={3} angle={0} img={"/assets/images/people/shakespeare.jpg"} caption={"William Shakespeare"} redirectTo={"/bio/shakespeare"} />
                <GalleryImage x={26} y={4.1} w={3} h={3} angle={0} img={"/assets/images/people/aristotle.jpg"} caption={"Aristotle"} redirectTo={"/bio/aristotle"} />
                <GalleryImage x={28} y={6.25} w={3} h={3} angle={-90} img={"/assets/images/people/franklin.jpg"} caption={"Benjamin Franklin"} redirectTo={"/bio/franklin"} />
                <GalleryImage x={28} y={9.95} w={3} h={3} angle={-90} img={"/assets/images/people/okeeffe.jpg"} caption={"Georgia O'Keeffe"} redirectTo={"/bio/keeffe"} />
                <GalleryImage x={26} y={12} w={3} h={3} angle={180} img={"/assets/images/people/euler.jpg"} caption={"Leonhard Euler"} redirectTo={"/bio/euler"} />
                <GalleryImage x={24} y={14} w={3} h={3} angle={-90} img={"/assets/images/people/darwin.jpg"} caption={"Charles Darwin"} redirectTo={"/bio/darwin"} />
                <GalleryImage x={21.75} y={16} w={3} h={3} angle={180} img={"/assets/images/people/pasteur.jpg"} caption={"Louis Pasteur"} redirectTo={"/bio/pasteur"} />
                <GalleryImage x={18.25} y={16} w={3} h={3} angle={180} img={"/assets/images/people/euclid.jpg"} caption={"Euclid"} redirectTo={"/bio/euclid"} />
                <GalleryImage x={16} y={18} w={3} h={3} angle={-90} img={"/assets/images/people/austen.jpg"} caption={"Jane Austen"} redirectTo={"/bio/austen"} />
                <GalleryImage x={13.25} y={20} w={3} h={3} angle={180} img={"/assets/images/people/confucius.jpg"} caption={"Confucius"} redirectTo={"/bio/confucius"} />
                <GalleryImage x={8.75} y={20} w={3} h={3} angle={180} img={"/assets/images/people/dali.jpg"} caption={"Salvador Dali"} redirectTo={"/bio/dali"} />
                <GalleryImage x={6.1} y={17.25} w={3} h={3} angle={90} img={"/assets/images/people/beethoven.jpg"} caption={"Ludwig van Beethoven"} redirectTo={"/bio/beethoven"} />
                <GalleryImage x={6.1} y={12.75} w={3} h={3} angle={90} img={"/assets/images/people/einstein.jpg"} caption={"Albert Einstein"} redirectTo={"/bio/einstein"} />
                <GalleryImage x={3.1} y={10} w={4} h={4} angle={180} img={"/assets/images/people/davinci.jpg"} caption={"Leonardo da Vinci"} redirectTo={"/bio/davinci"} />
                <GalleryImage x={0.1} y={7.25} w={3} h={3} angle={90} img={"/assets/images/people/douglass.jpg"} caption={"Fredrick Douglass"} redirectTo={"/bio/douglass"} />
                <GalleryImage x={0.1} y={2.75} w={3} h={3} angle={90} img={"/assets/images/people/locke.jpg"} caption={"John Locke"} redirectTo={"/bio/locke"} />
            </Suspense>
        </React.Fragment>
    )
})

const GalleryScene = ({ position }) => {
    const path = useMemo(() => [
        new SlideAcrossEdge([4, 4], [6, 4], 0),
        new RotateInPlace([6, 4], 0, -90),
        new SlideAcrossEdge([6, 4], [6, 8], -90),
        new RotateInPlace([6, 8], -90, 0),
        new SlideAcrossEdge([6, 8], [24, 8], 0),
        new RotateInPlace([24, 8], 0, -90),
        new RotateInPlace([24, 8], -90, -180),
        new SlideAcrossEdge([24, 8], [20, 8], -180),
        new RotateInPlace([20, 8], -180, -90),
        new SlideAcrossEdge([20, 8], [20, 12], -90),
        new RotateInPlace([20, 12], -90, -180),
        new SlideAcrossEdge([20, 12], [12, 12], -180),
        new RotateInPlace([12, 12], -180, -90),
        new SlideAcrossEdge([12, 12], [12, 16], -90),
        new RotateInPlace([12, 16], -90, -180),
        new SlideAcrossEdge([12, 16], [10, 16], -180),
        new RotateInPlace([10, 16], 180, 90),
        new SlideAcrossEdge([10, 16], [10, 6], 90),
        new RotateInPlace([10, 6], 90, 180),
        new SlideAcrossEdge([10, 6], [4, 6], 180),
        new RotateInPlace([4, 6], 180, 90),
        new SlideAcrossEdge([4, 6], [4, 4], 90),
        new RotateInPlace([4, 4], 90, 0)
    ])

    const interpolated = interpolate(path, position)

    useThree(({ camera }) => {
        camera.position.set(interpolated.position[0], 5.25, interpolated.position[1])
        camera.rotation.setFromVector3(new Vector3(0, interpolated.angle, 5 * 0))
    })

    return (
        <GalleryMeshes />
    )
}

const GalleryPage = () => {
    const [position, setPosition] = useState(1)

    return (
        <Canvas style={{ width: "100vw", height: "100vh" }} frameloop={"demand"} onWheel={(e) => {
            setPosition(position + 0.002 * e.deltaY)
        }}>
            <GalleryScene position={position} />
        </Canvas>
    )
}

export default GalleryPage