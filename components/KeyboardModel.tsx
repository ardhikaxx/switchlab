"use client";

import React from "react";
import { useGLTF, OrbitControls, Stage, Html, Clone, Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model() {
  const { scene } = useGLTF("/assets/3d/keyboard.glb");
  return <Clone object={scene} scale={1} />;
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: "white", fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "1.5rem" }}>
        Loading 3D Model...
      </div>
    </Html>
  );
}

export default function KeyboardModel() {
  return (
    <div style={{ height: "60vh", width: "100%", cursor: "grab" }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 10], fov: 45 }}>
        <React.Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.5}>
            <Center position={[0, -1, 0]}>
              <Model />
            </Center>
          </Stage>
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
