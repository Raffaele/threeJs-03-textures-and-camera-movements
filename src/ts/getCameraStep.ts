import * as THREE from 'three';

export function getCameraStep(camera: THREE.PerspectiveCamera, size: number): THREE.Vector3 {
  return new THREE.Vector3(-Math.sin(camera.rotation.y) * size, 0, -Math.cos(camera.rotation.y) * size);
}