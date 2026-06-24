"use client";

import { Canvas } from "@react-three/fiber";
import { WebGLBackgroundGLSL } from "./webgl-background-glsl";

export default function WebGLScene() {
  return (
    // We use orthographic to render our 2D GLSL shader perfectly flat against the screen
    <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} className="w-full h-full pointer-events-none">
      <WebGLBackgroundGLSL />
    </Canvas>
  );
}
