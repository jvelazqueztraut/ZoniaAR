import { useEffect, useRef } from 'react';

interface ARSceneProps {
  isActive: boolean;
}

// Declare Three.js types to avoid compilation issues
declare const THREE: any;

export default function ARScene({ isActive }: ARSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const cubeRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    // Dynamically import Three.js
    import('three').then(THREE => {
      initThreeScene(THREE);
    });

    return () => {
      cleanup();
    };
  }, [isActive]);

  const initThreeScene = (THREE: any) => {
    if (!mountRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Enable XR
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Create a simple cube as 3D model
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1DB954,
      transparent: true,
      opacity: 0.8
    });
    
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -0.3);
    scene.add(cube);
    cubeRef.current = cube;

    // Add ground plane reference
    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6B35,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI / 2);
    plane.position.y = -0.5;
    scene.add(plane);

    // Animation loop
    function animate() {
      renderer.setAnimationLoop(render);
    }

    function render() {
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();

    // Try to initialize WebXR AR session
    initWebXR();
  };

  const initWebXR = async () => {
    if (!('xr' in navigator)) {
      console.log('WebXR not supported, using fallback');
      return;
    }

    try {
      const isSupported = await (navigator as any).xr.isSessionSupported('immersive-ar');
      if (isSupported) {
        console.log('WebXR AR supported, ready to start session');
        startARSession();
      } else {
        console.log('WebXR AR not supported on this device');
      }
    } catch (error) {
      console.log('WebXR check failed:', error);
    }
  };

  const startARSession = async () => {
    if (!('xr' in navigator) || !rendererRef.current) return;

    try {
      const session = await (navigator as any).xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['dom-overlay', 'hit-test']
      });
      
      sessionRef.current = session;
      rendererRef.current.xr.setSession(session);
      
      console.log('AR session started successfully');
    } catch (error) {
      console.log('Failed to start AR session:', error);
    }
  };

  const cleanup = () => {
    if (sessionRef.current) {
      sessionRef.current.end();
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    if (mountRef.current && rendererRef.current) {
      mountRef.current.removeChild(rendererRef.current.domElement);
    }
  };

  if (!isActive) return null;

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10
      }}
    />
  );
}