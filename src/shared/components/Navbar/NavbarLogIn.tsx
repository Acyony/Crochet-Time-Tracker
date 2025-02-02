'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";


export const NavbarAuthComponent = () => {

    return (

        <nav className="navbar navbar-light bg-light w-100">
            <div className="container-fluid d-flex align-items-center justify-content-start">
                <div>
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <Image src="/favicon.png" alt="Logo" width="30" height="30"/>
                        <span>TimeTracker</span>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAuthComponent
