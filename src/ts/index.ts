import * as THREE from 'three';

import { loadBackground } from './loadBackground';

const STEP = 0.25;
const ROTATION_STEP = 0.05;
const CONSTRAINT_SIZE = 22;

function setupEnvironment() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.position.y = 2;

  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);

  loadBackground(scene);


  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      camera.position.x -= Math.sin(camera.rotation.y) * STEP;
      camera.position.z -= Math.cos(camera.rotation.y) * STEP;
    } else if (event.key === 'ArrowDown') {
      camera.position.x += Math.sin(camera.rotation.y) * STEP;
      camera.position.z += Math.cos(camera.rotation.y) * STEP;
    } else if (event.key === 'ArrowLeft') {
      camera.rotation.y += ROTATION_STEP;
    } else if (event.key === 'ArrowRight') {
      camera.rotation.y -= ROTATION_STEP;
    }
    if (camera.position.x > CONSTRAINT_SIZE) {
      camera.position.x = CONSTRAINT_SIZE;
    } else if (camera.position.x < -CONSTRAINT_SIZE) {
      camera.position.x = -CONSTRAINT_SIZE;
    }
    if (camera.position.z > CONSTRAINT_SIZE) {
      camera.position.z = CONSTRAINT_SIZE;
    } else if (camera.position.z < -CONSTRAINT_SIZE) {
      camera.position.z = -CONSTRAINT_SIZE;
    }
  }, false);

  const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}

setupEnvironment();