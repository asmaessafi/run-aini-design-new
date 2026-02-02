
import { motion } from 'framer-motion';
import { FiUser, FiVideo, FiTrendingUp, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { FaBrain, FaRobot } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.04, y: -8, transition: { duration: 0.4 } }
};

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Subtle ambient glows – matching coach profile vibe */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(144,43,209,0.12),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,208,203,0.10),transparent_45%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,176,255,0.08),transparent_60%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-10 lg:px-12 py-28 md:py-40 text-center relative z-10">
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-10 leading-tight tracking-tight"
        >
          The Future of Football
          <br />
          <span className="bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
            Powered by AI & Technology
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light"
        >
          Runaini fuses intuitive management tools with advanced AI-driven features to connect coaches, players, and administrators—elevating training, performance analysis, and club operations in the rapidly evolving world of football technology.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-5 md:gap-7"
        >
          {[
            { label: "AI Video Analysis", color: "#902bd1" },
            { label: "Performance Analytics", color: "#00d0cb" },
            { label: "Real-Time Insights", color: "#4fb0ff" }
          ].map((item, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-7 py-3.5 bg-gray-900/50 backdrop-blur-md rounded-full text-lg font-medium border border-gray-700/60 hover:border-gray-500 transition-all"
              style={{ borderColor: `${item.color}40`, color: item.color }}
            >
              {item.label}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              At Runaini, we see football's future as one where <strong>AI augments human talent</strong>—not replaces it. We harness emerging technologies like intelligent video breakdown, predictive performance metrics, and real-time feedback to help coaches develop elite players, empower athletes to maximize potential, and allow administrators to scale operations efficiently.
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">
              Born for the modern game, Runaini turns data overload into actionable intelligence, fostering smarter training, deeper insights, and stronger connections across the football ecosystem.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="bg-gray-900/70 backdrop-blur-lg rounded-3xl p-10 lg:p-12 border border-gray-700/50 shadow-2xl">
              <blockquote className="text-3xl md:text-4xl italic font-medium text-gray-100 leading-relaxed bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
                "Where cutting-edge AI meets the passion of the pitch—unlocking tomorrow's champions today."
              </blockquote>
              <div className="mt-10 flex items-center justify-center gap-4 text-gray-400">
                <FaBrain size={32} className="text-[#00d0cb]" />
                <span className="text-lg font-medium">AI-Powered Football Evolution</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Roles */}
      <section className="container mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold text-center mb-20 bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent"
        >
          AI-Enhanced Roles for the Modern Game
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {[
            {
              icon: FiUser,
              title: "Coaches",
              color: "#4fb0ff",
              gradient: "from-[#4fb0ff] to-[#0020c8]",
              desc: "Design AI-assisted training sessions, leverage advanced video analysis for performance deep-dives, schedule intelligently, deliver real-time feedback, and track progress with predictive analytics."
            },
            {
              icon: FaRobot,
              title: "Players",
              color: "#0020c8",
              gradient: "from-[#0020c8] to-[#902bd1]",
              desc: "Access personalized AI-generated training plans, monitor metrics with intelligent tracking, receive instant coach feedback through smart systems, and manage your profile with performance insights."
            },
            {
              icon: FiDollarSign,
              title: "Administrators",
              color: "#902bd1",
              gradient: "from-[#902bd1] to-[#4fb0ff]",
              desc: "Oversee AI-enhanced operations, manage users and events seamlessly, handle payments efficiently, and gain system-wide analytics to drive growth and optimization."
            }
          ].map((role, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              // variants={cardHover}
              className="group bg-gray-900/70 backdrop-blur-md rounded-3xl p-10 border border-gray-700/50 transition-all duration-400 hover:border-gray-500 hover:shadow-2xl"
            >
              <div className={`w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center bg-gradient-to-br ${role.gradient} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <role.icon size={56} className="text-white" />
              </div>
              <h3
                className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all"
                style={{ color: role.color }}
              >
                {role.title}
              </h3>
              <p className="text-gray-200 text-center text-lg leading-relaxed">
                {role.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section className="container mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-32 bg-gradient-to-b from-transparent via-[#0a0f2a]/40 to-transparent">
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent"
        >
          Core AI-Powered Functionalities
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {[
            { icon: FiVideo, title: "Advanced Video Analysis", desc: "AI-driven breakdowns of performances, automatic tagging, pattern recognition, and tactical insights.", color: "#902bd1" },
            { icon: FiTrendingUp, title: "Performance Tracking & Analytics", desc: "Real-time metrics, predictive trends, and personalized development pathways powered by intelligent algorithms.", color: "#00d0cb" },
            { icon: FiCalendar, title: "Smart Scheduling", desc: "AI-optimized agendas, match planning, and event coordination for maximum efficiency.", color: "#4fb0ff" },
            { icon: FaBrain, title: "Real-Time Feedback", desc: "Instant, data-backed coaching insights delivered seamlessly across the platform.", color: "#00d0cb" },
            { icon: FiDollarSign, title: "Integrated Payment Management", desc: "Secure, streamlined handling of fees and subscriptions.", color: "#902bd1" },
            { icon: FiUser, title: "Intelligent Profiling", desc: "Dynamic player and coach profiles enriched with performance history and AI recommendations.", color: "#4fb0ff" }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-gray-900/65 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-gray-500 transition-all duration-400 hover:shadow-xl"
            >
              <feature.icon size={48} className="mb-6" style={{ color: feature.color }} />
              <h4 className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {feature.title}
              </h4>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
};

export default About;