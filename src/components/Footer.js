import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent";

  return (
    <footer className="relative bg-black border-t border-gray-800/40 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(144,43,209,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(0,208,203,0.06),transparent_65%)]" />
      </div>

      <div className="relative max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid md:grid-cols-4 gap-10 lg:gap-16"
        >
          {/* Brand & description */}
          <div className="space-y-6 lg:space-y-8">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Link to="/" className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight flex items-center">
                <span className={gradientText}>RUN</span>
                <span className="text-white/95 ml-1.5">AINI</span>
              </Link>
            </motion.div>

            <p className="text-gray-400/90 text-base lg:text-lg leading-relaxed max-w-sm font-light">
              Transform your team's performance with AI-driven insights and advanced analytics
            </p>

            <p className="text-gray-500/80 text-sm lg:text-base pt-2">
              © {new Date().getFullYear()} RUNAINI. All rights reserved.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-6 lg:space-y-8">
            <h5 className={`text-xl lg:text-2xl font-extrabold ${gradientText}`}>
              Platform
            </h5>
            <ul className="space-y-4 lg:space-y-5">
              {['Features', 'Pricing', 'Security'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="group flex items-center text-gray-300 hover:text-[#00d0cb] transition-all duration-300 text-base lg:text-lg font-medium"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#902bd1] to-[#00d0cb] mr-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6 lg:space-y-8">
            <h5 className={`text-xl lg:text-2xl font-extrabold ${gradientText}`}>
              Legal
            </h5>
            <ul className="space-y-4 lg:space-y-5">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="group flex items-center text-gray-300 hover:text-[#00d0cb] transition-all duration-300 text-base lg:text-lg font-medium"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#902bd1] to-[#00d0cb] mr-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                    {item} Policy
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6 lg:space-y-8">
            <h5 className={`text-xl lg:text-2xl font-extrabold ${gradientText}`}>
              Connect
            </h5>

            <div className="flex flex-wrap gap-4 lg:gap-5">
              {[
                { icon: <FaFacebook size={20} />, label: 'Facebook' },
                { icon: <FaTwitter size={20} />, label: 'Twitter' },
                { icon: <FaInstagram size={20} />, label: 'Instagram' },
                { icon: <FaLinkedin size={20} />, label: 'LinkedIn' },
                { icon: <FaYoutube size={20} />, label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ y: -6, scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="text-gray-300 hover:text-white p-3.5 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-gray-700/50 hover:border-[#00d0cb]/40 hover:shadow-[0_0_20px_rgba(0,208,203,0.18)] transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;