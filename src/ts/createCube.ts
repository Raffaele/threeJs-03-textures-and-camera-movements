import * as THREE from 'three';

export function createCube(color: THREE.ColorRepresentation, size: number, position: THREE.Vector3): THREE.Mesh {
  const cubeGeometry = new THREE.BoxGeometry(size, size, size);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.copy(position);
  return cube;
}