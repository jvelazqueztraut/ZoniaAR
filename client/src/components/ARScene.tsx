import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { artists, Artist } from '@/data/artists';

interface ARSceneProps {
  isActive: boolean;
}

export default function ARScene({ isActive }: ARSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const cubeRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);
  const artistCardsRef = useRef<any[]>([]);
  const hitTestSourceRef = useRef<any>(null);
  const hitTestResultsRef = useRef<any[]>([]);
  const referenceSpaceRef = useRef<any>(null);
  const audioListenerRef = useRef<any>(null);
  const audioSourcesRef = useRef<any[]>([]);
  const testAudioRef = useRef<any>(null);
  const userInteractedRef = useRef(false);
  const proximityRadiusRef = useRef(1.2); // 1.2 meters proximity threshold

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    initThreeScene();

    return () => {
      cleanup();
    };
  }, [isActive]);

  const initThreeScene = () => {
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

    // Set up audio listener and attach to camera
    const audioListener = new THREE.AudioListener();
    audioListenerRef.current = audioListener;
    camera.add(audioListener);

    // Create test audio (non-positional)
    const testAudio = new THREE.Audio(audioListener);
    testAudioRef.current = testAudio;
    
    // Load test audio
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('/placeholder.mp3', (buffer) => {
      testAudio.setBuffer(buffer);
      testAudio.setVolume(0.5);
      console.log('Test audio loaded successfully');
    }, undefined, (error) => {
      console.error('Failed to load test audio:', error);
    });

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

    // Create artist cards positioned in a circle around the user
    createArtistCards(scene);

    // Add ground plane reference for AR anchoring
    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6B35,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI / 2);
    plane.position.y = 0;
    scene.add(plane);

    // Animation loop
    function animate() {
      renderer.setAnimationLoop(render);
    }

    function render(timestamp: number, frame?: any) {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      // Handle hit testing for interaction
      if (hitTestSourceRef.current && sessionRef.current && referenceSpaceRef.current && frame) {
        hitTestResultsRef.current = frame.getHitTestResults(hitTestSourceRef.current);

        // Check for hits on artist cards
        hitTestResultsRef.current.forEach((hit: any) => {
          const hitPoint = hit.getPose(referenceSpaceRef.current).transform.position;
          const hitPointVector = new THREE.Vector3(
            hitPoint.x,
            hitPoint.y,
            hitPoint.z
          );

          // Check distance to each artist card
          artistCardsRef.current.forEach((card, index) => {
            if (card) {
              const distance = card.position.distanceTo(hitPointVector);
              if (distance < 0.5) { // If hit is close to a card
                console.log('Hit artist card:', index);
                const userData = (card as any).userData;
                
                // Toggle audio
                const audioSource = audioSourcesRef.current[index];
                if (audioSource) {
                  if (audioSource.isPlaying) {
                    audioSource.pause();
                    userData.isAudioActive = false;
                    // Reset glow effect
                    if (userData.originalBorderMaterial) {
                      userData.originalBorderMaterial.opacity = 0.3;
                      userData.originalBorderMaterial.color.setHex(parseInt(userData.artist.color.replace('#', '0x')));
                    }
                  } else {
                    audioSource.play();
                    userData.isAudioActive = true;
                    // Enhance glow effect
                    if (userData.originalBorderMaterial) {
                      userData.originalBorderMaterial.opacity = 0.6;
                      userData.originalBorderMaterial.color.setHex(0xffffff);
                    }
                  }
                }
              }
            }
          });
        });
      }

      // Animate artist cards with subtle floating motion and always face user
      artistCardsRef.current.forEach((card, index) => {
        if (card) {
          const time = Date.now() * 0.001;
          // Floating Y motion
          card.position.y = 0.5 + Math.sin(time + index * 0.5) * 0.1;
          // Always face the center (user position)
          card.lookAt(0, card.position.y, 0);
        }
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
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

  const createArtistCards = (scene: any) => {
    const textureLoader = new THREE.TextureLoader();
    const radius = 1.5; // Distance from center in meters
    artistCardsRef.current = [];

    artists.forEach((artist, index) => {
      // Calculate position in circle around user
      const angle = (index / artists.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Create card geometry (portrait orientation)
      const cardGeometry = new THREE.PlaneGeometry(0.4, 0.6);
      
      // Load artist image as texture
      textureLoader.load(
        artist.image,
        (texture) => {
          // Create material with artist image (double-sided to prevent disappearing)
          const cardMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
          });

          const artistCard = new THREE.Mesh(cardGeometry, cardMaterial);
          
          // Position card in world space
          artistCard.position.set(x, 0.5, z);
          
          // Face the center (user)
          artistCard.lookAt(0, 0.5, 0);
          
          // Add glow effect border
          const borderGeometry = new THREE.PlaneGeometry(0.45, 0.65);
          const borderMaterial = new THREE.MeshBasicMaterial({
            color: artist.color,
            transparent: true,
            opacity: 0.3
          });
          const border = new THREE.Mesh(borderGeometry, borderMaterial);
          border.position.z = -0.001; // Slightly behind the card
          artistCard.add(border);

          // Store reference to artist data and audio state
          (artistCard as any).userData = {
            artist,
            isAudioActive: false,
            originalBorderMaterial: borderMaterial
          };
          
          // Create positional audio for this artist (if audio URL exists)
          let positionalAudio: THREE.PositionalAudio | null = null;
          if (artist.audio && artist.audio.trim() !== '') {
            positionalAudio = new THREE.PositionalAudio(audioListenerRef.current);
            
            // Load audio file
            const audioLoader = new THREE.AudioLoader();
            audioLoader.load(artist.audio, (buffer) => {
              positionalAudio?.setBuffer(buffer);
              positionalAudio?.setRefDistance(1);
              positionalAudio?.setVolume(0.5);
            }, undefined, (error) => {
              console.warn(`Failed to load audio for ${artist.name}:`, error);
            });
            
            // Attach audio to the artist card
            artistCard.add(positionalAudio);
          }
          
          // Store audio reference
          audioSourcesRef.current[index] = positionalAudio;
          
          scene.add(artistCard);
          artistCardsRef.current.push(artistCard);
        },
        undefined,
        (error) => {
          console.error('Error loading artist image:', error);
          // Create fallback card with colored material (double-sided)
          const fallbackMaterial = new THREE.MeshLambertMaterial({
            color: artist.color,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
          });
          
          const artistCard = new THREE.Mesh(cardGeometry, fallbackMaterial);
          artistCard.position.set(x, 0.5, z);
          artistCard.lookAt(0, 0.5, 0);
          (artistCard as any).userData = artist;
          
          scene.add(artistCard);
          artistCardsRef.current.push(artistCard);
        }
      );
    });
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
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['local-floor', 'dom-overlay']
      });
      
      sessionRef.current = session;
      rendererRef.current.xr.setSession(session);

      // Initialize audio context within XR session
      if (audioListenerRef.current) {
        const audioContext = audioListenerRef.current.context;
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('Audio context resumed in XR session');
        }
      }
      
      // Set up hit testing for surface anchoring and interaction
      const referenceSpace = await session.requestReferenceSpace('viewer');
      referenceSpaceRef.current = referenceSpace;
      hitTestSourceRef.current = await session.requestHitTestSource({ space: referenceSpace });
      
      console.log('AR session started successfully with hit testing');

      // Add session end handler
      session.addEventListener('end', () => {
        console.log('XR session ended');
        // Clean up audio
        if (testAudioRef.current) {
          testAudioRef.current.stop();
        }
        audioSourcesRef.current.forEach(source => {
          if (source) source.stop();
        });
      });
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

  // Keep the regular DOM event listeners for non-XR mode
  useEffect(() => {
    const handleUserInteraction = async () => {
      userInteractedRef.current = true;
      
      // Ensure audio context is running
      if (audioListenerRef.current) {
        const audioContext = audioListenerRef.current.context;
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('Audio context resumed on user interaction');
        }
      }

      // Play test audio on first interaction
      if (testAudioRef.current && !testAudioRef.current.isPlaying) {
        testAudioRef.current.play();
        console.log('Test audio started playing');
      }

      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

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