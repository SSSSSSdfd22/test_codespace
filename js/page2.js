// Page 2 - Rotating Cube with Advanced Lighting
let scene, camera, renderer, cube;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00c8ff, 1.2);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff00ff, 0.8);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ff88, 0.6);
    pointLight2.position.set(5, -5, 5);
    scene.add(pointLight2);

    // Create cube with multiple materials
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff0080, emissive: 0xff0080, shininess: 100 }),
        new THREE.MeshPhongMaterial({ color: 0x00c8ff, emissive: 0x00c8ff, shininess: 100 }),
        new THREE.MeshPhongMaterial({ color: 0x00ff88, emissive: 0x00ff88, shininess: 100 }),
        new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00, shininess: 100 }),
        new THREE.MeshPhongMaterial({ color: 0xff6600, emissive: 0xff6600, shininess: 100 }),
        new THREE.MeshPhongMaterial({ color: 0x9900ff, emissive: 0x9900ff, shininess: 100 })
    ];
    
    cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Add outer glow cube
    const glowGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00c8ff,
        transparent: true,
        opacity: 0.1
    });
    const glowCube = new THREE.Mesh(glowGeometry, glowMaterial);
    glowCube.scale.set(1.1, 1.1, 1.1);
    scene.add(glowCube);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.015;
    cube.rotation.z += 0.005;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
