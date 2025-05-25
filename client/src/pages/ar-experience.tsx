import { useLocation } from "wouter";
import { ArrowLeft, Camera, VolumeX, Maximize, Box } from "lucide-react";

export default function ARExperience() {
  const [, setLocation] = useLocation();

  const handleBackToLanding = () => {
    setLocation('/');
  };

  return (
    <div className="ar-container">
      <div className="ar-scene">
        {/* AR Loading State */}
        <div className="ar-loading-overlay">
          <div className="ar-loading-content">
            <div className="ar-loading-spinner"></div>
            <h2 className="ar-loading-title">Initializing AR Experience</h2>
            <p className="ar-loading-subtitle">Point your camera at a flat surface</p>
            <button 
              onClick={handleBackToLanding}
              className="ar-back-button"
            >
              <ArrowLeft size={16} />
              <span>Back to Landing</span>
            </button>
          </div>
        </div>

        {/* AR Camera View Placeholder */}
        <div className="ar-camera-view">
          {/* Model Viewer will be implemented here */}
          <div className="ar-placeholder">
            <div className="ar-placeholder-content">
              <Box size={48} />
              <p>AR Scene Loading...</p>
              <p className="ar-placeholder-subtitle">WebXR/WebAR Integration Point</p>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
}
