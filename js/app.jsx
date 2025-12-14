function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="brand">EXOTIC BLACK</div>

        <nav className="links">
          <a href="#">Fleet</a>
          <a href="#">Membership</a>
          <a href="#">Locations</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-left">
          <p className="eyebrow">EXCLUSIVE EXOTIC RENTALS</p>
          <h1 className="title">
            Black Label
            <span className="accent"> Garage</span>
          </h1>

          <p className="subtitle">
            A private showroom of hypercars, supercars, and one-of-one exotics.
            Available by appointment only.
          </p>

          <div className="cta-row">
            <button className="btn-primary">Request Availability</button>
            <button className="btn-ghost">View Collection</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="three-placeholder">
            3D showroom coming soon.
          </div>
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
