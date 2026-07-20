import * as THREE from 'three';

import { loadBackground } from './loadBackground';
import { getCameraStep } from './getCameraStep';
import { createGlobe } from './createGlobe';
import { createCube } from './createCube';
import { createStar } from './createStar';
import { basicSetup } from './basicSetup';
import { joystickEventHandler } from './JoystickEventHandler';

const STEP = 0.25;
const ROTATION_STEP = 0.05;
const CONSTRAINT_SIZE = 22;

function setupEnvironment() {
  const { renderer, scene } = basicSetup(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.position.y = 2;

  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);

  const floorGeometry = new THREE.PlaneGeometry(50, 50);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.rotateX(Math.PI / 2);
  floorMesh.position.y = -0.01;
  floorMesh.receiveShadow = true;
  floorMesh.castShadow = true;

  scene.add(floorMesh);

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

  [...globes, ...cubes].forEach(singleGlobe => {
    singleGlobe.castShadow = true;
    singleGlobe.receiveShadow = true;
  });

  const star = createStar();
  scene.add(star);

  function moveCamera(position: string) {
    if (position === 'ArrowUp') { camera.position.add(getCameraStep(camera, STEP)); }
    else if (position === 'ArrowDown') { camera.position.sub(getCameraStep(camera, STEP)); }
    else if (position === 'ArrowLeft') { camera.rotation.y += ROTATION_STEP; }
    else if (position === 'ArrowRight') { camera.rotation.y -= ROTATION_STEP; }
    else return;

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
  }

  document.addEventListener('keydown', (event) => {
    moveCamera(event.key);
  }, false);

  joystickEventHandler.addEventListener((direction) => {
    if (direction.vDirection === 1) {
      moveCamera('ArrowUp');
    } else if (direction.vDirection === -1) {
      moveCamera('ArrowDown');
    } else if (direction.hDirection === 1) {
      moveCamera('ArrowLeft');
    } else if (direction.hDirection === -1) {
      moveCamera('ArrowRight');
    }
  })

  const color = 0x282828;
  const light = new THREE.HemisphereLight(color, color, 1.8);
  scene.add(light);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    renderer.render(scene, camera);
    star.rotation.z += 0.0003;
    cubes.forEach((cube, cubeIndex) => {
      cube.rotation.x += 0.002 * (cubeIndex + 1);
      cube.rotation.y += 0.001 * (cubeIndex + 1);
    });
    requestAnimationFrame(animate);
  };

  animate();
}

setupEnvironment();
