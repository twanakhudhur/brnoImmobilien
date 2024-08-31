import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="left">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>BrnoImmobilien</span>
        </Link>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Agents</Link>
      </div>
      <div className="right">
        <Link href="/">Sign in</Link>
        <Link href="/" className="register">
          Sign up
        </Link>
        <div
          className={`menuIcon ${open ? "open" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Agents</Link>
          <Link href="/">Sign in</Link>
          <Link href="/">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}
