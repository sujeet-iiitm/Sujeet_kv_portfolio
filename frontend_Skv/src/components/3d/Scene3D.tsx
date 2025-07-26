"use client"

import type React from "react"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, useGLTF, Center, Float } from "@react-three/drei"
import type * as THREE from "three"

function Model3D({ url }: { url: string }) {
  const modelRef = useRef<THREE.Group>(null)

  const { scene } = useGLTF(url)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <primitive ref={modelRef} object={scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
      </Center>
    </Float>
  )
}

function DefaultModel() {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={meshRef} position={[0, 0, 0]} scale={[0.4, 0.4, 0.4]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#2563EB"
            metalness={0.7}
            roughness={0.3}
            emissive="#1E40AF"
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh position={[-1.2, 0.4, 0]} rotation={[0, 0, Math.PI / 6]}>
          <coneGeometry args={[0.6, 1.5, 8]} />
          <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
        </mesh>

        <mesh position={[1.2, 0.4, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <coneGeometry args={[0.6, 1.5, 8]} />
          <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
        </mesh>

        <mesh position={[0, -0.4, -1.2]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#1D4ED8" metalness={0.6} roughness={0.4} />
        </mesh>

        <mesh position={[0, 0.6, 0.8]} rotation={[Math.PI / 8, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 0.8, 8]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh position={[-0.15, 0.8, 1.1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.15, 0.8, 1.1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

function ThreeJSLoader() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#60A5FA" wireframe />
    </mesh>
  )
}

interface Scene3DProps {
  modelUrl?: string
  className?: string
}

export function Scene3D({ modelUrl, className = "" }: Scene3DProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`w-full h-full relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="text-white text-lg animate-pulse">Loading 3D Scene...</div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="text-red-400 text-lg">Failed to load 3D model</div>
        </div>
      )}

      <Canvas
        camera={{
          position: [6, 3, 8],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        onCreated={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      >
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.8}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          target={[0, 0, 0]}
        />

        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />

        <pointLight position={[-4, 3, -4]} intensity={0.3} color="#60A5FA" />

        <Environment preset="night" />

        <Suspense fallback={<ThreeJSLoader />}>
          {modelUrl ? (
            <ErrorBoundary fallback={<DefaultModel />}>
              <Model3D url={modelUrl} />
            </ErrorBoundary>
          ) : (
            <DefaultModel />
          )}
        </Suspense>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.2} scale={10} blur={2} far={4} resolution={128} />
      </Canvas>
    </div>
  )
}

function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <>{fallback}</>
  }

  try {
    return <>{children}</>
  } catch (error) {
    setHasError(true)
    return <>{fallback}</>
  }
}
