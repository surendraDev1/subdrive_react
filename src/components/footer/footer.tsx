import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ backgroundColor: '#f1f1f1', padding: '40px 20px', fontSize: '14px', color: '#333' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                    <h5 style={{ marginBottom: '15px', color: '#111' }}>Company</h5>
                    <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                        <li><a href="/about-us" style={{ textDecoration: 'none', color: '#555' }}>About Us</a></li>
                        <li><a href="/careers" style={{ textDecoration: 'none', color: '#555' }}>Careers</a></li>
                        <li><a href="/press" style={{ textDecoration: 'none', color: '#555' }}>Press</a></li>
                        <li><a href="/blog" style={{ textDecoration: 'none', color: '#555' }}>Blog</a></li>
                        <li><a href="/contact" style={{ textDecoration: 'none', color: '#555' }}>Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h5 style={{ marginBottom: '15px', color: '#111' }}>Explore</h5>
                    <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                        <li><a href="/how-it-works" style={{ textDecoration: 'none', color: '#555' }}>How It Works</a></li>
                        <li><a href="/trust-safety" style={{ textDecoration: 'none', color: '#555' }}>Trust & Safety</a></li>
                        <li><a href="/policies" style={{ textDecoration: 'none', color: '#555' }}>Policies</a></li>
                        <li><a href="/insurance" style={{ textDecoration: 'none', color: '#555' }}>Insurance</a></li>
                        <li><a href="/faq" style={{ textDecoration: 'none', color: '#555' }}>FAQs</a></li>
                    </ul>
                </div>
                <div>
                    <h5 style={{ marginBottom: '15px', color: '#111' }}>Hosting</h5>
                    <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                        <li><a href="/list-your-car" style={{ textDecoration: 'none', color: '#555' }}>List Your Car</a></li>
                        <li><a href="/host-guide" style={{ textDecoration: 'none', color: '#555' }}>Host Guide</a></li>
                        <li><a href="/host-resources" style={{ textDecoration: 'none', color: '#555' }}>Host Resources</a></li>
                        <li><a href="/community" style={{ textDecoration: 'none', color: '#555' }}>Community</a></li>
                        <li><a href="/hosting-faq" style={{ textDecoration: 'none', color: '#555' }}>Hosting FAQs</a></li>
                    </ul>
                </div>
                <div>
                    <h5 style={{ marginBottom: '15px', color: '#111' }}>Support</h5>
                    <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                        <li><a href="/help-center" style={{ textDecoration: 'none', color: '#555' }}>Help Center</a></li>
                        <li><a href="/contact-support" style={{ textDecoration: 'none', color: '#555' }}>Contact Support</a></li>
                        <li><a href="/accessibility" style={{ textDecoration: 'none', color: '#555' }}>Accessibility</a></li>
                        <li><a href="/legal" style={{ textDecoration: 'none', color: '#555' }}>Legal</a></li>
                    </ul>
                </div>
            </div>
            <div style={{ maxWidth: '1200px', margin: '20px auto 0', textAlign: 'center' }}>
                <p style={{ color: '#777', marginBottom: '0' }}>© 2024 SubDrive CarRentals. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
