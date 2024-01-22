import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const PetCare = () => {
  useEffect(() => {
    // Three.js 초기화 코드
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    loader.load("/components/Flamingo.glb", (gltf) => {
      const pet = gltf.scene;
      pet.scale.set(0.1, 0.1, 0.1);
      scene.add(pet);
      console.log("모델이 로드되었습니다.", pet);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // 컴포넌트가 언마운트될 때 Three.js 리소스 정리
    return () => {
      renderer.domElement.remove();
    };
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

  return <div className="pet-care-container">{/* 나머지 컴포넌트 JSX */}</div>;
};

export default PetCare;
