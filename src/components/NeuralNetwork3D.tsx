import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create neural network structure
  const network = useMemo(() => {
    const layers = [8, 12, 12, 8, 4]; // Network architecture
    const nodes: { position: [number, number, number]; layer: number }[] = [];
    const connections: { start: number; end: number }[] = [];
    
    const layerSpacing = 2.5;
    
    // First, create all nodes
    let totalNodes = 0;
    const layerStartIndices: number[] = [];
    
    layers.forEach((nodeCount, layerIndex) => {
      layerStartIndices.push(totalNodes);
      const radius = 1.5 + (layerIndex === 1 || layerIndex === 2 ? 0.5 : 0);
      const angleStep = (Math.PI * 2) / nodeCount;
      
      for (let i = 0; i < nodeCount; i++) {
        const angle = i * angleStep;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (layerIndex - layers.length / 2) * layerSpacing;
        
        nodes.push({ position: [x, y, z], layer: layerIndex });
      }
      
      totalNodes += nodeCount;
    });
    
    // Then create connections between layers
    layers.forEach((nodeCount, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const currentLayerStart = layerStartIndices[layerIndex];
        const nextLayerStart = layerStartIndices[layerIndex + 1];
        const nextLayerCount = layers[layerIndex + 1];
        
        for (let i = 0; i < nodeCount; i++) {
          const currentNodeIndex = currentLayerStart + i;
          
          // Connect to some nodes in next layer
          for (let j = 0; j < Math.min(3, nextLayerCount); j++) {
            const targetOffset = Math.floor((i * nextLayerCount / nodeCount + j) % nextLayerCount);
            const targetIndex = nextLayerStart + targetOffset;
            connections.push({ start: currentNodeIndex, end: targetIndex });
          }
        }
      }
    });
    
    return { nodes, connections };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render connections */}
      {network.connections.map((conn, i) => {
        const start = network.nodes[conn.start].position;
        const end = network.nodes[conn.end].position;
        const midpoint = [
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2,
          (start[2] + end[2]) / 2,
        ] as [number, number, number];
        
        return (
          <Line
            key={i}
            start={start}
            end={end}
            color="#00ffff"
            opacity={0.2}
          />
        );
      })}
      
      {/* Render nodes */}
      {network.nodes.map((node, i) => (
        <Sphere key={i} position={node.position} args={[0.08, 16, 16]}>
          <meshStandardMaterial
            color={node.layer % 2 === 0 ? '#00ffff' : '#ff00ff'}
            emissive={node.layer % 2 === 0 ? '#00ffff' : '#ff00ff'}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </Sphere>
      ))}
    </group>
  );
}

function Line({ start, end, color, opacity }: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function NeuralNetwork3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <NeuralNetworkMesh />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
