'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import Image from "next/image";


export const NavbarComponent = () => {

    return (
        <nav className="navbar navbar-light bg-light w-100">
            <div className="container-fluid d-flex align-items-center justify-content-start">
                <div>
                    <a className="navbar-brand d-flex align-items-center" href="/home">
                        <Image src="/favicon.png" alt="Logo" width="30" height="30"/>
                        <span>TimeTracker</span>
                    </a>
                </div>
                <div>
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item me-3">
                            <Link href="/home" className="nav-link active" aria-current="page">
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
