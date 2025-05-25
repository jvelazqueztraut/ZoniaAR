import { useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, VolumeX, Maximize, Box, AlertCircle } from "lucide-react";
import ARScene from "@/components/ARScene";

export default function ARExperience() {
  const [, setLocation] = useLocation();
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleBackToLanding = () => {
    setLocation('/');
  };

  useEffect(() => {
    checkARSupport();
  }, []);

  const checkARSupport = async () => {
    try {
      // Check for WebXR support first
      if ('xr' in navigator) {
        const isSupported = await (navigator as any).xr?.isSessionSupported('immersive-ar');
        setArSupported(isSupported);
      } else {
        // Fallback to camera access check
        if (navigator.mediaDevices?.getUserMedia) {
          setArSupported(true);
        } else {
          setArSupported(false);
        }
      }
    } catch (error) {
      console.log('AR check failed, falling back to camera access');
      // Still try camera access as fallback
      setArSupported(navigator.mediaDevices?.getUserMedia ? true : false);
    }
    
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
  };

  const startARSession = async () => {
    try {
      if (videoRef.current && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Failed to start camera:', error);
      setArSupported(false);
    }
  };

  useEffect(() => {
    if (!isLoading && arSupported) {
      startARSession();
    }
  }, [isLoading, arSupported]);

  return (
    <div className="ar-container">
      <div className="ar-scene">
        
        {/* Loading State */}
        {isLoading && (
          <div className="ar-loading-overlay">
            <div className="ar-loading-content">
              <div className="ar-loading-spinner"></div>
              <h2 className="ar-loading-title">Initializing AR Experience</h2>
              <p className="ar-loading-subtitle">
                {arSupported === null ? 'Checking device compatibility...' : 'Point your camera at a flat surface'}
              </p>
              <button 
                onClick={handleBackToLanding}
                className="ar-back-button"
              >
                <ArrowLeft size={16} />
                <span>Back to Landing</span>
              </button>
            </div>
          </div>
        )}

        {/* AR Not Supported */}
        {!isLoading && arSupported === false && (
          <div className="ar-loading-overlay">
            <div className="ar-loading-content">
              <AlertCircle size={48} color="#FF6B35" />
              <h2 className="ar-loading-title">AR Not Supported</h2>
              <p className="ar-loading-subtitle">
                Your device doesn't support AR or camera access is denied
              </p>
              <button 
                onClick={handleBackToLanding}
                className="ar-back-button"
              >
                <ArrowLeft size={16} />
                <span>Back to Landing</span>
              </button>
            </div>
          </div>
        )}

        {/* Camera Feed */}
        {!isLoading && arSupported && (
          <>
            <video
              ref={videoRef}
              className="ar-camera-view"
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {/* AR Scene Overlay */}
            <ARScene isActive={cameraActive} />

            {/* AR UI Controls */}
            <div className="ar-controls">
              <div className="ar-controls-container">
                <button className="ar-control-button ar-control-secondary">
                  <VolumeX size={20} />
                </button>
                <button className="ar-control-button ar-control-primary">
                  <Camera size={20} />
                </button>
                <button className="ar-control-button ar-control-secondary">
                  <Maximize size={20} />
                </button>
              </div>
            </div>

            {/* Back Button */}
            <button 
              onClick={handleBackToLanding}
              className="ar-back-button"
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 30
              }}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
