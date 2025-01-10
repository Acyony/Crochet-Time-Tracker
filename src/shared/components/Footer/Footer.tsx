'use client';


export const FooterComponent =() => {
    return (
        <footer className="bg-light text-dark py-4 ">
            <div className="container">
                <div className="row gy-3">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>
                            A simple and intuitive Time Tracker that records hours, minutes, and seconds to help you monitor and manage your time effectively.
                        </p>
                    </div>
                    <div className="col-md-4 ">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="nav-item">
                                <a
                                    href="https://www.linkedin.com/in/alcionefranca/"
                                    className="nav-link active"
                                    aria-current="page"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Social Media
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2024 Alci1. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default FooterComponent
