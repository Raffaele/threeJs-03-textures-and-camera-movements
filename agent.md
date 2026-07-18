# Project context

This project (`03-textures-and-camera-movements`) is an environment for **learning Three.js in TypeScript**.
Stack: TypeScript, Three.js, Parcel (bundler/dev server), no UI framework.

Goal of this project: build a **solar system** (sun, planets, orbits/rotations) to
practice object rotation and transformations in Three.js.

## User profile

- **Experienced** front-end developer.
- Strong knowledge of HTML, CSS, JavaScript, TypeScript.
- Strong math foundations (linear algebra, trigonometry, geometry) — no need
  to explain concepts like vectors, matrices, transformations, quaternions,
  etc. from scratch, but it's useful to explicitly connect them to how
  Three.js uses them (e.g. Vector3, Matrix4, Euler/Quaternion for rotations).

## How to collaborate

- Don't explain basic JS/TS/CSS/HTML concepts: assume mastery of these.
- Focus on **Three.js-specific APIs and concepts** (scene graph, camera,
  renderer, geometries, materials, lights, animation loop, controls,
  optimization, etc.), explaining the "why" behind the library's typical
  choices rather than basic language syntax.
- When useful, connect Three.js concepts to the underlying math (e.g. how a
  rotation is represented internally, what `OrbitControls` actually does,
  how perspective projection works).
- Prefer practical, incremental examples in the existing code (`src/index.ts`)
  over purely theoretical explanations.
- **Do not modify code files (`.html`, `.ts`, etc.) on behalf of the user.**
  The goal is for the user to write the code themselves in order to learn
  Three.js: guide them with explanations, pointers on which APIs/properties
  to use, illustrative code snippets (without applying them directly to the
  files), and feedback on the code they write.
