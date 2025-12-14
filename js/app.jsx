

const { useEffect, useRef } = React;

function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    console.log("Hero Three.js init (dark env)…");

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
    scene.background = new THREE.Color(0x050509);
    scene.fog = new THREE.Fog(0x050509, 18, 120);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(0, 3.2, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // LIGHTING – soft top light + slight cool fill
    const hemi = new THREE.HemisphereLight(0xffffff, 0x050509, 0.55);
    scene.add(hemi);

    const spot = new THREE.SpotLight(0xffffff, 1.0, 80, Math.PI / 5, 0.45, 1.2);
    spot.position.set(8, 14, 10);
    spot.target.position.set(0, 0, -5);
    scene.add(spot);
    scene.add(spot.target);

    const fill = new THREE.PointLight(0x0a0c19, 0.35, 40);
    fill.position.set(-10, 4, -6);
    scene.add(fill);

    // FLOOR – 4× further than before
    const floorGeo = new THREE.PlaneGeometry(160, 160);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x04040a,
      roughness: 0.8,
      metalness: 0.18,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    scene.add(floor);

    

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const t = performance.now() * 0.0006;

      // Very subtle camera motion
      camera.position.x = Math.sin(t * 0.6) * 2.4;
      camera.position.z = 18 + Math.cos(t * 0.4) * 1.8;
      camera.lookAt(0, 0.2, -6);

      // Slight drift on lights so the reflections shift
      spot.position.x = 8 + Math.sin(t * 1.2) * 2.0;
      fill.position.z = -6 + Math.cos(t * 0.8) * 2.5;

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
      blockGeo.dispose();
      blockMat.dispose();
      console.log("Hero Three.js cleanup (dark env)");
    };
  }, []);

  return (
    <section className="hero">
      {/* Full background container */}
      <div ref={bgRef} className="hero-3d-bg" />

      {/* Content overlay */}
      <div className="hero-inner">
        <div className="hero-left">
          <p className="eyebrow">Luxury Car Rental</p>
          <h1 className="title">
            Black Label
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
            Los Angeles · Orange County
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
