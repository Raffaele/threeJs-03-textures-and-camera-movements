import * as THREE from 'three';

import { loadBackground } from './loadBackground';
import { getCameraStep } from './getCameraStep';
import { createGlobe } from './createGlobe';
import { createCube } from './createCube';
import { createStar } from './createStar';
import { basicSetup } from './basicSetup';

const STEP = 0.25;
const ROTATION_STEP = 0.05;
const CONSTRAINT_SIZE = 22;

function setupEnvironment() {
  const { renderer, scene } = basicSetup(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.position.y = 2;

  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);

  loadBackground(scene);

  const globes = [
    { color: 0xff0000, size: 0.8, position: new THREE.Vector3(-35, 5, -10) },
    { color: 0x0000ff, size: 3, position: new THREE.Vector3(15, 8, 20) },
    { color: 0x00ff00, size: 2.5, position: new THREE.Vector3(0, 12, -15) }
  ].map(globe => createGlobe(globe.color, globe.size, globe.position));

  scene.add(...globes);

  const cubes = [
    { color: 0xffff00, size: 2, position: new THREE.Vector3(10, 12, -5) },
    { color: 0xff00ff, size: 1.5, position: new THREE.Vector3(-20, 3, 10) },
    { color: 0x00ffff, size: 3.5, position: new THREE.Vector3(25, 6, -25) }
  ].map(cube => createCube(cube.color, cube.size, cube.position));

  scene.add(...cubes);

  const star = createStar();
  scene.add(star);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      camera.position.add(getCameraStep(camera, STEP));
    } else if (event.key === 'ArrowDown') {
      camera.position.sub(getCameraStep(camera, STEP));
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

  function animate() {
    renderer.render(scene, camera);
    star.rotation.z += 0.001;
    cubes.forEach((cube, cubeIndex) => {
      cube.rotation.x += 0.002 * (cubeIndex + 1);
      cube.rotation.y += 0.001 * (cubeIndex + 1);
    });
    requestAnimationFrame(animate);
  };

  animate();
}

setupEnvironment();
