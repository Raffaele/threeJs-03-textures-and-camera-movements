import * as THREE from 'three';

export function loadBackground(scene: THREE.Scene): void {
  const starsUrl = new URL('../imgs/stars.jpg', import.meta.url).toString();
  const universeTextureLoader = new THREE.CubeTextureLoader();
  universeTextureLoader.load(
    Array(6).fill(starsUrl),
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture;
    });
}