// Page 3 - Particle Galaxy
let scene, camera, renderer, particles, particleSystem;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 2000, 4000);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 50, 80);
    camera.lookAt(scene.position);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00c8ff, 2);
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);

    // Create galaxy particles
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Create spiral galaxy pattern
        const index = i / 3;
        const angle = (index / particleCount) * Math.PI * 12;
        const distance = 50 + (index / particleCount) * 150;
        const height = (Math.random() - 0.5) * 100;

        positions[i] = Math.cos(angle) * distance;
        positions[i + 1] = height;
        positions[i + 2] = Math.sin(angle) * distance;

        // Color gradient
        const t = index / particleCount;
        colors[i] = 0.2 + t * 0.8;
        colors[i + 1] = 0.6 + t * 0.4;
        colors[i + 2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1,
        sizeAttenuation: true,
        vertexColors: true,
        emissive: 0x4488ff
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate galaxy
    particleSystem.rotation.y += 0.0005;
    particleSystem.rotation.x += 0.0002;

    // Orbit camera
    const time = Date.now() * 0.0002;
    camera.position.x = Math.sin(time) * 150;
    camera.position.z = Math.cos(time) * 150;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
