const { useEffect, useRef } = React;

function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current || typeof THREE === "undefined") return;

    const container = bgRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight * 0.8;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050509);
    scene.fog = new THREE.Fog(0x050509, 8, 26);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";

    container.innerHTML = ""; // clear in case of hot reload
    container.appendChild(renderer.domElement);

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x050509, 0.7);
    scene.add(hemi);

    const spot = new THREE.SpotLight(0xffffff, 1.2, 40, Math.PI / 5, 0.4, 1.2);
    spot.position.set(6, 10, 4);
    spot.target.position.set(0, 0, 0);
    scene.add(spot);
    scene.add(spot.target);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050509,
      roughness: 0.85,
      metalness: 0.1
