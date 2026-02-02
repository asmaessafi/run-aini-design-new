
// import React, { useState } from 'react';
// import { FiCheck, FiArrowRight, FiStar, FiZap, FiGlobe, FiActivity } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.12 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 28 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
// };

// const cardHover = {
//   rest: { y: 0, scale: 1 },
//   hover: { y: -10, scale: 1.03, transition: { duration: 0.4 } }
// };

// const PricingPage = () => {
//   const [activeTab, setActiveTab] = useState('monthly');

//   const plans = [
//     {
//       name: "Starter",
//       icon: <FiStar />,
//       monthlyPrice: "67.75",
//       annualPrice: "610.00",
//       features: [
//         "Full-time Analytics",
//         "Full Interactive Dashboard",
//         "Search Theory Features",
//         "Community Advisor Access"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       icon: <FiZap />,
//       monthlyPrice: "169.38",
//       annualPrice: "1,525.00",
//       features: [
//         "Full-time Analytics",
//         "Advanced Search Theory",
//         "Priority Community Advisor",
//         "Custom Reporting",
//         "API Access"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       icon: <FiGlobe />,
//       monthlyPrice: "Custom",
//       annualPrice: "Custom",
//       features: [
//         "All Professional Features",
//         "Dedicated Account Manager",
//         "White-label Solutions",
//         "On-premise Deployment",
//         "24/7 Premium Support",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   const faqs = [
//     "How do I create an account?",
//     "Which product is right for me? (Digitize or Write a Nexus?)",
//     "How can I contact the support team?",
//     "Can I integrate with Windows software and workflows?",
//     "Where can I find the Working Center?",
//     "Where can I download PlayStore and/or Vehicle Nexus?"
//   ];

//   const testimonials = [
//     {
//       quote: "In 12 months, our team has seen practical improvements in game analysis accuracy and player performance tracking.",
//       author: "Amen",
//       company: "Active Media Ltd.",
//       rating: 5
//     },
//     {
//       quote: "RUNAINI helps improve service delivery and manage resources with high quality analytics, helping us navigate complex game strategies.",
//       author: "Chemical",
//       company: "Sports Analytics Group",
//       rating: 4
//     },
//     {
//       quote: "The platform offers comprehensive tools for all our coaching activities. We're able to work with players effectively as they develop.",
//       author: "Environmental Services",
//       company: "Carbon Protection Agency",
//       rating: 5
//     },
//     {
//       quote: "RUNAINI is driving analytics across our organization and has significantly impacted our scouting and player development capabilities.",
//       author: "Development",
//       company: "Health & Performance Institute",
//       rating: 5
//     }
//   ];

//   const insights = [
//     {
//       title: "Customer Manager",
//       items: ["Customer Analytics", "Client Marketing", "Product Performance"]
//     },
//     {
//       title: "Health Service",
//       items: ["Medical Analytics", "Environmental Services", "Financial & Social Insights"]
//     },
//     {
//       title: "Regulatory",
//       items: ["Healthcare Compliance", "ICT Telefonservices", "Regulatory Frameworks"]
//     }
//   ];

//   const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent";

//   return (
//     <motion.div
//       className="min-h-screen bg-black text-white relative overflow-hidden"
//       style={{
//         background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
//       }}
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* Ambient brand glows */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,#902bd130,transparent_60%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,#00d0cb25,transparent_65%)]" />
//       </div>

//       {/* Hero */}
//       <section className="relative py-32 md:py-40 px-6 text-center">
//         <div className="max-w-6xl mx-auto relative z-10">
//           <motion.h1
//             variants={itemVariants}
//             className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 ${gradientText}`}
//           >
//             RUNAINI Pricing
//           </motion.h1>
//           <motion.p
//             variants={itemVariants}
//             className="text-xl md:text-2xl text-white-100 max-w-4xl mx-auto leading-relaxed"
//           >
//             Advanced analytics solutions designed for teams of all sizes.
//             Choose the perfect plan to elevate your performance analysis.
//           </motion.p>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="py-16 px-6 relative z-10">
//         <div className="max-w-7xl mx-auto">
//           {/* Toggle */}
//           <motion.div variants={itemVariants} className="flex justify-center mb-16">
//             <div className="inline-flex bg-gray-900/60 backdrop-blur-xl rounded-full p-1.5 border border-gray-700/40 shadow-2xl">
//               <button
//                 className={`px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 ${
//                   activeTab === 'monthly'
//                     ? `bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] text-white shadow-lg shadow-[#902bd1]/30`
//                     : 'text-white-300 hover:text-white hover:bg-gray-800/40'
//                 }`}
//                 onClick={() => setActiveTab('monthly')}
//               >
//                 Monthly Billing
//               </button>
//               <button
//                 className={`px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 ${
//                   activeTab === 'annual'
//                     ? `bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] text-white shadow-lg shadow-[#902bd1]/30`
//                     : 'text-white-300 hover:text-white hover:bg-gray-800/40'
//                 }`}
//                 onClick={() => setActiveTab('annual')}
//               >
//                 Annual Billing <span className="text-[#902bd1] font-bold">(Save 15%)</span>
//               </button>
//             </div>
//           </motion.div>

//           {/* Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
//             {plans.map((plan, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 initial="rest"
//                 whileHover="hover"
//                 variants={cardHover}
//                 className={`group relative bg-gray-900/70 backdrop-blur-xl rounded-3xl border transition-all duration-400 overflow-hidden ${
//                   plan.popular
//                     ? 'border-[#902bd1]/60 shadow-2xl shadow-[#902bd1]/25 scale-[1.04] md:scale-[1.08] z-10'
//                     : 'border-gray-700/50 hover:border-gray-500'
//                 }`}
//               >
//                 {plan.popular && (
//                   <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${gradientText} bg-black/60 backdrop-blur-md px-7 py-2 rounded-full text-sm font-bold shadow-xl border border-gray-700/60`}>
//                     MOST POPULAR
//                   </div>
//                 )}

//                 <div className="p-8 md:p-10">
//                   <div className="flex justify-center mb-8">
//                     <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#902bd1]/20 via-[#00d0cb]/10 to-transparent flex items-center justify-center text-5xl transition-transform group-hover:scale-110 duration-500 ${plan.popular ? 'text-[#00d0cb]' : 'text-[#902bd1]'}`}>
//                       {plan.icon}
//                     </div>
//                   </div>

//                   <h3 className={`text-4xl md:text-5xl font-extrabold text-center mb-6 ${gradientText}`}>
//                     {plan.name}
//                   </h3>

//                   <div className="text-center mb-10">
//                     <span className="text-6xl md:text-7xl font-black tracking-tight" style={{ color: plan.popular ? '#00d0cb' : '#902bd1' }}>
//                       {plan.name === "Enterprise" ? "Custom" : (
//                         <>
//                           ${activeTab === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
//                         </>
//                       )}
//                     </span>
//                     {plan.name !== "Enterprise" && (
//                       <div className="text-gray-200 mt-2 text-xl">
//                         per {activeTab === 'monthly' ? 'month' : 'year'}
//                       </div>
//                     )}
//                   </div>

//                   <ul className="space-y-5 mb-12 text-lg">
//                     {plan.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-white-200">
//                         <FiCheck className="text-[#00d0cb] mr-4 text-2xl flex-shrink-0" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>

//                   <motion.button
//                     className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${
//                       plan.popular
//                         ? `bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] hover:brightness-110 text-white shadow-[#902bd1]/40`
//                         : 'bg-gray-800/70 hover:bg-gray-700/80 border border-gray-600 hover:border-[#00d0cb]/60 text-white'
//                     }`}
//                     whileHover={{ scale: 1.04 }}
//                     whileTap={{ scale: 0.97 }}
//                   >
//                     {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-24 px-6 relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <h2 className={`text-5xl md:text-6xl font-extrabold mb-4 ${gradientText}`}>
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-white-300 max-w-3xl mx-auto">
//               Everything you need to know about RUNAINI plans and features
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
//             {faqs.map((question, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-gray-900/65 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 hover:border-[#00d0cb]/50 transition-all hover:shadow-xl"
//               >
//                 <h3 className="text-2xl font-bold mb-5 flex items-start gap-5">
//                   <span className="bg-[#902bd1]/30 text-[#902bd1] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
//                     {index + 1}
//                   </span>
//                   {question}
//                 </h3>
//                 <p className="text-white-300 pl-14 leading-relaxed">
//                   {question.includes("account")
//                     ? "Signing up is quick and easy. Click 'Get Started' on any plan to begin your registration."
//                     : question.includes("right for me")
//                       ? "Our solutions team can help determine the best option based on your team size, sport, and analytics needs."
//                       : question.includes("support")
//                         ? "Our support team is available 24/7 through chat, email, or scheduled video consultations."
//                         : question.includes("Windows")
//                           ? "RUNAINI integrates seamlessly with Windows workflows through our comprehensive API."
//                           : question.includes("Working Center")
//                             ? "The Working Center is accessible through our web portal under the 'Resources' section."
//                             : "Our mobile apps are available on both iOS App Store and Google Play Store."}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-24 px-6 relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <h2 className={`text-5xl md:text-6xl font-extrabold mb-4 ${gradientText}`}>
//               Trusted by Elite Teams
//             </h2>
//             <p className="text-xl text-white-300 max-w-3xl mx-auto">
//               Hear from sports organizations transforming their performance with RUNAINI
//             </p>
//           </motion.div>

//           <div className="relative overflow-hidden py-12">
//             <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
//             <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

//             <div className="animate-marquee whitespace-nowrap flex">
//               {[...testimonials, ...testimonials].map((testimonial, index) => (
//                 <motion.div
//                   key={`${testimonial.author}-${index}`}
//                   className="flex-shrink-0 mx-8 w-[480px] max-w-[90vw]"
//                   whileHover={{ scale: 1.04, y: -8 }}
//                 >
//                   <div className="bg-gray-900/70 backdrop-blur-xl p-10 rounded-3xl border border-gray-700/50 hover:border-[#00d0cb]/50 transition-all shadow-xl relative overflow-hidden">
//                     <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#902bd1]/10 rounded-full blur-3xl" />
//                     <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#00d0cb]/10 rounded-full blur-3xl" />

//                     <div className="relative z-10">
//                       <div className="flex items-start mb-8">
//                         <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#902bd1]/30 to-[#00d0cb]/20 flex items-center justify-center flex-shrink-0">
//                           <span className="text-3xl font-bold text-white">
//                             {testimonial.author.charAt(0)}
//                           </span>
//                         </div>
//                         <div className="ml-6 flex-1">
//                           <div className="flex justify-between items-start flex-wrap gap-4">
//                             <div>
//                               <h4 className="font-bold text-2xl text-white">{testimonial.author}</h4>
//                               <p className="text-[#00d0cb] text-base mt-1">{testimonial.company}</p>
//                             </div>
//                             <div className="flex text-[#00d0cb]">
//                               {[...Array(5)].map((_, i) => (
//                                 <FiStar
//                                   key={i}
//                                   size={22}
//                                   className={`flex-shrink-0 ${i < testimonial.rating ? "fill-current" : ""}`}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:bg-gradient-to-b before:from-[#902bd1] before:to-[#00d0cb] before:rounded-full">
//                         <p className="text-gray-200 text-lg leading-relaxed italic">
//                           "{testimonial.quote}"
//                         </p>
//                       </div>

//                       <div className="mt-8 flex justify-end">
//                         <span className="inline-flex items-center bg-gray-800/60 px-5 py-2 rounded-full text-sm font-medium text-[#00d0cb] border border-[#00d0cb]/30">
//                           <FiActivity className="mr-2 text-lg" />
//                           RUNAINI Platform
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Insights Section */}
//       <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#0a0f2a]/60 to-transparent relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <h2 className={`text-5xl md:text-6xl font-extrabold mb-4 ${gradientText}`}>
//               Latest Insights
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Discover the latest research, trends, and innovations in sports analytics.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {insights.map((insight, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-gray-900/65 backdrop-blur-xl p-9 rounded-3xl border border-gray-700/50 hover:border-[#00d0cb]/60 transition-all hover:shadow-xl"
//               >
//                 <h3 className="text-3xl font-bold mb-6 flex items-center gap-4 text-white">
//                   <FiArrowRight className="text-[#00d0cb] text-3xl" />
//                   {insight.title}
//                 </h3>
//                 <ul className="space-y-5">
//                   {insight.items.map((item, idx) => (
//                     <li key={idx} className="flex items-center text-gray-200 text-lg hover:text-white transition-colors">
//                       <span className="w-3.5 h-3.5 bg-[#902bd1] rounded-full mr-5 flex-shrink-0" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </motion.div>
//   );
// };

// export default PricingPage;

import React, { useState } from 'react';
import { FiCheck, FiArrowRight, FiStar, FiZap, FiGlobe, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } }
};

const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -12, scale: 1.035, transition: { duration: 0.45 } }
};

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('monthly');

  const plans = [
    {
      name: "Starter",
      icon: <FiStar />,
      monthlyPrice: "67.75",
      annualPrice: "610.00",
      features: [
        "Full-time Analytics",
        "Full Interactive Dashboard",
        "Search Theory Features",
        "Community Advisor Access"
      ],
      popular: false
    },
    {
      name: "Professional",
      icon: <FiZap />,
      monthlyPrice: "169.38",
      annualPrice: "1,525.00",
      features: [
        "Full-time Analytics",
        "Advanced Search Theory",
        "Priority Community Advisor",
        "Custom Reporting",
        "API Access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      icon: <FiGlobe />,
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      features: [
        "All Professional Features",
        "Dedicated Account Manager",
        "White-label Solutions",
        "On-premise Deployment",
        "24/7 Premium Support",
        "Custom Integrations"
      ],
      popular: false
    }
  ];

  const faqs = [
    "How do I create an account?",
    "Which product is right for me? (Digitize or Write a Nexus?)",
    "How can I contact the support team?",
    "Can I integrate with Windows software and workflows?",
    "Where can I find the Working Center?",
    "Where can I download PlayStore and/or Vehicle Nexus?"
  ];

  const testimonials = [
    {
      quote: "In 12 months, our team has seen practical improvements in game analysis accuracy and player performance tracking.",
      author: "Amen",
      company: "Active Media Ltd.",
      rating: 5
    },
    {
      quote: "RUNAINI helps improve service delivery and manage resources with high quality analytics, helping us navigate complex game strategies.",
      author: "Chemical",
      company: "Sports Analytics Group",
      rating: 4
    },
    {
      quote: "The platform offers comprehensive tools for all our coaching activities. We're able to work with players effectively as they develop.",
      author: "Environmental Services",
      company: "Carbon Protection Agency",
      rating: 5
    },
    {
      quote: "RUNAINI is driving analytics across our organization and has significantly impacted our scouting and player development capabilities.",
      author: "Development",
      company: "Health & Performance Institute",
      rating: 5
    }
  ];

  const insights = [
    {
      title: "Customer Manager",
      items: ["Customer Analytics", "Client Marketing", "Product Performance"]
    },
    {
      title: "Health Service",
      items: ["Medical Analytics", "Environmental Services", "Financial & Social Insights"]
    },
    {
      title: "Regulatory",
      items: ["Healthcare Compliance", "ICT Telefonservices", "Regulatory Frameworks"]
    }
  ];

  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent";

  const accentColors = ['#902bd1', '#00d0cb', '#4fb0ff'];

  return (
    <motion.div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Stronger ambient brand glows */}
      <div className="absolute inset-0 opacity-18 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,#902bd140,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,#00d0cb35,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4fb0ff20,transparent_70%)]" />
      </div>

      {/* Hero */}
      <section className="relative py-32 md:py-44 px-6 text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            variants={itemVariants}
            className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 pb-3 ${gradientText} drop-shadow-[0_8px_32px_rgba(144,43,209,0.4)]`}
          >
            RUNAINI Pricing
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Advanced analytics solutions designed for teams of all sizes.<br />
            Choose the perfect plan to elevate your performance analysis.
          </motion.p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Toggle */}
          <motion.div variants={itemVariants} className="flex justify-center mb-20">
            <div className="inline-flex bg-gray-900/80 backdrop-blur-2xl rounded-full p-1.5 border border-gray-700/50 shadow-2xl shadow-black/60">
              <button
                className={`px-9 py-4.5 rounded-full text-lg font-semibold transition-all duration-400 ${
                  activeTab === 'monthly'
                    ? 'bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] text-white shadow-xl shadow-[#902bd1]/40 scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                }`}
                onClick={() => setActiveTab('monthly')}
              >
                Monthly Billing
              </button>
              <button
                className={`px-9 py-4.5 rounded-full text-lg font-semibold transition-all duration-400 ${
                  activeTab === 'annual'
                    ? 'bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] text-white shadow-xl shadow-[#902bd1]/40 scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                }`}
                onClick={() => setActiveTab('annual')}
              >
                Annual Billing <span className="text-[#902bd1] font-extrabold">(Save 15%)</span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className={`group relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl border-2 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/40 ${
                  plan.popular
                    ? 'border-[#00d0cb]/70 shadow-[#00d0cb]/35 scale-[1.06] md:scale-[1.10] ring-1 ring-[#902bd1]/40 z-10'
                    : 'border-gray-700/60 hover:border-[#4fb0ff]/50 hover:shadow-[#4fb0ff]/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className={`px-5 py-2 md:px-8 md:py-2.5 rounded-full text-sm font-extrabold tracking-wide
                      bg-gradient-to-r from-[#902bd1]/90 via-[#00d0cb]/85 to-[#4fb0ff]/80
                      text-white shadow-2xl shadow-[#902bd1]/50 border border-[#00d0cb]/40
                      backdrop-blur-lg`}>
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8 md:p-10">
                  <div className="flex justify-center mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#902bd1]/25 via-[#00d0cb]/15 to-transparent 
                      flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-115 
                      ${plan.popular ? 'text-[#00d0cb]' : 'text-[#902bd1]'}`}>
                      {plan.icon}
                    </div>
                  </div>

                  <h3 className={` text-4xl md:text-4xl font-black text-center mb-6 tracking-tight ${gradientText}`}>
                    {plan.name}
                  </h3>

                  <div className="text-center mb-10">
                    <span className={`text-7xl md:text-7xl font-black tracking-tighter bg-gradient-to-br  ${
                      plan.popular
                        ? 'from-[#00d0cb] via-[#4fb0ff] to-[#902bd1]'
                        : 'from-[#902bd1] via-[#00d0cb] to-[#4fb0ff]'
                    } bg-clip-text text-transparent drop-shadow-lg  `}>
                      {plan.name === "Enterprise" ? "Custom" : (
                        <>
                          ${activeTab === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                        </>
                      )}
                    </span>
                    {plan.name !== "Enterprise" && (
                      <div className="text-gray-300 mt-2 text-xl font-light">
                        per {activeTab === 'monthly' ? 'month' : 'year'}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-5 mb-12 text-lg">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-gray-100">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                          bg-gradient-to-br from-[${accentColors[idx % 3]}]/25 to-transparent
                          border border-[${accentColors[idx % 3]}]/30 shadow-sm`}>
                          <FiCheck className={`text-[${accentColors[idx % 3]}] text-xl`} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-6 rounded-2xl font-bold text-xl tracking-wide transition-all duration-400 shadow-2xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] hover:brightness-110 hover:shadow-[#00d0cb]/50 text-white'
                        : 'bg-gray-800/80 border border-gray-600 hover:border-[#902bd1]/70 hover:bg-gray-700/90 hover:shadow-[#902bd1]/30 text-white'
                    }`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-5 tracking-tight ${gradientText}`}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about RUNAINI plans and features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((question, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/75 backdrop-blur-2xl p-9 rounded-3xl border border-gray-700/50 hover:border-[#4fb0ff]/50 transition-all duration-400 hover:shadow-2xl hover:shadow-[#4fb0ff]/15"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-start gap-5">
                  <span className="bg-gradient-to-br from-[#902bd1]/40 to-[#00d0cb]/30 text-white w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-2xl shadow-md">
                    {index + 1}
                  </span>
                  {question}
                </h3>
                <p className="text-gray-200 pl-16 leading-relaxed">
                  {question.includes("account")
                    ? "Signing up is quick and easy. Click 'Get Started' on any plan to begin your registration."
                    : question.includes("right for me")
                      ? "Our solutions team can help determine the best option based on your team size, sport, and analytics needs."
                      : question.includes("support")
                        ? "Our support team is available 24/7 through chat, email, or scheduled video consultations."
                        : question.includes("Windows")
                          ? "RUNAINI integrates seamlessly with Windows workflows through our comprehensive API."
                          : question.includes("Working Center")
                            ? "The Working Center is accessible through our web portal under the 'Resources' section."
                            : "Our mobile apps are available on both iOS App Store and Google Play Store."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-extrabold mb-4 ${gradientText}`}>
              Trusted by Elite Teams
            </h2>
            <p className="text-xl text-white-300 max-w-3xl mx-auto">
              Hear from sports organizations transforming their performance with RUNAINI
            </p>
          </motion.div>

          <div className="relative overflow-hidden py-12">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee whitespace-nowrap flex">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.author}-${index}`}
                  className="flex-shrink-0 mx-8 w-[480px] max-w-[90vw]"
                  whileHover={{ scale: 1.04, y: -8 }}
                >
                  <div className="bg-gray-900/70 backdrop-blur-xl p-10 rounded-3xl border border-gray-700/50 hover:border-[#00d0cb]/50 transition-all shadow-xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#902bd1]/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#00d0cb]/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-start mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#902bd1]/30 to-[#00d0cb]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-3xl font-bold text-white">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex justify-between items-start flex-wrap gap-4">
                            <div>
                              <h4 className="font-bold text-2xl text-white">{testimonial.author}</h4>
                              <p className="text-[#00d0cb] text-base mt-1">{testimonial.company}</p>
                            </div>
                            <div className="flex text-[#00d0cb]">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  size={22}
                                  className={`flex-shrink-0 ${i < testimonial.rating ? "fill-current" : ""}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:bg-gradient-to-b before:from-[#902bd1] before:to-[#00d0cb] before:rounded-full">
                        <p className="text-gray-200 text-lg leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <span className="inline-flex items-center bg-gray-800/60 px-5 py-2 rounded-full text-sm font-medium text-[#00d0cb] border border-[#00d0cb]/30">
                          <FiActivity className="mr-2 text-lg" />
                          RUNAINI Platform
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#0a0f2a]/60 to-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-extrabold mb-4 pb-2 ${gradientText}`}>
              Latest Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the latest research, trends, and innovations in sports analytics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/65 backdrop-blur-xl p-9 rounded-3xl border border-gray-700/50 hover:border-[#00d0cb]/60 transition-all hover:shadow-xl"
              >
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-4 text-white">
                  <FiArrowRight className="text-[#00d0cb] text-3xl" />
                  {insight.title}
                </h3>
                <ul className="space-y-5">
                  {insight.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-200 text-lg hover:text-white transition-colors">
                      <span className="w-3.5 h-3.5 bg-[#902bd1] rounded-full mr-5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PricingPage;