import * as THREE from 'three';

export function createStar(): THREE.Object3D {
  const starColor = 0xffffcc;
  const starSupport = new THREE.Object3D();

  const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
  const globeMaterial = new THREE.MeshBasicMaterial({ color: starColor });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globe.position.set(0, 30, 0);

  starSupport.add(globe);

  const starLight = new THREE.PointLight(starColor, 1000, 100);
  starLight.castShadow = true;
  starLight.shadow.bias = -0.001;
  globe.add(starLight);

  return starSupport;
}