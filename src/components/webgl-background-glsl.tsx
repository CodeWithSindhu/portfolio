"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- PURE GLSL SHADERS ---

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  // Render a flat 2D plane covering the entire screen
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// A highly optimized, beautifully dark fluid raymarching / noise shader
const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

// --- Simplex Noise 3D ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  // Normalize and correct aspect ratio
  vec2 uv = vUv;
  vec2 coords = uv * 2.0 - 1.0;
  coords.x *= uResolution.x / uResolution.y;

  // Make the mouse interaction much smoother, larger, and softer (like thick liquid)
  float mouseDist = length(coords - uMouse);
  // Using a much lower exponent (e.g. 1.2 instead of 2.5) for a wider, softer brush
  float mouseForce = exp(-mouseDist * 1.2); 
  // Increase displacement slightly for more visual swirl, but smoothly fall off
  vec2 fluidDisplacement = normalize(coords - uMouse) * mouseForce * 0.6;
  
  // Smoothly blend the distortion in so it doesn't look sharp
  vec2 distortedCoords = mix(coords, coords - fluidDisplacement, 0.5);

  // Layered noise to create a highly complex, non-repeating fluid structure
  float t = uTime * 0.15;
  
  float n1 = snoise(vec3(distortedCoords * 1.2, t));
  float n2 = snoise(vec3(distortedCoords * 2.5 - n1 * 0.5, t * 1.2));
  float n3 = snoise(vec3(distortedCoords * 5.0 + n2 * 0.5, t * 1.5));

  // Combine noises exponentially for deep contrast
  float fluid = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
  
  // Smoothly map the raw noise [-1, 1] to a color stop [0, 1]
  fluid = fluid * 0.5 + 0.5;
  fluid = smoothstep(0.1, 0.9, fluid);

  // Deep, premium dark palette
  vec3 colorDeep = vec3(0.01, 0.02, 0.05); // Near black / very dark slate
  vec3 colorMid = vec3(0.15, 0.1, 0.35);   // Deep muted purple
  vec3 colorBright = vec3(0.3, 0.2, 0.8);  // Vibrant indigo/violet focus
  vec3 colorAccent = vec3(0.05, 0.6, 0.4); // Deep Emerald highlight at extreme peaks

  vec3 color = mix(colorDeep, colorMid, fluid);
  color = mix(color, colorBright, smoothstep(0.5, 1.0, fluid));
  
  // Add emerald highlights where the mouse forcibly pushes the fluid
  color = mix(color, colorAccent, mouseForce * smoothstep(0.6, 1.0, fluid) * 1.5);

  // Relaxed vignette to allow noise to reach the edges
  float vignette = length(uv - 0.5) * 1.2;
  color *= smoothstep(1.5, 0.5, vignette);
  
  // Add an absolute black base to ensure super dark contrast
  color += vec3(0.005); 

  gl_FragColor = vec4(color, 1.0);
}
`;

export function WebGLBackgroundGLSL() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef({ x: 0, y: 0 });

  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map global mouse to -1 to 1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    
    // Pass time to the shader
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

    // Ensure we adjust the globally tracked mouse X by the current viewport aspect ratio
    const targetX = targetMouse.current.x * (size.width / size.height);
    const targetY = targetMouse.current.y;
    
    // Update mouse position immediately
    materialRef.current.uniforms.uMouse.value.x = targetX;
    materialRef.current.uniforms.uMouse.value.y = targetY;
  });

  return (
    <mesh>
      {/* 
        Orthographic projection takes exactly the viewport dimensions. 
        We map a single plane to fill the screen entirely. 
      */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
