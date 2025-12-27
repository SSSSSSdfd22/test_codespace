// Home Page - Animated Tetrahedrons
let scene, camera, renderer, objects = [];

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 2000, 3500);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.z = 400;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00c8ff, 1.5);
    pointLight.position.set(300, 300, 300);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ff88, 1);
    pointLight2.position.set(-300, -300, 300);
    scene.add(pointLight2);

    // Create floating tetrahedrons
    for (let i = 0; i < 6; i++) {
        const geometry = new THREE.TetrahedronGeometry(60, 0);
        const material = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff,
            emissive: Math.random() * 0xffffff,
            shininess: 100
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 800;
        mesh.position.y = (Math.random() - 0.5) * 800;
        mesh.position.z = (Math.random() - 0.5) * 600;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
            z: (Math.random() - 0.5) * 2,
            rotX: (Math.random() - 0.5) * 0.02,
            rotY: (Math.random() - 0.5) * 0.02,
            rotZ: (Math.random() - 0.5) * 0.02
        };
        
        scene.add(mesh);
        objects.push(mesh);
    }

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Update tetrahedrons
    objects.forEach((obj) => {
        obj.position.x += obj.velocity.x;
        obj.position.y += obj.velocity.y;
        obj.position.z += obj.velocity.z;

        obj.rotation.x += obj.velocity.rotX;
        obj.rotation.y += obj.velocity.rotY;
        obj.rotation.z += obj.velocity.rotZ;

        // Bounce off boundaries
        if (Math.abs(obj.position.x) > 600) obj.velocity.x *= -1;
        if (Math.abs(obj.position.y) > 600) obj.velocity.y *= -1;
        if (Math.abs(obj.position.z) > 400) obj.velocity.z *= -1;
    });

    // Move camera slightly
    camera.position.x = Math.sin(Date.now() * 0.0001) * 100;
    camera.position.y = Math.cos(Date.now() * 0.00008) * 100;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
