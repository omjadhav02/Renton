import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Renton
          </h2>

          <p className="text-sm text-gray-400">
            Find. Book. Move In.
          </p>

          <p className="text-sm mt-4">
            Renton helps you discover and book rental properties easily and securely.
          </p>
        </div>


        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/favorites" className="hover:text-white">
                Favorites
              </Link>
            </li>

            <li>
              <Link to="/my-bookings" className="hover:text-white">
                Bookings
              </Link>
            </li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <p className="text-sm">support@renton.com</p>
          <p className="text-sm">Mumbai, India</p>

          <p className="text-sm mt-4">
            Built for modern property rental experiences.
          </p>
        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Renton. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;