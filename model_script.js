import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.164.1/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
const container = document.getElementById('container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
camera.position.set(15, 0, 60);
const ambienTLight = new THREE.AmbientLight(0xffffff);
scene.add(ambienTLight);
const directionalLight = new THREE.DirectionalLight(0xfffff, 7);
scene.add(directionalLight);
const loader = new GLTFLoader();
let model;

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const isFirstTime = localStorage.getItem("isFirstTime");

if (!isFirstTime) {
    document.getElementById("loading").style.display = "flex";
    setTimeout(function() {
        localStorage.setItem("isFirstTime", "true");
        document.getElementById("loading").style.display = "none";
        initializeScene();
    }, 4000);
} else {
    document.getElementById("loading").style.display = "none";
    initializeScene();
}

function initializeScene() {
    loader.load('./model.glb', function (gltf) {
        model = gltf.scene;
        model.position.set(10, -10, 0);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);
        controls.update();
        scene.add(model);

        const buttonGeometry = new THREE.BoxGeometry(2, 2, 1);
        const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        buttonMesh.position.copy(center);
        model.add(buttonMesh);

        const designGeometry = new THREE.BoxGeometry(1, 1, 0.5);
        const designMaterial = new THREE.MeshBasicMaterial({ color: 0xfffffff });
        const designMesh = new THREE.Mesh(designGeometry, designMaterial);
        designMesh.position.set(-12, 14, -29.6);
        model.add(designMesh);

        buttonMesh.position.set(-12, 14, -30);

        render();
        animate();
    }, undefined, function (error) {
        console.log(error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.position.z += (15 - model.position.z) * 0.05;
        model.position.y += (-25 - model.position.y) * 0.05;
        model.position.x += (20 - model.position.x) * 0.05;
    }
    render();
}

function render() {
    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
});

container.style.cursor = 'grab';

container.addEventListener('click', function (event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(model.children, true);
    if (intersects.length > 0) {
        let content = document.querySelector('.content');
        content.classList.add('showcontent');
        content.classList.remove('removecontent');
    }
});
