"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AbstractGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current && wireframeRef.current) {
      // Rotate the core
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      
      // Rotate the wireframe slightly faster in the opposite direction
      wireframeRef.current.rotation.x = -t * 0.15;
      wireframeRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group>
        {/* Core Geometry */}
        <Icosahedron ref={meshRef} args={[1.5, 0]}>
          <meshStandardMaterial
            color="#4f46e5" // indigo-600
            emissive="#3730a3" // indigo-800
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Icosahedron>

        {/* Outer Wireframe */}
        <Icosahedron ref={wireframeRef} args={[1.8, 1]}>
          <meshBasicMaterial
            color="#a78bfa" // purple-400
            wireframe
            transparent
            opacity={0.3}
          />
        </Icosahedron>
        
        {/* Inner glowing particle aura */}
        <Icosahedron args={[1.2, 2]}>
          <meshBasicMaterial
            color="#c084fc" // purple-400
            wireframe
            transparent
            opacity={0.15}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function Hero3DObject() {
  return (
    <div className="w-full h-full relative">
      {/* Soft CSS glow behind the canvas to blend with the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        className="w-full h-full z-10"
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        
        <AbstractGeometry />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
