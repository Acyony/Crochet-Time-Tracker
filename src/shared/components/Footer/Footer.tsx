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
                            <li><a href="#" className="text-dark">Home</a></li>
                            <li><a href="#" className="text-dark">About</a></li>
                            <li><a href="#" className="text-dark">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <p>Email: alcionefribeiro@gmail.com</p>
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
