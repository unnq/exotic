

const { useEffect, useRef } = React;

function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    console.log("Hero Three.js init…");

    if (!bgRef.current) {
      console.log("No bgRef container found");
      return;
    }

    if (typeof THREE === "undefined") {
      console.error("THREE is not defined. Check the three.js <script> tag.");
      return;
    }

    const container = bgRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202025); // lighter so you see it

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(0, 4, 14);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // LIGHTS – bright so you can see everything
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // FLOOR
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111118,
      roughness: 0.7,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);

    // GRID (very visible)
    const grid = new THREE.GridHelper(80, 40, 0xffffff, 0x666666);
    grid.position.y = -1.49;
    scene.add(grid);

    // "CAR" BLOCK – very obvious
    const carGeo = new THREE.BoxGeometry(4.2, 1.0, 2.0);
    const carMat = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      metalness: 0.6,
      roughness: 0.3,
    });
    const car = new THREE.Mesh(carGeo, carMat);
    car.position.set(0, -1.0, 0);
    scene.add(car);

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const t = performance.now() * 0.001;

      // Orbit camera a bit
      camera.position.x = Math.sin(t * 0.3) * 6.0;
      camera.position.z = 14 + Math.cos(t * 0.25) * 2.0;
      camera.lookAt(0, -0.5, 0);

      // Rotate the block
      car.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight * 0.8;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
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
      console.log("Hero Three.js cleanup");
    };
  }, []);

  return (
    <section className="hero">
      {/* Full background container */}
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
