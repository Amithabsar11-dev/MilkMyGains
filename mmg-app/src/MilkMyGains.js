import { useRef, useEffect, useState } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { useControls } from "leva"; // Import Leva for UI controls
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MilkMyGain = ({ modelPath, transitionProgress, isNext, isLoaded }) => {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath, true);
  const [defaultScale, setDefaultScale] = useState(window.innerWidth < 768 ? 2 : 3);
  const [scale, setScale] = useState(0);
  const rotationDirection = useRef(isNext ? 1 : -1);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [isScaleUpComplete, setIsScaleUpComplete] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // New state to track rotation
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(1);
  const [rotationZ, setRotationZ] = useState(-0.2);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(-0.4);
  const [positionZ, setPositionZ] = useState(0);
  const [rotationOffsetX, setRotationOffsetX] = useState(0);
  const [rotationOffsetY, setRotationOffsetY] = useState(5.5);
  
  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setDefaultScale(window.innerWidth < 768 ? 2 : 2.8);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Center model
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.sub(center);
    }
  }, [scene]);

  // Track first visit to sync with preload
  const isFirstVisit = useRef(true);
  
  // Scale-up effect when visiting homepage
  useEffect(() => {
    setScale(0);
    setIsScaleUpComplete(false);
    let startTime;
    const duration = 1.5;
    const animateScale = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setScale(progress * defaultScale);
      if (groupRef.current) {
        groupRef.current.rotation.y = progress * Math.PI * 2.3;
      }
      if (progress < 1) {
        requestAnimationFrame(animateScale);
      } else {
        setIsScaleUpComplete(true);
      }
    };
    if (isFirstVisit.current && isLoaded) {
      setTimeout(() => {
        requestAnimationFrame(animateScale);
      }, 300);
      isFirstVisit.current = false;
    } else {
      requestAnimationFrame(animateScale);
    }
  }, [modelPath, isLoaded]);

  // Handle mouse movement
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const handleMouseMove = (event) => {
        if (!isScaleUpComplete) return;
        const { innerWidth, innerHeight } = window;
        const x = (event.clientX / innerWidth - 0.5) * 1;
        const y = (event.clientY / innerHeight - 0.5) * 1;
        targetRotation.current.x = y * 0.1;
        targetRotation.current.y = x * 0.1;
        setIsRotating(true); // Set rotating state to true
      };
      const handleMouseLeave = () => {
        setIsRotating(false); // Set rotating state to false when mouse leaves
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isScaleUpComplete]);

  // GSAP ScrollTrigger for model rotation
  const lastRotationY = useRef(0);
  useEffect(() => {
    if (!isLoaded) return;
    gsap.registerPlugin(ScrollTrigger);
    const scrollTrigger = ScrollTrigger.create({
      trigger: ".slider-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      scroller: ".home-wrapper",
      onUpdate: (self) => {
        const progress = self.progress;
        const rotationAmount = progress * Math.PI;
        lastRotationY.current = rotationAmount;
        if (groupRef.current) {
          groupRef.current.rotation.y = lastRotationY.current;
        }
      },
    });
    return () => {
      scrollTrigger.kill();
    };
  }, [isLoaded]);

  useFrame(() => {
    if (groupRef.current) {
      const scaleFactor = scale * transitionProgress;
      groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      groupRef.current.position.set(positionX, positionY, positionZ);

      const rotationSpeed = 0.1; // Adjust this value for smoother stopping
      // Lerp rotation for smoothness
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x + rotationX + rotationOffsetX,
        rotationSpeed
      );

      // Lerp for Y rotation based on mouse movement
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y + lastRotationY.current + rotationOffsetY,
        rotationSpeed
      );

      // Ensure Z rotation is set correctly
      groupRef.current.rotation.z = rotationZ;

      // Check if scaling and rotation are complete
      if (isScaleUpComplete) {
        // Snap to final values to prevent any additional movement
        groupRef.current.scale.set(defaultScale, defaultScale, defaultScale);
        groupRef.current.rotation.x = targetRotation.current.x + rotationX + rotationOffsetX;
        groupRef.current.rotation.y = targetRotation.current.y + lastRotationY.current + rotationOffsetY;
        groupRef.current.rotation.z = rotationZ;
      }

      // If not rotating, smoothly stop the rotation
      if (!isRotating) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetRotation.current.x + rotationX + rotationOffsetX,
          rotationSpeed
        );
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation.current.y + lastRotationY.current + rotationOffsetY,
          rotationSpeed
        );
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={defaultScale} />
      <Environment files="./NightEnvironmentHDRI003_2K-HDR.exr" background={false} intensity={0.8} />
      <directionalLight 
       position={[0, -0.4, 0]} 
       intensity={1.8} 
       castShadow 
      />
      <ambientLight intensity={2} />
    </group>
  );
};

export default MilkMyGain;
