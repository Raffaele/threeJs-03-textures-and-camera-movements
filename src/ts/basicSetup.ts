import * as THREE from 'three';

export function basicSetup(width: number, height: number) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  return { scene, renderer };
}