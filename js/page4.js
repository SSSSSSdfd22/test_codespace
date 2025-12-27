// Page 4 - Wave Mesh
let scene, camera, renderer, mesh;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 50);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00c8ff, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff88, 0.6);
    pointLight.position.set(-50, 30, 50);
    scene.add(pointLight);

    // Create wave mesh
    const geometry = new THREE.PlaneGeometry(100, 100, 60, 60);
    
    // Store original positions
    const positionAttribute = geometry.getAttribute('position');
    const originalPositions = new Float32Array(positionAttribute.array);

    const material = new THREE.MeshPhongMaterial({
        color: 0x00c8ff,
        emissive: 0x004488,
        wireframe: false,
        side: THREE.DoubleSide,
        shininess: 80
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    // Animation data
    mesh.originalPositions = originalPositions;
    mesh.time = 0;

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    mesh.time += 0.02;

    // Update mesh vertices with wave effect
    const positionAttribute = mesh.geometry.getAttribute('position');
    const positions = positionAttribute.array;
    const originalPositions = mesh.originalPositions;

    for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        
        // Create wave effect
        const wave1 = Math.sin(x * 0.05 + mesh.time) * 5;
        const wave2 = Math.cos(y * 0.05 + mesh.time * 0.7) * 5;
        const wave3 = Math.sin((x + y) * 0.03 + mesh.time * 1.2) * 3;

        positions[i + 2] = originalPositions[i + 2] + wave1 + wave2 + wave3;
    }
    positionAttribute.needsUpdate = true;

    // Rotate mesh
    mesh.rotation.z += 0.0005;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
