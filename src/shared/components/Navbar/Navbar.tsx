'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

import Link from "next/link";

export const NavbarComponent = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light  w-100">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">TimeTracker</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/" className="nav-link active" aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/projects" className="nav-link active" aria-current="page">
                                All Projects
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavbarComponent
