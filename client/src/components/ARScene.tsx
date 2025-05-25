import { useEffect, useRef } from 'react';

interface ARSceneProps {
  isActive: boolean;
}

export default function ARScene({ isActive }: ARSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Simple 3D cube simulation using 2D canvas
    let rotation = 0;
    const cubeSize = 80;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update rotation
      rotation += 0.02;

      // Draw a simple rotating cube representation
      ctx.save();
      ctx.translate(centerX, centerY - 100);
      ctx.rotate(rotation);

      // Draw cube faces with AR-style glow effect
      ctx.shadowColor = '#1DB954';
      ctx.shadowBlur = 20;
      
      // Front face
      ctx.fillStyle = 'rgba(29, 185, 84, 0.8)';
      ctx.fillRect(-cubeSize/2, -cubeSize/2, cubeSize, cubeSize);
      
      // Add wireframe effect
      ctx.strokeStyle = '#1DB954';
      ctx.lineWidth = 2;
      ctx.strokeRect(-cubeSize/2, -cubeSize/2, cubeSize, cubeSize);

      // Top face (pseudo 3D)
      ctx.fillStyle = 'rgba(29, 185, 84, 0.6)';
      ctx.beginPath();
      ctx.moveTo(-cubeSize/2, -cubeSize/2);
      ctx.lineTo(-cubeSize/4, -cubeSize/2 - 20);
      ctx.lineTo(cubeSize/4 + 20, -cubeSize/2 - 20);
      ctx.lineTo(cubeSize/2, -cubeSize/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right face (pseudo 3D)
      ctx.fillStyle = 'rgba(29, 185, 84, 0.4)';
      ctx.beginPath();
      ctx.moveTo(cubeSize/2, -cubeSize/2);
      ctx.lineTo(cubeSize/2 + 20, -cubeSize/4);
      ctx.lineTo(cubeSize/2 + 20, cubeSize/4 + 20);
      ctx.lineTo(cubeSize/2, cubeSize/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Draw AR anchor indicator
      ctx.save();
      ctx.translate(centerX, centerY + 150);
      ctx.strokeStyle = '#FF6B35';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#FF6B35';
      ctx.shadowBlur = 10;

      // Draw ground plane indicator
      const planeSize = 200;
      ctx.beginPath();
      ctx.moveTo(-planeSize, 0);
      ctx.lineTo(planeSize, 0);
      ctx.moveTo(0, -planeSize/2);
      ctx.lineTo(0, planeSize/2);
      ctx.stroke();

      // Draw corner markers
      const markerSize = 20;
      [-planeSize/2, planeSize/2].forEach(x => {
        [-planeSize/4, planeSize/4].forEach(y => {
          ctx.strokeRect(x - markerSize/2, y - markerSize/2, markerSize, markerSize);
        });
      });

      ctx.restore();

      // Add AR status text
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AR Scene Active - Tap to interact', centerX, 50);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="ar-canvas"
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