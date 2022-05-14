import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import Header from "ui/tcf/Header";

import {
  Heading as ProfileHeading,
  Profile as ProfileContents,
  Summary as ProfileSummary
} from "ui/contents/profile";
import { ExampleStyledSkillsList as SkillsList } from "ui/contents/profile/Skills";

import * as THREE from "three";

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

interface BoxProps {
    // XYZ
    readonly position: [number, number, number];
}

const Box: React.FC<BoxProps> = props => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Three: NextPage = () => {
  return (
    <>
      <Header />

      <div style={{ padding: "16px" }}>
        <ProfileHeading/>
        <ProfileContents />
        <ProfileSummary />
        <SkillsList />

        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </>
  )
}

export default Three;
