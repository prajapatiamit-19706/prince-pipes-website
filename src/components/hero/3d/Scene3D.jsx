"use client";

import React, { Suspense } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { ProductPlaceholder } from "./ProductPlaceholder";

export default function Scene3D() {
  return (
    <Canvas shadows={{ type: THREE.PCFShadowMap }} className="w-full h-full" dpr={[1, 2]}>
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* High Quality Environment map for premium look */}
      <Environment files="/potsdamer_platz_1k.hdr" />

      {/* 3D Product */}
      <Suspense fallback={null}>
        <ProductPlaceholder />
      </Suspense>

      {/* Soft floor shadow */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
        color="#0F2747"
      />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
    </Canvas>
  );
}
