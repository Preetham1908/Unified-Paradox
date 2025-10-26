import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

const IndiaMap3D = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useFrame(() => {
    if (meshRef.current && !selectedState) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const states = [
    { name: 'Himalayas', position: [0, 2, 0], color: '#10b981' },
    { name: 'Rajasthan', position: [-1.5, 0, 0], color: '#f59e0b' },
    { name: 'Kerala', position: [-1, -2, 0], color: '#8b5cf6' },
    { name: 'West Bengal', position: [1.5, 0, 0], color: '#3b82f6' },
    { name: 'Maharashtra', position: [-0.5, -1, 0], color: '#ec4899' },
  ];

  return (
    <group ref={meshRef}>
      {/* Main India shape (simplified) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 0.5]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      {/* State markers */}
      {states.map((state, idx) => (
        <group key={idx} position={state.position as [number, number, number]}>
          <mesh
            onClick={() => setSelectedState(state.name)}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
            }}
          >
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={state.color} emissive={state.color} emissiveIntensity={0.5} />
          </mesh>
          <Html distanceFactor={10}>
            <div className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-lg">
              {state.name}
            </div>
          </Html>
        </group>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  );
};

const Map3D = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            3D Virtual <span className="gradient-eco text-gradient">Map of India</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate India's geography in stunning 3D. Zoom, rotate, and explore different regions
          </p>
        </div>

        <Card className={`relative overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : 'max-w-6xl mx-auto'}`}>
          <div className={`${isFullscreen ? 'h-full' : 'h-[600px]'} w-full`}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <color attach="background" args={['#0a0a0a']} />
              <fog attach="fog" args={['#0a0a0a', 5, 15]} />
              <IndiaMap3D />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={12}
              />
            </Canvas>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-card/80 backdrop-blur-sm"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              🖱️ Click and drag to rotate • Scroll to zoom • Click markers to explore regions
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Map3D;
