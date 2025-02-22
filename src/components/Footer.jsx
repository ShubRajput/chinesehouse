import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Address Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-orange-gradient bg-clip-text text-transparent">Visit Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                123 Food Street, Foodie District
                <br />Mumbai, Maharashtra 400001
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@chinesehouse.com" className="hover:text-primary transition-colors">
                  info@chinesehouse.com
                </a>
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-orange-gradient bg-clip-text text-transparent">Opening Hours</h3>
            <div className="space-y-2">
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
              <p className="mt-4 font-semibold text-primary">
                Home Delivery Available
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-orange-gradient bg-clip-text text-transparent">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                Follow us on social media for updates and special offers!
              </p>
            </div>
          </div>

          {/* Google Reviews */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-orange-gradient bg-clip-text text-transparent">Customer Reviews</h3>
            <div className="flex items-center gap-1 mb-2">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <span className="ml-2">4.8/5</span>
            </div>
            <p className="text-sm mb-2">Based on 500+ reviews</p>
            <a
              href="https://g.page/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-gradient hover:bg-orange-gradient-hover text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm"
            >
              Write a Review
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm">
          <p>© {new Date().getFullYear()} The Great Chinese House & Wok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}