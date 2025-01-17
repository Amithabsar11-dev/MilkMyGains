import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MilkMyGain = (props) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/mmg1.glb');

  // Mouse position state
  const mousePosition = useRef({ x: 0, y: 0 });
  const [modelScale, setModelScale] = useState(window.innerWidth < 768 ? 10 : 17);

  // Adjust model size based on screen width
  useEffect(() => {
    const handleResize = () => {
      setModelScale(window.innerWidth < 768 ? 10 : 17);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move event listener
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    mousePosition.current = { x, y };
  };

  // Add mouse move event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate the center of the geometry and adjust its position
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center); // Move the object so its center is at the origin
    }
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous horizontal rotation (around Y-axis)
      groupRef.current.rotation.y += 0.5 * delta; // Adjust the speed by changing the multiplier

      // // Optional: Add mouse interaction for additional rotation
      // const targetX = mousePosition.current.y * 0.2; 
      // const targetZ = mousePosition.current.x * 0.2; 

      // // Smooth interpolation for mouse interaction
      // groupRef.current.rotation.x = THREE.MathUtils.lerp(
      //   groupRef.current.rotation.x,
      //   targetX,
      //   0.3 // Smoothness factor
      // );
      // groupRef.current.rotation.z = THREE.MathUtils.lerp(
      //   groupRef.current.rotation.z,
      //   targetZ,
      //   0.1 // Smoothness factor
      // );
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.package004.geometry}
        material={materials['Default.001']}
        rotation={[0, 0, -Math.PI / 2]}
        position={[0,0,0]}
        scale={modelScale}  // Adjust scale as needed
      />
      <Environment files="./small_empty_room_3_2k.exr" background={false} intensity={0.5} />
      <ambientLight intensity={1} />
    </group>
  );
};

useGLTF.preload('/mmg1.glb');

export default MilkMyGain;