
import { FiUser, FiVideo, FiTrendingUp, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { FaBrain, FaRobot } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative" 
         style={{ 
           background: 'linear-gradient(135deg, #000000 0%, #0a1a2f 40%, #1e0033 100%)' 
         }}>

      {/* Background subtle AI-themed overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(33,84,124,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(144,43,209,0.15),transparent_50%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-10 leading-tight tracking-tight">
          The Future of Football <br />
          <span className="bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent">
            Powered by AI & Technology
          </span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
          Runaini fuses intuitive management tools with advanced AI-driven features to connect coaches, players, and administrators—elevating training, performance analysis, and club operations in the rapidly evolving world of football technology.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <span className="px-6 py-3 bg-[#0020c8]/30 rounded-full text-lg border border-[#0020c8]/50 backdrop-blur-sm">AI Video Analysis</span>
          <span className="px-6 py-3 bg-[#4fb0ff]/30 rounded-full text-lg border border-[#4fb0ff]/50 backdrop-blur-sm">Performance Analytics</span>
          <span className="px-6 py-3 bg-[#902bd1]/30 rounded-full text-lg border border-[#902bd1]/50 backdrop-blur-sm">Real-Time Insights</span>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              At Runaini, we see football's future as one where **AI augments human talent**—not replaces it. We harness emerging technologies like intelligent video breakdown, predictive performance metrics, and real-time feedback to help coaches develop elite players, empower athletes to maximize potential, and allow administrators to scale operations efficiently.
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">
              Born for the modern game, Runaini turns data overload into actionable intelligence, fostering smarter training, deeper insights, and stronger connections across the football ecosystem.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#4fb0ff]/20 via-[#0020c8]/20 to-[#902bd1]/20 rounded-3xl p-12 border border-[#0020c8]/40 backdrop-blur-lg shadow-2xl">
              <blockquote className="text-3xl md:text-4xl italic font-medium text-gray-100 leading-relaxed">
                "Where cutting-edge AI meets the passion of the pitch—unlocking tomorrow's champions today."
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4 text-gray-400">
                <FaBrain size={32} className="text-[#0020c8]" />
                <span className="text-lg">AI-Powered Football Evolution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Roles Section - Enhanced with AI focus */}
      <section className="container mx-auto px-6 py-24 md:py-32">
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent">
          AI-Enhanced Roles for the Modern Game
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Coach Card */}
          <div className="group bg-gray-900/60 backdrop-blur-md border border-[#4fb0ff]/50 rounded-3xl p-10 hover:border-[#0020c8] hover:shadow-2xl transition-all duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-[#4fb0ff] to-[#0020c8] rounded-full flex items-center justify-center mb-10 mx-auto group-hover:scale-110 transition-transform duration-500">
              <FiUser size={56} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-[#4fb0ff] mb-6 text-center">Coaches</h3>
            <p className="text-gray-200 text-center text-lg leading-relaxed">
              Design AI-assisted training sessions, leverage advanced video analysis for performance deep-dives, schedule intelligently, deliver real-time feedback, and track progress with predictive analytics.
            </p>
          </div>

          {/* Player Card */}
          <div className="group bg-gray-900/60 backdrop-blur-md border border-[#0020c8]/50 rounded-3xl p-10 hover:border-[#4fb0ff] hover:shadow-2xl transition-all duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0020c8] to-[#902bd1] rounded-full flex items-center justify-center mb-10 mx-auto group-hover:scale-110 transition-transform duration-500">
              <FaRobot size={56} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-[#0020c8] mb-6 text-center">Players</h3>
            <p className="text-gray-200 text-center text-lg leading-relaxed">
              Access personalized AI-generated training plans, monitor metrics with intelligent tracking, receive instant coach feedback through smart systems, and manage your profile with performance insights.
            </p>
          </div>

          {/* Admin Card */}
          <div className="group bg-gray-900/60 backdrop-blur-md border border-[#902bd1]/50 rounded-3xl p-10 hover:border-[#902bd1] hover:shadow-2xl transition-all duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-[#902bd1] to-[#4fb0ff] rounded-full flex items-center justify-center mb-10 mx-auto group-hover:scale-110 transition-transform duration-500">
              <FiDollarSign size={56} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-[#902bd1] mb-6 text-center">Administrators</h3>
            <p className="text-gray-200 text-center text-lg leading-relaxed">
              Oversee AI-enhanced operations, manage users and events seamlessly, handle payments efficiently, and gain system-wide analytics to drive growth and optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Highlight */}
      <section className="container mx-auto px-6 py-20 md:py-32 bg-gradient-to-b from-transparent via-[#0a0a1f]/50 to-transparent">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#902bd1] to-[#00d0cb] bg-clip-text text-transparent">
          Core AI-Powered Functionalities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { icon: FiVideo, title: "Advanced Video Analysis", desc: "AI-driven breakdowns of performances, automatic tagging, pattern recognition, and tactical insights." },
            { icon: FiTrendingUp, title: "Performance Tracking & Analytics", desc: "Real-time metrics, predictive trends, and personalized development pathways powered by intelligent algorithms." },
            { icon: FiCalendar, title: "Smart Scheduling", desc: "AI-optimized agendas, match planning, and event coordination for maximum efficiency." },
            { icon: FaBrain, title: "Real-Time Feedback", desc: "Instant, data-backed coaching insights delivered seamlessly across the platform." },
            { icon: FiDollarSign, title: "Integrated Payment Management", desc: "Secure, streamlined handling of fees and subscriptions." },
            { icon: FiUser, title: "Intelligent Profiling", desc: "Dynamic player and coach profiles enriched with performance history and AI recommendations." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8 hover:border-[#0020c8]/70 transition-all duration-300">
              <feature.icon size={48} className="text-[#0020c8] mb-6" />
              <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;