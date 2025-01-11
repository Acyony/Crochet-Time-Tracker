'use client';
import 'bootstrap/dist/css/bootstrap.min.css';


export const NavbarAuthComponent = () => {

    return (

        <nav className="navbar navbar-light bg-light w-100">
            <div className="container-fluid d-flex align-items-center justify-content-start">
                <div>
                    <a className="navbar-brand me-4" href="#">TimeTracker</a>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAuthComponent
