"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ZERO_GRAVITY_ROTATION_STRENGTH = 0.05;
const ZERO_GRAVITY_MAX_YAW = Math.PI * 2 * ZERO_GRAVITY_ROTATION_STRENGTH;
const ZERO_GRAVITY_LOOP_SECONDS = 16;
const DRAG_ROTATION_SPEED = 0.008;
const DRAG_PITCH_SPEED = 0.005;
const MAX_DRAG_PITCH = Math.PI * 0.18;
const HERO_GLOW_COLOR = new THREE.Color("#ffffff");
const HERO_GLOW_EXPANSION = 0.026;
const HERO_GLOW_INTENSITY = 0.58;

export function ModelViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading model...");

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    let disposed = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0C0A09");
    scene.fog = new THREE.Fog("#0C0A09", 8, 18);

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.8, 5.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.cursor = "inherit";
    renderer.domElement.style.touchAction = isTouchDevice ? "auto" : "none";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const studioCanvas = document.createElement("canvas");
    studioCanvas.width = 1024;
    studioCanvas.height = 512;

    const studioContext = studioCanvas.getContext("2d");
    let studioEnvironment: THREE.WebGLRenderTarget | null = null;

    if (studioContext) {
      studioContext.fillStyle = "#000000";
      studioContext.fillRect(0, 0, studioCanvas.width, studioCanvas.height);

      const leftBand = studioContext.createLinearGradient(80, 0, 240, 0);
      leftBand.addColorStop(0, "rgba(255,255,255,0)");
      leftBand.addColorStop(0.45, "rgba(255,255,255,1)");
      leftBand.addColorStop(1, "rgba(255,255,255,0)");
      studioContext.fillStyle = leftBand;
      studioContext.fillRect(72, 0, 180, studioCanvas.height);

      const rightBand = studioContext.createLinearGradient(784, 0, 944, 0);
      rightBand.addColorStop(0, "rgba(255,255,255,0)");
      rightBand.addColorStop(0.5, "rgba(255,255,255,0.92)");
      rightBand.addColorStop(1, "rgba(255,255,255,0)");
      studioContext.fillStyle = rightBand;
      studioContext.fillRect(788, 0, 180, studioCanvas.height);

      const crownGlow = studioContext.createRadialGradient(512, 44, 0, 512, 44, 280);
      crownGlow.addColorStop(0, "rgba(255,255,255,0.74)");
      crownGlow.addColorStop(1, "rgba(255,255,255,0)");
      studioContext.fillStyle = crownGlow;
      studioContext.fillRect(220, 0, 584, 220);

      const studioTexture = new THREE.CanvasTexture(studioCanvas);
      studioTexture.mapping = THREE.EquirectangularReflectionMapping;
      studioTexture.colorSpace = THREE.SRGBColorSpace;

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      studioEnvironment = pmremGenerator.fromEquirectangular(studioTexture);
      scene.environment = studioEnvironment.texture;
      studioTexture.dispose();
      pmremGenerator.dispose();
    }

    const noiseSize = 64;
    const noiseData = new Uint8Array(noiseSize * noiseSize * 4);
    let noiseSeed = 23;

    const seededRandom = () => {
      noiseSeed = (noiseSeed * 1664525 + 1013904223) >>> 0;
      return noiseSeed / 4294967295;
    };

    for (let i = 0; i < noiseData.length; i += 4) {
      const grain = 204 + Math.floor(seededRandom() * 38);
      noiseData[i] = grain;
      noiseData[i + 1] = grain;
      noiseData[i + 2] = grain;
      noiseData[i + 3] = 255;
    }

    const glassNoiseTexture = new THREE.DataTexture(
      noiseData,
      noiseSize,
      noiseSize,
      THREE.RGBAFormat,
    );
    glassNoiseTexture.wrapS = THREE.RepeatWrapping;
    glassNoiseTexture.wrapT = THREE.RepeatWrapping;
    glassNoiseTexture.repeat.set(7, 10);
    glassNoiseTexture.needsUpdate = true;

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.025);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight("#ffffff", "#000000", 0.045);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3.2);
    keyLight.position.set(2.4, 2.6, 3.6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#ffffff", 0.08);
    fillLight.position.set(-4.2, 0.3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight("#ffffff", 96, 0, 0.22, 0.94);
    rimLight.position.set(-3.2, 2.4, -4.4);
    scene.add(rimLight);

    const oppositeRimLight = new THREE.SpotLight("#ffffff", 64, 0, 0.2, 0.92);
    oppositeRimLight.position.set(3.4, 1.2, -3.6);
    scene.add(oppositeRimLight);

    const crownLight = new THREE.DirectionalLight("#ffffff", 5.8);
    crownLight.position.set(0, 3.5, 0.65);
    crownLight.target.position.set(0, 0, 0);
    scene.add(crownLight);
    scene.add(crownLight.target);

    const backLight = new THREE.DirectionalLight("#ffffff", 2.4);
    backLight.position.set(0.2, 0.2, -5.4);
    backLight.target.position.set(0, 0, 0);
    scene.add(backLight);
    scene.add(backLight.target);

    const underLight = new THREE.DirectionalLight("#ffffff", 0.38);
    underLight.position.set(0, -2.1, 2.6);
    underLight.target.position.set(0, 0, 0);
    scene.add(underLight);
    scene.add(underLight.target);

    const modelGroup = new THREE.Group();
    const baseGroupPosition = modelGroup.position.clone();
    const baseGroupScale = modelGroup.scale.clone();
    const baseGroupQuaternion = modelGroup.quaternion.clone();
    const zeroGravityRotation = new THREE.Quaternion();
    const userYawRotation = new THREE.Quaternion();
    const userPitchRotation = new THREE.Quaternion();
    const userRotation = new THREE.Quaternion();
    const zeroGravityAxis = new THREE.Vector3(0, 1, 0);
    const userYawAxis = new THREE.Vector3(0, 1, 0);
    const userPitchAxis = new THREE.Vector3(1, 0, 0);
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const modelMeshes: THREE.Mesh[] = [];
    const clock = new THREE.Clock();
    let animationFrameId = 0;
    let userTargetYaw = 0;
    let userTargetPitch = 0;
    let userDisplayYaw = 0;
    let userDisplayPitch = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let activePointerId: number | null = null;
    scene.add(modelGroup);

    const applyDisplayMotion = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      const progress = elapsed * (Math.PI * 2 / ZERO_GRAVITY_LOOP_SECONDS);
      const yaw = Math.sin(progress) * ZERO_GRAVITY_MAX_YAW;
      const follow = 1 - Math.pow(0.001, delta);

      userDisplayYaw = THREE.MathUtils.lerp(userDisplayYaw, userTargetYaw, follow);
      userDisplayPitch = THREE.MathUtils.lerp(userDisplayPitch, userTargetPitch, follow);

      modelGroup.position.copy(baseGroupPosition);
      modelGroup.scale.copy(baseGroupScale);
      zeroGravityRotation.setFromAxisAngle(zeroGravityAxis, yaw);
      userYawRotation.setFromAxisAngle(userYawAxis, userDisplayYaw);
      userPitchRotation.setFromAxisAngle(userPitchAxis, userDisplayPitch);
      userRotation.copy(userYawRotation).multiply(userPitchRotation);
      modelGroup.quaternion
        .copy(baseGroupQuaternion)
        .multiply(userRotation)
        .multiply(zeroGravityRotation);
    };

    const renderScene = () => {
      applyDisplayMotion();
      renderer.render(scene, camera);
    };

    const animate = () => {
      renderScene();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const loader = new GLTFLoader();
    loader.load(
      "/faceportfolio2.glb",
      (gltf) => {
        if (disposed) {
          return;
        }

        const model = gltf.scene;
        model.traverse((object) => {
          const mesh = object as THREE.Mesh;

          if (!mesh.isMesh) {
            return;
          }

          modelMeshes.push(mesh);

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else if (mesh.material instanceof THREE.Material) {
            mesh.material.dispose();
          }

          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#ffffff"),
            metalness: 0,
            roughness: 0.092,
            roughnessMap: glassNoiseTexture,
            bumpMap: glassNoiseTexture,
            bumpScale: 0.022,
            transmission: 1,
            transparent: true,
            opacity: 0.54,
            ior: 1.49,
            thickness: 0.2,
            attenuationDistance: 95,
            attenuationColor: new THREE.Color("#ffffff"),
            clearcoat: 1,
            clearcoatRoughness: 0.04,
            reflectivity: 0.62,
            specularIntensity: 1.85,
            specularColor: new THREE.Color("#ffffff"),
            envMapIntensity: 1.8,
            side: THREE.DoubleSide,
          });
        });

        modelMeshes.forEach((mesh) => {
          const glowShell = new THREE.Mesh(
            mesh.geometry,
            new THREE.ShaderMaterial({
              uniforms: {
                uColor: { value: HERO_GLOW_COLOR },
                uExpansion: { value: HERO_GLOW_EXPANSION },
                uIntensity: { value: HERO_GLOW_INTENSITY },
              },
              vertexShader: `
                uniform float uExpansion;

                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;

                void main() {
                  vec3 expandedPosition = position + normal * uExpansion;
                  vWorldNormal = normalize(mat3(modelMatrix) * normal);
                  vWorldPosition = (modelMatrix * vec4(expandedPosition, 1.0)).xyz;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(expandedPosition, 1.0);
                }
              `,
              fragmentShader: `
                uniform vec3 uColor;
                uniform float uIntensity;

                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;

                void main() {
                  vec3 normalDirection = normalize(vWorldNormal);
                  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
                  float fresnel = pow(1.0 - abs(dot(normalDirection, viewDirection)), 2.85);
                  float alpha = smoothstep(0.12, 1.0, fresnel) * uIntensity;

                  gl_FragColor = vec4(uColor, alpha);
                }
              `,
              transparent: true,
              side: THREE.BackSide,
              blending: THREE.AdditiveBlending,
              depthTest: false,
              depthWrite: false,
            }),
          );

          glowShell.name = `${mesh.name || "glass"} hero glow`;
          glowShell.castShadow = false;
          glowShell.receiveShadow = false;
          mesh.add(glowShell);

          const edgeCatch = new THREE.Mesh(
            mesh.geometry,
            new THREE.ShaderMaterial({
              uniforms: {
                uIntensity: { value: 0.42 },
                uLightDirection: {
                  value: new THREE.Vector3(-0.55, 0.48, 0.68).normalize(),
                },
              },
              vertexShader: `
                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;

                void main() {
                  vWorldNormal = normalize(mat3(modelMatrix) * normal);
                  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                uniform float uIntensity;
                uniform vec3 uLightDirection;

                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;

                void main() {
                  vec3 normalDirection = normalize(vWorldNormal);
                  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
                  float grazingAngle = pow(1.0 - abs(dot(normalDirection, viewDirection)), 2.35);
                  float keyCatch = pow(max(dot(normalDirection, normalize(uLightDirection)), 0.0), 0.85);
                  float rimCatch = pow(max(dot(normalDirection, normalize(vec3(0.72, 0.26, -0.64))), 0.0), 1.2);
                  float edgeAlpha = smoothstep(0.1, 1.0, grazingAngle) * (0.2 + keyCatch * 0.62 + rimCatch * 0.5) * uIntensity;

                  gl_FragColor = vec4(vec3(1.0), edgeAlpha);
                }
              `,
              transparent: true,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
              depthTest: false,
              depthWrite: false,
            }),
          );

          edgeCatch.name = `${mesh.name || "glass"} edge catch`;
          edgeCatch.castShadow = false;
          edgeCatch.receiveShadow = false;
          mesh.add(edgeCatch);
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 3;
        const scaleFactor = targetSize / maxAxis;

        // Aplica scale primeiro, depois recalcula o centro já escalado
        model.scale.setScalar(scaleFactor);
        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

        // Centraliza o modelo no origin usando o centro escalado real
        model.position.set(-scaledCenter.x, -scaledCenter.y, -scaledCenter.z);

        const scaledHeight = size.y * scaleFactor;
        model.position.y -= scaledHeight * 0.15;
        modelGroup.add(model);

        const fittedBox = new THREE.Box3().setFromObject(modelGroup);
        const fittedCenter = fittedBox.getCenter(new THREE.Vector3());
        const boundingSphere = fittedBox.getBoundingSphere(new THREE.Sphere());
        const radius = Math.max(boundingSphere.radius, 0.5);
        const fov = THREE.MathUtils.degToRad(camera.fov);
        const distance = radius / Math.sin(fov / 2) * 0.833;

        camera.near = Math.max(0.01, radius / 100);
        camera.far = Math.max(100, distance * 8);
        const cameraTarget = new THREE.Vector3(0, fittedCenter.y, fittedCenter.z);
        camera.position.set(0, cameraTarget.y + radius * 0.08, cameraTarget.z + distance * 1.18);
        camera.lookAt(cameraTarget);

        setStatus("");
        renderScene();
      },
      undefined,
      (error) => {
        const message =
          error instanceof Error
            ? error.message
            : error instanceof ProgressEvent
              ? `Loader event: ${error.type}`
              : "Unknown loader event";

        console.warn(`Could not load faceportfolio2.glb. ${message}`);
        setStatus("Could not load faceportfolio2.glb");
      },
    );

    const handleResize = () => {
      if (!container) {
        return;
      }

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderScene();
    };

    const pointerHitsModel = (event: PointerEvent) => {
      if (modelMeshes.length === 0) {
        return false;
      }

      const bounds = renderer.domElement.getBoundingClientRect();

      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      modelGroup.updateMatrixWorld(true);
      raycaster.setFromCamera(pointer, camera);

      return raycaster.intersectObjects(modelMeshes, false).length > 0;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (activePointerId !== null) {
        return;
      }

      if (!pointerHitsModel(event)) {
        return;
      }

      event.preventDefault();
      activePointerId = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      container.style.cursor = "grabbing";
      container.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) {
        container.style.cursor = pointerHitsModel(event) ? "grab" : "";
        return;
      }

      const deltaX = event.clientX - lastPointerX;
      const deltaY = event.clientY - lastPointerY;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;

      userTargetYaw += deltaX * DRAG_ROTATION_SPEED;
      userTargetPitch = THREE.MathUtils.clamp(
        userTargetPitch + deltaY * DRAG_PITCH_SPEED,
        -MAX_DRAG_PITCH,
        MAX_DRAG_PITCH,
      );
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) {
        return;
      }

      activePointerId = null;
      container.style.cursor = pointerHitsModel(event) ? "grab" : "";

      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerId === activePointerId) {
        return;
      }

      container.style.cursor = "";
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (!isTouchDevice) {
      container.addEventListener("pointerdown", handlePointerDown);
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerup", handlePointerUp);
      container.addEventListener("pointercancel", handlePointerUp);
      container.addEventListener("pointerleave", handlePointerLeave);
    }

    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (!isTouchDevice) {
        container.removeEventListener("pointerdown", handlePointerDown);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerup", handlePointerUp);
        container.removeEventListener("pointercancel", handlePointerUp);
        container.removeEventListener("pointerleave", handlePointerLeave);
      }

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;

        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      });

      renderer.dispose();
      studioEnvironment?.dispose();
      glassNoiseTexture.dispose();
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "auto",
      }}
      aria-label="3D model preview"
    >
      {status ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: "14px",
            fontFamily: "sans-serif",
            pointerEvents: "none",
          }}
        >
          {status}
        </div>
      ) : null}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
