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
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    scene.add(floor);

    // Simple sculpted shapes as environmental hints
    const pillarGeo = new THREE.BoxGeometry(0.5, 3.5, 0.5);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x16161f,
      roughness: 0.4,
      metalness: 0.4,
    });

    const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
    leftPillar.position.set(-4, 0.25, -2);
    scene.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
    rightPillar.position.set(4, 0.25, -3);
    scene.add(rightPillar);

    // Subtle top bar
    const barGeo = new THREE.BoxGeometry(8, 0.2, 0.4);
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x222230,
      roughness: 0.3,
      metalness: 0.6,
    });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(0, 3.2, -4);
    scene.add(bar);

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Subtle motion for life
      const t = performance.now() * 0.0002;
      spot.position.x = Math.sin(t) * 6;
      spot.position.z = 4 + Math.cos(t) * 2;
      camera.position.x = Math.sin(t * 0.6) * 0.6;
      camera.lookAt(0, 1.3, 0);

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
      pillarGeo.dispose();
      pillarMat.dispose();
      barGeo.dispose();
      barMat.dispose();
    };
  }, []);

  return (
    <section className="hero">
      {/* Background canvas container */}
      <div ref={bgRef} className="hero-3d-bg" />

      {/* Overlay content */}
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
