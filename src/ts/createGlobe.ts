import * as THREE from 'three';

export function createGlobe(color: THREE.ColorRepresentation, size: number, position: THREE.Vector3): THREE.Mesh {
  const globeGeometry = new THREE.SphereGeometry(size, 32, 32);
  const globeMaterial = new THREE.MeshStandardMaterial({ color });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globe.position.copy(position);
  return globe;
}