import { useState } from 'react';
import { FiMenu, FiX, FiArrowUpRight, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const guestLinks = [
  { name: 'Home', path: '/' },
  { name: 'Plans', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-gray-800/40">
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 h-16 md:h-18 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link to="/" className="text-2xl md:text-3xl font-black tracking-tight flex items-center">
            <span className={gradientText}>RUN</span>
            <span className="text-white/95 ml-1.5">AINI</span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 lg:space-x-14">
          {guestLinks.map((link) => (
            <motion.div key={link.name} whileHover="hover" initial="initial">
              <Link
                to={link.path}
                className="relative text-gray-300 hover:text-white text-base lg:text-lg font-medium transition-colors duration-300 group"
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] origin-left"
                  variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
            <Link
              to="/login"
              className="text-gray-300 hover:text-[#00d0cb] p-2.5 rounded-xl hover:bg-gray-900/50 transition-all"
              aria-label="Login"
            >
              <FiUser size={22} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-2xl font-semibold text-base bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] text-white shadow-lg shadow-[#902bd1]/25 hover:shadow-[#902bd1]/40 hover:brightness-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden text-gray-300 hover:text-white p-2.5 rounded-xl hover:bg-gray-900/50 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.92 }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-gray-800/40"
          >
            <div className="px-6 py-8 space-y-2">
              {guestLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center justify-between px-5 py-4 text-gray-200 hover:text-[#00d0cb] hover:bg-gray-900/50 rounded-2xl transition-all duration-300 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <FiArrowUpRight className="text-gray-500 group-hover:text-[#00d0cb]" />
                </Link>
              ))}

              {/* Mobile Login */}
              <Link
                to="/login"
                className="flex items-center justify-between px-5 py-4 text-gray-200 hover:text-[#00d0cb] hover:bg-gray-900/50 rounded-2xl transition-all duration-300 text-lg font-medium mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Login</span>
                <FiUser className="text-gray-500 group-hover:text-[#00d0cb]" />
              </Link>

              {/* Mobile CTA */}
              <div className="pt-6 mt-4 border-t border-gray-800/40">
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/signup"
                    className="block text-center bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-[#902bd1]/25 hover:shadow-[#902bd1]/40 hover:brightness-105 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;