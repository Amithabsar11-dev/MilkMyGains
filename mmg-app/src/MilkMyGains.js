import React, { useRef } from 'react'
import { useGLTF, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MilkMyGain = (props) => {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/packet_1.glb')

  // Mouse position state
  const mousePosition = useRef({ x: 0, y: 0 })

  // Mouse move event listener
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1 
    const y = -(event.clientY / window.innerHeight) * 2 + 1 
    mousePosition.current = { x, y }
  }

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Desired rotation based on mouse position
      const targetX = mousePosition.current.y * 0.2 // Adjust sensitivity (vertical rotation)
      const targetY = mousePosition.current.x * 0.2 // Adjust sensitivity (horizontal rotation)

      // Smooth interpolation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.3 // Smoothness factor
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.1 // Smoothness factor
      )
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['package'].geometry}
        material={materials.Default}
        position={[0, 0.5, 2]}
        rotation={[0, -0.183, -Math.PI / 2]}
        scale={10}
      />
       <Environment files="./small_empty_room_3_2k.exr" background={false} intensity={0.5} />
      <ambientLight intensity={1} />
    </group>
  )
}

useGLTF.preload('/packet_1.glb')

export default MilkMyGain
