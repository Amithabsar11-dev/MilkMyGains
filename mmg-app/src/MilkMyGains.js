import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, animated } from "@react-spring/three";

const MilkMyGain = ({ modelPath }) => {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath, true);

  const [modelScale, setModelScale] = useState(window.innerWidth < 768 ? 10 : 7);

  useEffect(() => {
    console.log("Loading model:", modelPath);
  }, [modelPath]);
  
  useEffect(() => {
    const handleResize = () => {
      setModelScale(window.innerWidth < 768 ? 10 : 7);
    };  

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.sub(center);
    }
  }, [scene]); 

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.5 * delta;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={modelScale} />
      <Environment files="./small_empty_room_3_2k.exr" background={false} intensity={0.5} />
      <ambientLight intensity={1} />
    </group>
  );
};

export default MilkMyGain;
