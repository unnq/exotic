

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
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.Fog(0x050508, 15, 55);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 14);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // LIGHTS
    const hemi = new THREE.HemisphereLight(0xffffff, 0x050508, 0.9);
    scene.add(hemi);

    const keyLight = new THREE.SpotLight(0xffffff, 1.6, 60, Math.PI / 5, 0.4, 1.2);
    keyLight.position.set(10, 14, 6);
    keyLight.target.position.set(0, 0, 0);
    scene.add(keyLight);
    scene.add(keyLight.target);

    const fillLight = new THREE.PointLight(0x7f7fff, 0.6, 30);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    // FLOOR – long strip into distance
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.7,
      metalness: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);

    // GRID on floor so you can clearly see depth
    const grid = new THREE.GridHelper(80, 80, 0x444444, 0x222222);
    grid.position.y = -1.49;
    scene.add(grid);

    // SIMPLE "CAR" PLACEHOLDER – low, wide block
    const carGeo = new THREE.BoxGeometry(4.2, 1.0, 2.0);
    const carMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.2,
    });
    const car = new THREE.Mesh(carGeo, carMat);
    car.position.set(0, -1.0, 0);
    scene.add(car);

    // Slight base the car sits on
    const plinthGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.2, 40);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x101018,
      metalness: 0.5,
      roughness: 0.4,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(0, -1.4, 0);
    scene.add(plinth);

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const t = performance.now() * 0.001;

      // Subtle orbiting camera
      camera.position.x = Math.sin(t * 0.25) * 4.5;
      camera.position.z = 14 + Math.cos(t * 0.2) * 1.5;
      camera.lookAt(0, -0.5, 0);

      // Rotate car a bit so you clearly see motion
      car.rotation.y = Math.sin(t * 0.4) * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight * 0.8;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.innerHTML = "";

      renderer.dispose();

      floorGeo.dispose();
      floorMat.dispose();
      carGeo.dispose();
      carMat.dispose();
      plinthGeo.dispose();
      plinthMat.dispose();
    };
  }, []);

  return (
    <section className="hero">
      {/* Fullscreen background canvas */}
      <div ref={bgRef} className="hero-3d-bg" />

      {/* Content overlay */}
      <div className="hero-inner">
        <div className="hero-left">
          <p className="eyebrow">EXCLUSIVE EXOTIC RENTALS</p>
          <h1 className="title">
            Black Label
            <span className="accent"> Garage</span>
          </h1>

          <p className="subtitle">
            A private fleet of hypercars, supercars, and one-of-one exotics.
            Reserved for clients who refuse standard rentals.
          </p>

          <div className="cta-row">
            <button className="btn-primary">Request Availability</button>
            <button className="btn-ghost">View Collection</button>
          </div>

          <p className="meta">
            Los Angeles · Miami · Dubai · By appointment only
          </p>
        </div>
      </div>
    </section>
  );
}


function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="brand">EXOTIC BLACK</div>

        <nav className="links">
          <a href="#fleet">Fleet</a>
          <a href="#membership">Membership</a>
          <a href="#locations">Locations</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <Hero />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
