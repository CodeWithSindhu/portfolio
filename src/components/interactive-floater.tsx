"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function InteractiveGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Base slow rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

      // Mouse tracking: tilt the object towards the mouse over time (lerping for smoothness)
      const targetX = (mouse.x * viewport.width) / 2;
      const targetY = (mouse.y * viewport.height) / 2;

      // Look at the mouse cursor
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX * 0.1, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY * 0.1, 0.1);
      
      // Rotate towards mouse
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (mouse.x * Math.PI) / 4 + state.clock.getElapsedTime() * 0.3, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -(mouse.y * Math.PI) / 4 + state.clock.getElapsedTime() * 0.2, 0.1);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={3}>
      {/* 
        A TorusKnot creates a highly engaging, complex geometric shape 
        that catches light dynamically, feeling "techy" and "fun"
      */}
      <TorusKnot ref={meshRef} args={[1.2, 0.4, 128, 32]}>
        <meshPhysicalMaterial
          color="#6366f1" // indigo
          emissive="#4338ca" // deep indigo glow
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </TorusKnot>
    </Float>
  );
}

export default function InteractiveFloater() {
  return (
    <div className="w-full h-full relative cursor-none group">
      {/* Glowing backdrop circle that pulses slightly */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-indigo-500/30 rounded-full blur-[80px] group-hover:bg-purple-500/40 transition-colors duration-1000" />
      
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        className="w-full h-full z-10"
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        <Environment preset="city" />
        
        {/* Presentation controls allow dragging/rotating the object physically */}
        <PresentationControls 
          global 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <InteractiveGeometry />
        </PresentationControls>
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
