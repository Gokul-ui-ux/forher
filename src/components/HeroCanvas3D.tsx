import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  onDayOneClick?: () => void;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ onDayOneClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1420, 1.0);
    scene.add(ambientLight);

    const gokulLight = new THREE.PointLight(0xd4af37, 2.5, 15);
    gokulLight.position.set(-3.5, 0.5, 0);
    scene.add(gokulLight);

    const iniyaLight = new THREE.PointLight(0xf7df9e, 2.5, 15);
    iniyaLight.position.set(3.5, -0.3, 0);
    scene.add(iniyaLight);

    // 3. Create Circle Texture for particles and celestial nodes
    const makeParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.25, 'rgba(247, 223, 158, 0.85)');
        grad.addColorStop(0.6, 'rgba(212, 175, 55, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = makeParticleTexture();

    // 4. Background Starfield (1,600 Tiny Stars across depth)
    const starCount = 1600;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#f7df9e'),
      new THREE.Color('#d4af37'),
      new THREE.Color('#c5c1b8'),
      new THREE.Color('#e0d5c1'),
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 2.0 + Math.random() * 12.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      starPositions[i * 3] = r * Math.cos(theta) * Math.cos(phi);
      starPositions[i * 3 + 1] = r * Math.sin(phi);
      starPositions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi) - 3.5;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 5. Two Celestial Long-Distance Nodes: GOKUL (Left) & INIYA (Right)
    const createCelestialNode = (colorHex: string, labelText: string) => {
      const group = new THREE.Group();

      // Core point of light
      const coreGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Soft glowing halo
      const haloGeo = new THREE.BufferGeometry();
      haloGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      const haloMat = new THREE.PointsMaterial({
        size: 1.8,
        map: particleTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Points(haloGeo, haloMat);
      group.add(halo);

      // Subtle orbital stardust ring
      const ringGeo = new THREE.RingGeometry(0.35, 0.38, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);

      group.userData = { label: labelText, ring, halo };
      return group;
    };

    // Gokul's celestial point (positioned to the far left)
    const gokulNode = createCelestialNode('#d4af37', 'Gokul');
    gokulNode.position.set(-3.6, 0.4, -0.8);
    scene.add(gokulNode);

    // Iniya's celestial point (positioned to the far right)
    const iniyaNode = createCelestialNode('#f7df9e', 'Iniya');
    iniyaNode.position.set(3.6, -0.2, -1.0);
    scene.add(iniyaNode);

    // 6. Subtle Glowing Connection Stream (Far apart, but connected)
    // We create a delicate curved spline connecting Gokul and Iniya, dipping gently behind the headline
    const curvePointsCount = 180;
    const connectionPositions = new Float32Array(curvePointsCount * 3);
    const connectionColors = new Float32Array(curvePointsCount * 3);

    const updateConnectionCurve = (t: number) => {
      // Gentle arching curve in 3D
      const p0 = gokulNode.position;
      const p2 = iniyaNode.position;
      // Midpoint dips slightly lower and further back so it frames the text cleanly
      const p1 = new THREE.Vector3(0, -1.4 + Math.sin(t * 0.8) * 0.15, -2.5);

      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
      const points = curve.getPoints(curvePointsCount - 1);

      for (let i = 0; i < points.length; i++) {
        connectionPositions[i * 3] = points[i].x;
        connectionPositions[i * 3 + 1] = points[i].y;
        connectionPositions[i * 3 + 2] = points[i].z;

        // Gradient color along path
        const alpha = i / points.length;
        const color = new THREE.Color().lerpColors(
          new THREE.Color('#d4af37'),
          new THREE.Color('#f7df9e'),
          alpha
        );
        connectionColors[i * 3] = color.r;
        connectionColors[i * 3 + 1] = color.g;
        connectionColors[i * 3 + 2] = color.b;
      }
    };

    updateConnectionCurve(0);

    const connectionGeo = new THREE.BufferGeometry();
    connectionGeo.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    connectionGeo.setAttribute('color', new THREE.BufferAttribute(connectionColors, 3));

    // Dotted / stardust particle trail connecting the two points
    const connectionMat = new THREE.PointsMaterial({
      size: 0.07,
      map: particleTexture,
      transparent: true,
      opacity: 0.55,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const connectionLine = new THREE.Points(connectionGeo, connectionMat);
    scene.add(connectionLine);

    // Flowing signals / pulses traveling between Gokul & Iniya
    const pulseCount = 6;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulsePoints);

    // 7. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Click raycasting for easter egg: clicking Gokul or Iniya's star
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      clickMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      clickMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(clickMouse, camera);
      const intersects = raycaster.intersectObjects([gokulNode, iniyaNode], true);

      if (intersects.length > 0 && onDayOneClick) {
        onDayOneClick();
      }
    };

    renderer.domElement.addEventListener('click', onClick);

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Gokul node: gentle floating and independent pulsing
      gokulNode.position.y = 0.4 + Math.sin(elapsed * 0.9) * 0.12;
      gokulNode.position.x = -3.6 + Math.cos(elapsed * 0.6) * 0.08;
      (gokulNode.userData.ring as THREE.Mesh).rotation.z = elapsed * 0.4;
      (gokulNode.userData.halo as THREE.Points).scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.15);

      // Iniya node: gentle floating and independent pulsing
      iniyaNode.position.y = -0.2 + Math.cos(elapsed * 0.8) * 0.14;
      iniyaNode.position.x = 3.6 + Math.sin(elapsed * 0.7) * 0.08;
      (iniyaNode.userData.ring as THREE.Mesh).rotation.z = -elapsed * 0.4;
      (iniyaNode.userData.halo as THREE.Points).scale.setScalar(1 + Math.cos(elapsed * 1.4) * 0.15);

      // Update the delicate connection curve between them
      updateConnectionCurve(elapsed);
      const posAttr = connectionGeo.getAttribute('position') as THREE.BufferAttribute;
      posAttr.needsUpdate = true;

      // Animate signal pulses traveling along the curve
      const p0 = gokulNode.position;
      const p2 = iniyaNode.position;
      const p1 = new THREE.Vector3(0, -1.4 + Math.sin(elapsed * 0.8) * 0.15, -2.5);
      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);

      const pulsePosArr = pulseGeo.getAttribute('position').array as Float32Array;
      for (let i = 0; i < pulseCount; i++) {
        // Staggered speed and directions (signals going from Gokul to Iniya, and Iniya to Gokul)
        const speed = 0.25;
        let t = (elapsed * speed + (i / pulseCount)) % 1;
        if (i % 2 === 1) {
          t = 1 - t; // reverse direction
        }
        const pt = curve.getPoint(t);
        pulsePosArr[i * 3] = pt.x;
        pulsePosArr[i * 3 + 1] = pt.y;
        pulsePosArr[i * 3 + 2] = pt.z;
      }
      pulseGeo.getAttribute('position').needsUpdate = true;

      // Starfield gentle cosmic drift
      starPoints.rotation.y = elapsed * 0.015;
      starPoints.rotation.x = Math.sin(elapsed * 0.01) * 0.03;

      // Cinematic camera parallax
      camera.position.x = mouseX * 0.45;
      camera.position.y = mouseY * 0.25;
      camera.lookAt(0, -0.2, -1.0);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);

      scene.clear();
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      connectionGeo.dispose();
      connectionMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      particleTexture.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onDayOneClick]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
