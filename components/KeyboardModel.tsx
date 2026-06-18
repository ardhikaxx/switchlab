"use client";

import React from "react";
import { useGLTF, OrbitControls, Clone, Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model() {
  const { scene } = useGLTF("/assets/3d/keyboard.glb");
  return <Clone object={scene} scale={1} />;
}

export default function KeyboardModel() {
  return (
    <div style={{ height: "60vh", width: "100%", cursor: "grab" }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 10], fov: 45 }}>
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          <Center position={[0, -1, 0]}>
            <Model />
          </Center>
        </React.Suspense>
        <OrbitControls 
          target={[0, 0, 0]}
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false} 
          enableZoom={true} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/3d/keyboard.glb");
