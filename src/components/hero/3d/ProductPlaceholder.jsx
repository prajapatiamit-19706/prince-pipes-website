import React, { useRef } from "react";
import { Float, Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ProductPlaceholder(props) {
  const meshRef = useRef();

  // Load the actual .glb model
  const { scene } = useGLTF('/models/threaded_barrel_nipple_v2.glb');

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // We let OrbitControls handle rotation now
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.3}
      floatingRange={[-0.1, 0.1]}
    >
      <Center>
        <primitive
          ref={meshRef}
          object={scene}
          scale={13} // Massively scaled up. Adjust this number if it's too big/small!
          rotation={[0, Math.PI / 6, 0]}
          castShadow
          receiveShadow
          {...props}
        />
      </Center>
    </Float>
  );
}

// Preload the model to prevent popping in
useGLTF.preload('/models/threaded_barrel_nipple_v2_thin.glb');