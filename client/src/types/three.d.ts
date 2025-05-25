// Basic Three.js type declarations to resolve compilation issues
declare module 'three' {
  export class Scene {
    add(object: any): void;
  }
  
  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    aspect: number;
    updateProjectionMatrix(): void;
  }
  
  export class WebGLRenderer {
    constructor(parameters?: any);
    setPixelRatio(ratio: number): void;
    setSize(width: number, height: number): void;
    outputColorSpace: any;
    xr: {
      enabled: boolean;
      setSession(session: any): void;
    };
    domElement: HTMLCanvasElement;
    setAnimationLoop(callback: () => void): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }
  
  export class BoxGeometry {
    constructor(width: number, height: number, depth: number);
  }
  
  export class PlaneGeometry {
    constructor(width: number, height: number);
  }
  
  export class MeshPhongMaterial {
    constructor(parameters?: any);
  }
  
  export class MeshBasicMaterial {
    constructor(parameters?: any);
  }
  
  export class Mesh {
    constructor(geometry: any, material: any);
    position: {
      set(x: number, y: number, z: number): void;
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    rotateX(angle: number): void;
  }
  
  export class HemisphereLight {
    constructor(skyColor: number, groundColor: number, intensity: number);
    position: {
      set(x: number, y: number, z: number): void;
    };
  }
  
  export const SRGBColorSpace: any;
  export const DoubleSide: any;
}