// Page 5 - Flying Objects
let scene, camera, renderer, objects = [];

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 1000, 3000);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 50, 100);
    camera.lookAt(scene.position);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00c8ff, 1);
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff00ff, 0.8);
    pointLight.position.set(-100, 50, 100);
    scene.add(pointLight);

    // Create flying objects
    const geometries = [
        new THREE.IcosahedronGeometry(15, 2),
        new THREE.OctahedronGeometry(15, 0),
        new THREE.DodecahedronGeometry(12, 0),
        new THREE.TetrahedronGeometry(20, 0),
        new THREE.SphereGeometry(15, 32, 32)
    ];

    const colors = [0xff0080, 0x00c8ff, 0x00ff88, 0xffff00, 0xff6600];

    geometries.forEach((geometry, index) => {
        const material = new THREE.MeshPhongMaterial({
            color: colors[index],
            emissive: colors[index],
            shininess: 100,
            wireframe: false
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Random starting position
        mesh.position.x = (Math.random() - 0.5) * 300;
        mesh.position.y = (Math.random() - 0.5) * 200 + 50;
        mesh.position.z = (Math.random() - 0.5) * 300;

        // Random velocity
        mesh.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 3
        );

        // Random rotation velocity
        mesh.rotationVelocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03
        );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
        objects.push(mesh);
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Update flying objects
    objects.forEach((obj) => {
        // Update position
        obj.position.add(obj.velocity);

        // Update rotation
        obj.rotation.x += obj.rotationVelocity.x;
        obj.rotation.y += obj.rotationVelocity.y;
        obj.rotation.z += obj.rotationVelocity.z;

        // Bounce off boundaries
        if (Math.abs(obj.position.x) > 300) obj.velocity.x *= -1;
        if (Math.abs(obj.position.y) > 200) obj.velocity.y *= -1;
        if (Math.abs(obj.position.z) > 300) obj.velocity.z *= -1;

        // Keep in bounds
        obj.position.x = Math.max(-300, Math.min(300, obj.position.x));
        obj.position.y = Math.max(-150, Math.min(250, obj.position.y));
        obj.position.z = Math.max(-300, Math.min(300, obj.position.z));
    });

    // Orbit camera around objects
    const time = Date.now() * 0.0003;
    camera.position.x = Math.sin(time) * 200;
    camera.position.z = Math.cos(time) * 200;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
