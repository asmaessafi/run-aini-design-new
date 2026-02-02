

import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight, FiPlay, FiUsers, FiClipboard, FiTarget, FiActivity, FiCloud, FiLock } from 'react-icons/fi';

const FootballMarquee = () => {
  const teams = [
    { id: 1, name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
    { id: 2, name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
    { id: 3, name: 'Manchester United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' },
    { id: 4, name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
    { id: 5, name: 'Esperance Sportive', logo: 'https://images.seeklogo.com/logo-png/4/2/esperance-sportive-de-tunis-logo-png_seeklogo-49164.png' },
  ];

  const duplicatedTeams = [...teams, ...teams, ...teams];

  return (
    <div className="relative overflow-hidden py-10 md:py-14">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedTeams.map((team, index) => (
          <motion.div
            key={`${team.id}-${index}`}
            className="inline-flex flex-col items-center mx-8 md:mx-12 lg:mx-16"
            whileHover={{ scale: 1.15, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 p-3 shadow-xl hover:border-[#00d0cb]/60 transition-all duration-400">
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-contain filter drop-shadow-2xl"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-base md:text-lg font-semibold bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
              {team.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent";

  const accentColors = ['#902bd1', '#00d0cb', '#4fb0ff'];

  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
      }}
    >
      {/* Stronger ambient glow layers */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,#902bd140,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,#00d0cb35,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4fb0ff20,transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-[#902bd1]/8 via-[#00d0cb]/8 to-transparent"
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black pb-4 mb-10 ${gradientText} drop-shadow-[0_12px_40px_rgba(144,43,209,0.45)]`}
          >
            Football Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-16 font-light"
          >
            AI-powered platform combining advanced analytics, team management, and player development tools for modern football organizations
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10">
            <motion.div whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/signup"
                className={`inline-flex items-center gap-4 px-12 py-6 rounded-2xl font-bold text-xl bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] text-white shadow-2xl shadow-[#902bd1]/40 hover:brightness-110 hover:shadow-[#00d0cb]/50 transition-all duration-400`}
              >
                <FiArrowRight className="text-2xl" />
                Start Free Trial
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/demo"
                className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl font-bold text-xl bg-gray-900/80 backdrop-blur-2xl border-2 border-gray-700/50 hover:border-[#00d0cb]/70 text-white shadow-xl hover:shadow-[#00d0cb]/30 transition-all duration-400"
              >
                <FiPlay className="text-2xl" />
                Interactive Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted by / Marquee */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 pb-4 ${gradientText}`}
          >
            Trusted by Elite Clubs
          </motion.h2>

          <FootballMarquee />
        </div>
      </section>

      {/* Three Pillars */}
      <section ref={ref} className="relative py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-5xl md:text-6xl lg:text-7xl font-black text-center mb-24 ${gradientText}`}
          >
            Comprehensive Platform
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                title: "Administration Suite",
                icon: FiUsers,
                color: "#902bd1",
                features: [
                  "Player Database Management",
                  "Financial Tracking & Reporting",
                  "Advanced Access Controls",
                  "Team Scheduling & Logistics"
                ],
                stats: "250+ Clubs Managed"
              },
              {
                title: "Coaching Intelligence",
                icon: FiClipboard,
                color: "#00d0cb",
                features: [
                  "AI Training Recommendations",
                  "Video Analysis Suite",
                  "Real-time Performance Dashboards",
                  "Player Development Tracking"
                ],
                stats: "10k+ Sessions Analyzed"
              },
              {
                title: "Player Portal",
                icon: FiTarget,
                color: "#4fb0ff",
                features: [
                  "Personal Performance Metrics",
                  "Custom Training Programs",
                  "Video Feedback System",
                  "Biometric Progress Tracking"
                ],
                stats: "45% Average Improvement"
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.9 }}
                className={`group relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl p-10 border-2 border-gray-700/50 hover:border-[${pillar.color}]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[${pillar.color}]/20`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-[${pillar.color}]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />

                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[${pillar.color}]/30 via-[${pillar.color}]/20 to-transparent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <pillar.icon className="w-12 h-12" style={{ color: pillar.color }} />
                </div>

                <h3 className={`text-3xl md:text-4xl font-black mb-8 ${gradientText}`}>
                  {pillar.title}
                </h3>

                <ul className="space-y-5 mb-10">
                  {pillar.features.map((feature, idx) => (
                    <li
                      key={feature}
                      className="flex items-center gap-4 text-gray-100 text-lg"
                    >
                      <div className={`w-3 h-3 rounded-full bg-[${accentColors[idx % 3]}] shadow-sm`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`text-lg font-extrabold tracking-wide bg-gradient-to-r from-[${pillar.color}] to-[#4fb0ff] bg-clip-text text-transparent`}>
                  {pillar.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Insights */}
      <section className="relative py-28 bg-gradient-to-b from-transparent via-[#0a0f2a]/70 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black ${gradientText} drop-shadow-lg pb-3`}>
                AI-Powered Insights
              </h2>

              {[
                {
                  icon: FiActivity,
                  title: "Real-time Match Analysis",
                  desc: "Live tracking of 25+ performance metrics including passes, shots, tackles, and positioning with automatic heatmap generation.",
                  color: "#902bd1"
                },
                {
                  icon: FiCloud,
                  title: "Cloud Video Library",
                  desc: "Secure storage and analysis of match footage with AI-powered highlight detection and collaborative annotation tools.",
                  color: "#00d0cb"
                },
                {
                  icon: FiLock,
                  title: "Military-grade Security",
                  desc: "End-to-end encryption, GDPR compliance, and role-based access controls to protect sensitive team data.",
                  color: "#4fb0ff"
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className={`p-8 bg-gray-900/75 backdrop-blur-2xl rounded-3xl border border-gray-700/50 hover:border-[${item.color}]/60 transition-all duration-400 group hover:shadow-2xl hover:shadow-[${item.color}]/20`}
                >
                  <div className="flex items-center gap-6 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-[${item.color}]/30 to-transparent flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-10 h-10" style={{ color: item.color }} />
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[${item.color}] to-[#4fb0ff] bg-clip-text text-transparent group-hover:brightness-110 transition-all`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border-2 border-gray-700/60 bg-gray-950/70 backdrop-blur-2xl shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#902bd1]/12 via-[#00d0cb]/12 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="p-12 bg-gradient-to-br from-[#902bd1]/25 via-[#00d0cb]/20 to-transparent backdrop-blur-2xl rounded-full border border-[#00d0cb]/40 shadow-2xl"
                >
                  <FiPlay className="w-24 h-24 text-white drop-shadow-xl" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { metric: "Player Progress", value: "↑62%", desc: "Average performance improvement" },
              { metric: "Analysis Speed", value: "10×", desc: "Faster than traditional methods" },
              { metric: "Data Points", value: "1M+", desc: "Collected per match" },
              { metric: "Accuracy", value: "98.7%", desc: "AI prediction rate" }
            ].map((stat, i) => (
              <motion.div
                key={stat.metric}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`p-10 bg-gray-900/80 backdrop-blur-2xl rounded-3xl border-2 border-gray-700/50 hover:border-[#00d0cb]/60 transition-all duration-400 hover:shadow-2xl hover:shadow-[#00d0cb]/20 text-center`}
              >
                <div className={`text-6xl md:text-7xl font-black mb-4 ${gradientText} drop-shadow-lg`}>
                  {stat.value}
                </div>
                <div className="text-2xl font-bold mb-3 text-white">
                  {stat.metric}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;