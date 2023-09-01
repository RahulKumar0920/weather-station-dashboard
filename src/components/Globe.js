import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import "../components/Globe.css"

import earthTexture from "../assets/earth_texture.jpg";

const Globe = () => {
  const globeRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    globeRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load(earthTexture);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      globeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="GlobeContainer">
      <div className="GlobeCanvas" ref={globeRef} />
    </div>
  );
};

export default Globe;
