"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const BOOK_STACK_LOOP_SECONDS = 20;
const BOOK_STACK_ROTATION_STRENGTH = 0.035;
const BOOK_STACK_MAX_YAW = Math.PI * 2 * BOOK_STACK_ROTATION_STRENGTH;

export function BookStackViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading model...");

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let disposed = false;
    let animationFrameId = 0;
    let isVisible = false;
    let modelReady = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0C0A09");
    scene.fog = new THREE.Fog("#0C0A09", 6, 16);

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.6, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.style.cursor = "default";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const studioCanvas = document.createElement("canvas");
    studioCanvas.width = 1024;
    studioCanvas.height = 512;

    const studioContext = studioCanvas.getContext("2d");
    let studioEnvironment: THREE.WebGLRenderTarget | null = null;

    if (studioContext) {
      studioContext.fillStyle = "#0C0A09";
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
    let noiseSeed = 17;

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
    glassNoiseTexture.repeat.set(6, 9);
    glassNoiseTexture.needsUpdate = true;

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.04);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight("#ffffff", "#000000", 0.08);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3.8);
    keyLight.position.set(0.6, 1.8, 4.8);
    keyLight.target.position.set(0, 0, 0);
    scene.add(keyLight);
    scene.add(keyLight.target);

    const fillLight = new THREE.DirectionalLight("#ffffff", 0.32);
    fillLight.position.set(-2.2, 0.9, 3.8);
    fillLight.target.position.set(0, 0, 0);
    scene.add(fillLight);
    scene.add(fillLight.target);

    const frontLight = new THREE.SpotLight("#ffffff", 88, 0, 0.44, 0.78);
    frontLight.position.set(0, 0.8, 5.4);
    frontLight.target.position.set(0, 0.05, 0);
    scene.add(frontLight);
    scene.add(frontLight.target);

    const rimLight = new THREE.SpotLight("#ffffff", 82, 0, 0.22, 0.94);
    rimLight.position.set(-3.2, 2.2, -4);
    scene.add(rimLight);

    const oppositeRimLight = new THREE.SpotLight("#ffffff", 54, 0, 0.2, 0.92);
    oppositeRimLight.position.set(3.2, 1, -3.4);
    scene.add(oppositeRimLight);

    const crownLight = new THREE.DirectionalLight("#ffffff", 4.6);
    crownLight.position.set(0, 3.2, 0.8);
    crownLight.target.position.set(0, 0, 0);
    scene.add(crownLight);
    scene.add(crownLight.target);

    const backLight = new THREE.DirectionalLight("#ffffff", 2);
    backLight.position.set(0.2, 0.2, -4.8);
    backLight.target.position.set(0, 0, 0);
    scene.add(backLight);
    scene.add(backLight.target);

    const underLight = new THREE.DirectionalLight("#ffffff", 0.26);
    underLight.position.set(0, -1.8, 2.3);
    underLight.target.position.set(0, 0, 0);
    scene.add(underLight);
    scene.add(underLight.target);

    const modelGroup = new THREE.Group();
    const baseGroupQuaternion = modelGroup.quaternion.clone();
    const rotationQuaternion = new THREE.Quaternion();
    const rotationAxis = new THREE.Vector3(0, 1, 0);
    const clock = new THREE.Clock();
    scene.add(modelGroup);

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();
      const progress = elapsed * (Math.PI * 2 / BOOK_STACK_LOOP_SECONDS);
      const yaw = Math.sin(progress) * BOOK_STACK_MAX_YAW;

      rotationQuaternion.setFromAxisAngle(rotationAxis, yaw);
      modelGroup.quaternion.copy(baseGroupQuaternion).multiply(rotationQuaternion);
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      renderScene();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!modelReady || animationFrameId !== 0) {
        return;
      }

      clock.start();
      animate();
    };

    const stopAnimation = () => {
      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }

      clock.stop();
    };

    const loader = new GLTFLoader();
    loader.load(
      "/low_poly_book_stack.glb",
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
            roughness: 0.12,
            roughnessMap: glassNoiseTexture,
            bumpMap: glassNoiseTexture,
            bumpScale: 0.016,
            transmission: 1,
            transparent: true,
            opacity: 0.6,
            ior: 1.46,
            thickness: 0.18,
            attenuationDistance: 85,
            attenuationColor: new THREE.Color("#ffffff"),
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            reflectivity: 0.58,
            specularIntensity: 1.72,
            specularColor: new THREE.Color("#ffffff"),
            envMapIntensity: 1.7,
            side: THREE.DoubleSide,
          });
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.85;
        const scaleFactor = targetSize / maxAxis;

        model.scale.setScalar(scaleFactor);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        model.position.set(-scaledCenter.x, -scaledCenter.y, -scaledCenter.z);

        const scaledHeight = size.y * scaleFactor;
        model.position.y -= scaledHeight * 0.06;
        modelGroup.add(model);

        const fittedBox = new THREE.Box3().setFromObject(modelGroup);
        const fittedCenter = fittedBox.getCenter(new THREE.Vector3());
        const boundingSphere = fittedBox.getBoundingSphere(new THREE.Sphere());
        const radius = Math.max(boundingSphere.radius, 0.5);
        const fov = THREE.MathUtils.degToRad(camera.fov);
        const distance = radius / Math.sin(fov / 2) * 0.86;

        camera.near = Math.max(0.01, radius / 100);
        camera.far = Math.max(100, distance * 8);
        const cameraTarget = new THREE.Vector3(0, fittedCenter.y, fittedCenter.z);
        camera.position.set(0, cameraTarget.y + radius * 0.04, cameraTarget.z + distance * 1.16);
        camera.lookAt(cameraTarget);

        modelReady = true;
        setStatus("");
        renderScene();
        startAnimation();
      },
      undefined,
      (error) => {
        const message =
          error instanceof Error
            ? error.message
            : error instanceof ProgressEvent
              ? `Loader event: ${error.type}`
              : "Unknown loader event";

        console.warn(`Could not load low_poly_book_stack.glb. ${message}`);
        setStatus("Could not load low_poly_book_stack.glb");
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

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          startAnimation();
        } else if (!isVisible) {
          stopAnimation();
        }
      },
      { threshold: 0.2 },
    );

    handleResize();
    intersectionObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      stopAnimation();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);

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
      }}
      aria-label="3D book stack preview"
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
