import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent";

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
      }}
    >
      {/* Subtle ambient glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#902bd140,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#00d0cb30,transparent_60%)]" />
      </div>

      <motion.div
        className="relative mb-12 md:mb-16"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        {/* Glow behind the 404 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#902bd1]/30 via-[#00d0cb]/20 to-transparent blur-3xl opacity-70 rounded-full" />

        <div className="relative w-52 h-52 md:w-64 md:h-64 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-xl rounded-full flex items-center justify-center border border-gray-700/60 shadow-2xl shadow-[#902bd1]/20">
          <motion.span
            className={`text-9xl md:text-[12rem] font-black ${gradientText}`}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.span>
        </div>
      </motion.div>

      <motion.h1
        className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 md:mb-8 ${gradientText}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10 md:mb-12 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 120 }}
      >
        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 px-10 py-5 font-bold text-lg bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] text-white rounded-2xl shadow-xl shadow-[#902bd1]/30 hover:shadow-[#902bd1]/50 hover:brightness-105 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Go to Homepage
          </span>

          {/* Shine effect on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          <div className="absolute inset-0 border-2 border-white/10 rounded-2xl" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;