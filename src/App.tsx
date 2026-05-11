import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Minus,
  MapPin,
  ChevronDown
} from 'lucide-react';

// --- Types ---
interface Facility {
  title: string;
  image: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Pass {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

// --- Constants ---
const MOTTO_WORDS = ['TRAIN', 'GRIND', 'WIN', 'RISE', 'GROW'];

const MARQUEE_ITEMS = [
  'Sports Performance', 
  'Basketball Training', 
  'Adult Boot Camps', 
  'Youth Athletics', 
  'Personal Training', 
  'Fitness Seminars', 
  'Nutrition Coaching'
];

import { ArrowUp } from 'lucide-react';

const FACILITIES: Facility[] = [
  { title: 'High-End Platform', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80' },
  { title: 'Warehouse Strength', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80' },
  { title: 'Performance Training', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80' },
  { title: 'Elite Athletics', image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80' },
  { title: 'Strength Zone', image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80' },
  { title: 'Elite Recovery', image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80' },
];

const SIGNATURE_SERVICES = [
  { title: 'Performance Lab', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80', desc: 'Elite sports training for every age.' },
  { title: 'Athlete Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80', desc: 'Premium athletic gear and apparel.' },
  { title: 'AlphaEats Cafe', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80', desc: 'Macro-friendly fuel and recovery.' },
];

const PASSES: Pass[] = [
  { 
    title: 'Athlete Day Pass', 
    price: '$29.99', 
    features: ['Access to all training zones', 'Recovery suite access', 'Certified coach on floor', 'Digital workout log'] 
  },
  { 
    title: 'Elite 3-Day Pass', 
    price: '$69.99', 
    features: ['Save $20', '3 Consecutive days', 'Includes 1 protein shake/day', 'Performance baseline assessment'],
    recommended: true 
  },
  { 
    title: 'Week Performance', 
    price: '$149.99', 
    features: ['Save $60', '7 Full days of access', 'Guest pass included', 'Priority booking for seminars'] 
  },
];

const FAQS: FAQItem[] = [
  { question: "Can a beginner train at Fit Lab USA?", answer: "Absolutely. We specialize in educating and elevating everyone we encounter, from youth starters to performance veterans." },
  { question: "What are the facility hours?", answer: "We are open Monday through Saturday, from 6:00 AM to 9:00 PM." },
  { question: "Is there a minimum age?", answer: "We train athletes as young as 6 years old in our specialized youth programs." },
  { question: "Do I need an appointment for a tour?", answer: "Walk-ins are welcome during business hours, but we recommend booking a tour online for a personalized experience." },
];

const TESTIMONIALS = [
  {
    name: "Marcus Thompson",
    age: "17 (D1 Commit)",
    achievement: "+4\" Vertical Jump",
    quote: "The environment at Fit Lab is unmatched. Coach Tristan doesn't just train your body; he changes your mindset. I wouldn't be signed without this facility.",
    image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Sarah Jenkins",
    age: "14 (Varsity Elite)",
    achievement: "40yd Dash -0.35s",
    quote: "I've been coming here since I was 10. The coaches make it fun but push you to your absolute limit. It's the best part of my day.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "David Rodriguez",
    age: "Professional Athlete",
    achievement: "Pro-Bowl Conditioning",
    quote: "Mansfield finally has a world-class performance center. The attention to detail and technology here rivals what I've seen in pro facilities.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

// --- Components ---

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-fl-gold text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-fl-gold-hover hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <ArrowUp size={24} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Sports & Events', href: '#facility' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Day Passes', href: '#passes' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-6">
      <div className={`container mx-auto max-w-7xl h-[64px] bg-fl-bg/90 backdrop-blur-xl border border-white/10 rounded-b-[20px] transition-all duration-500 flex items-center justify-between px-8 shadow-2xl`}>
        <a href="/" className="flex items-center gap-1 text-2xl font-display font-black tracking-tighter">
          <span>FIT LAB</span>
          <span className="text-fl-red">USA</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60 hover:text-white transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block bg-gradient-to-br from-fl-gold to-[#a18230] hover:from-[#d9b85c] hover:to-fl-gold text-black text-[11px] font-black uppercase tracking-widest px-8 py-[12px] rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all active:scale-95">
            Join Now
          </button>
          <button className="xl:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-fl-bg/95 backdrop-blur-2xl border border-white/10 xl:hidden p-10 rounded-[30px] shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-widest font-black text-white py-2 hover:text-fl-gold transition-colors">
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <button className="bg-fl-gold text-black text-[11px] font-black uppercase tracking-widest py-4 rounded-xl">
                Book a Tour
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MottoCycling = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOTTO_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[110px] md:h-[150px] lg:h-[180px] w-full mt-4 flex justify-center lg:justify-start overflow-visible">
      <AnimatePresence mode="wait">
        <motion.span
          key={MOTTO_WORDS[index]}
          initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -60, filter: 'blur(14px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute text-7xl md:text-8xl lg:text-[17vw] font-display font-black text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] leading-none select-none"
        >
          {MOTTO_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen pt-[120px] flex items-start overflow-hidden bg-cover bg-center"
      style={{ 
        backgroundImage: `url('ascent_background.png')`,
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-fl-bg via-transparent to-transparent z-0" />

      <div className="container relative z-10 px-6 mx-auto pt-[12vh]">
        <div className="max-w-6xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl md:text-3xl lg:text-4xl font-normal mb-4 text-center lg:text-left tracking-tight"
          >
            Mansfield's premier destination where athletes come to
          </motion.p>
          
          <MottoCycling />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          >
            <button className="bg-fl-gold hover:bg-fl-gold-hover text-black font-black uppercase tracking-widest px-12 py-5 transition-all text-sm rounded-[4px]">
              Start Training
            </button>
            <button className="text-white font-bold uppercase tracking-widest flex items-center gap-2 group text-sm">
              Explore Programs <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Down arrow */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const words = [
    "Founded in 2016, Fit Lab USA is more than a gym.",
    "We train athletes of every age — from 6 to pro — through small, consistent gains each and every day.",
    "We've built a world-class coaching environment right here in Mansfield, combining elite sports performance with a positive, energetic culture.",
    "Your ceiling is higher than you think. We'll help you reach it."
  ];

  return (
    <section ref={containerRef} className="py-32 bg-fl-bg px-6 overflow-hidden">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(3.2rem,8.5vw,8rem)] font-black text-white/80 mb-20 leading-[0.9] max-w-5xl"
        >
          A place built for champions.
        </motion.h2>

        <div className="max-w-6xl space-y-16">
          {words.map((chunk, i) => {
            const start = i * 0.12;
            const end = (i + 1) * 0.12 + 0.05;
            const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
            
            return (
              <motion.p 
                key={i}
                style={{ opacity }}
                className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.95] text-white tracking-tighter"
              >
                {chunk}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SignatureServices = () => {
  return (
    <section className="py-24 bg-fl-bg px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-16 italic tracking-tighter text-center">Signature Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIGNATURE_SERVICES.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-[40px] mb-6 border border-white/5 group-hover:border-fl-gold/20 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-700">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter mb-2">{service.title}</h3>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-32 bg-fl-bg2 border-y border-fl-border px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">Stay in focus.</h2>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">Join the community newsletter for updates & exclusive offers.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-fl-card border border-fl-border px-8 py-5 text-sm font-bold tracking-widest focus:outline-none focus:border-fl-red transition-all rounded-[12px]"
          />
          <button className="bg-fl-gold hover:bg-fl-gold-hover text-black font-black uppercase tracking-widest px-10 py-5 rounded-[12px] transition-all">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

interface FacilityCardProps {
  facility: Facility;
  index: number;
  key?: string | number;
}

const FacilityCard = ({ facility, index }: FacilityCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-square overflow-hidden bg-fl-card rounded-[20px] cursor-pointer border border-white/5 hover:border-fl-gold/20 hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-700"
    >
      <img 
        src={facility.image} 
        alt={facility.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
        <h3 className="text-xl md:text-2xl font-black text-white mb-2">{facility.title}</h3>
        <p className="text-xs uppercase tracking-widest text-fl-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          View Space <ArrowRight size={14} />
        </p>
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-fl-bg" id="facility">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-16 italic tracking-tighter">The Facility</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((fac, idx) => (
            <FacilityCard key={fac.title} facility={fac} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section className="py-24 bg-fl-bg px-6" id="passes">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-fl-gold font-black uppercase tracking-[0.3em] mb-4 text-xs">Access</p>
          <h2 className="text-4xl md:text-6xl font-black italic">Day Passes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PASSES.map((pass, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`relative p-10 rounded-[24px] border transition-all duration-500 overflow-hidden group ${
                pass.recommended 
                  ? 'bg-fl-gold text-black border-fl-gold shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:shadow-[0_0_80px_rgba(212,175,55,0.5)]' 
                  : 'bg-fl-card border-fl-border hover:border-fl-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]'
              }`}
            >
              {pass.recommended && (
                <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-black uppercase tracking-widest px-4 py-2">
                  Top Choice
                </div>
              )}
              <h3 className="text-2xl font-black mb-1 uppercase italic tracking-tighter">{pass.title}</h3>
              <p className="text-5xl font-black mb-10 italic leading-none">{pass.price}</p>
              
              <ul className="space-y-5 mb-12">
                {pass.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs font-bold leading-relaxed">
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pass.recommended ? 'text-black' : 'text-fl-gold'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full font-black uppercase tracking-[0.2em] py-5 transition-all text-xs rounded-[8px] ${
                pass.recommended ? 'bg-black text-white hover:bg-gray-900 shadow-2xl' : 'bg-fl-gold text-black hover:bg-fl-gold-hover'
              }`}>
                Secure Pass
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-fl-bg2 border-y border-fl-border relative overflow-hidden">
      {/* Decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] uppercase pointer-events-none italic tracking-tighter w-full text-center">
        Results
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-fl-red font-black uppercase tracking-[0.4em] mb-4 text-xs">Testimonials</p>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter underline decoration-fl-red decoration-4 transition-all">Athlete Stories</h2>
        </div>

        <div className="max-w-4xl mx-auto relative h-[450px] md:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="bg-fl-card/50 backdrop-blur-xl p-8 md:p-12 rounded-[32px] border border-fl-border flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-2 border-fl-red/30 p-1 md:w-40 md:h-40">
                <img src={TESTIMONIALS[index].image} alt="" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-4 h-4 bg-fl-gold clip-star" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
                    </motion.div>
                  )) }
                </div>
                <p className="text-xl md:text-2xl font-bold italic text-white mb-6 leading-relaxed">
                  "{TESTIMONIALS[index].quote}"
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h4 className="text-lg font-black uppercase text-fl-gold tracking-tighter">{TESTIMONIALS[index].name}</h4>
                  <span className="hidden md:block w-px h-4 bg-white/20" />
                  <span className="text-white/40 text-sm font-bold uppercase tracking-widest">{TESTIMONIALS[index].age}</span>
                  <span className="hidden md:block w-px h-4 bg-white/20" />
                  <span className="text-fl-red text-sm font-black uppercase tracking-widest">{TESTIMONIALS[index].achievement}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-fl-red' : 'w-2 bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrainersSection = () => {
  const trainers = [
    { name: "Coach Tristan", role: "Head Performance Architect", image: "coach_tristan.png" },
    { name: "Coach Elena", role: "Youth Athletic Development", image: "coach_elena.png" },
    { name: "Coach Mike", role: "Elite Strength & Conditioning", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-24 bg-fl-bg px-6" id="trainers">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <p className="text-fl-gold font-black uppercase tracking-[0.4em] mb-4 text-xs">Architects of Performance</p>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter decoration-fl-gold decoration-4">The Coaching Staff</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {trainers.map((trainer, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-[40px] mb-8 border border-white/5 transition-all duration-700 group-hover:border-fl-gold group-hover:shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-fl-gold transition-colors">{trainer.name}</h4>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mt-2">{trainer.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-fl-bg px-6" id="faq">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center italic tracking-tighter">Protocol FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-fl-border group">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-8 text-left hover:text-fl-gold transition-colors"
              >
                <span className="text-xl md:text-2xl font-black uppercase italic">{faq.question}</span>
                <div className={`transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}>
                  {openIdx === i ? <Minus className="text-fl-gold" /> : <Plus />}
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-white/50 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialGrid = () => {
  const images = [
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80"
  ];

  return (
    <section className="py-24 bg-fl-bg px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-fl-red font-black uppercase tracking-[0.4em] mb-4 text-xs">Community</p>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">#FitLabUSA</h2>
          </div>
          <button className="flex items-center gap-3 text-white/40 hover:text-white font-black uppercase tracking-widest text-xs transition-colors">
            Follow our journey <Instagram size={18} className="text-fl-red" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-[20px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
            >
              <img src={img} alt="Social Feed" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section className="py-32 bg-fl-bg border-t border-fl-border" id="contact">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <p className="text-fl-red font-black uppercase tracking-[0.4em] mb-4 text-xs">Mansfield Headquarters</p>
            <h2 className="text-5xl md:text-7xl font-black mb-10">
              Elevate your <br />
              <span className="text-fl-gold italic">game here.</span>
            </h2>
            <div className="space-y-10 group">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-fl-red/10 flex items-center justify-center text-fl-red shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm mb-2 tracking-widest">Base of Operations</h4>
                  <p className="text-white/60 text-lg leading-relaxed">650 US-287 Frontage Rd, Suite 150 <br />Mansfield, TX 76063</p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/S8LiFVsmcfdMiaGj7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-white font-black uppercase tracking-[0.2em] text-xs group-hover:text-fl-gold transition-colors"
              >
                Get Directions <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-1 w-full h-[500px] bg-white/5 rounded-[40px] overflow-hidden border border-fl-border grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.0232431718223!2d-97.1065476!3d32.5521453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e899999999999%3A0x7777777777777777!2sFit%20Lab%20USA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const RedMarquee = () => {
  return (
    <div className="bg-fl-red py-4 overflow-hidden relative z-10 border-y border-white/10 shadow-2xl">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <div key={i} className="flex items-center mx-12">
            <span className="text-white text-lg md:text-2xl font-display font-black uppercase italic tracking-wider">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white ml-24 opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};

const GrandCTA = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-fl-bg">
      <img src="ascent_background.png" alt="Fit Lab Team" className="absolute inset-0 w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-b from-fl-bg via-transparent to-fl-bg" />
      <div className="container relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[clamp(3.5rem,10vw,10rem)] font-black leading-[0.9] italic uppercase tracking-tighter mb-12">
            START YOUR <br />
            <span className="text-fl-red">ASCENT.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-fl-gold hover:bg-fl-gold-hover text-black font-black uppercase tracking-widest px-16 py-6 transition-all text-sm rounded-full">
              JOIN THE LAB
            </button>
            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">650 US-287 FRONTAGE RD, MANSFIELD</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const Footer = () => (
  <footer className="bg-fl-bg pt-32 pb-12 px-6 border-t border-fl-border">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
        <div className="max-w-xl">
          <a href="/" className="text-4xl font-display font-black tracking-tighter mb-8 block">
            FIT LAB <span className="text-fl-red">USA</span>
          </a>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            Leading the way in sports performance training since 2016. Mansfield's home for elite athletes and those who strive to educate, encourage and elevate everyone we encounter.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full border border-fl-border flex items-center justify-center text-white/40 hover:text-white hover:bg-fl-red hover:border-fl-red transition-all duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-16">
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-8">Facility</h5>
            <ul className="space-y-4">
              {['Programs', 'Trainers', 'Day Passes', 'Schedule'].map(item => (
                <li key={item}><a href="#" className="text-white/60 hover:text-fl-gold transition-colors text-sm font-bold">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-8">Support</h5>
            <ul className="space-y-4">
              {['Contact Us', 'FAQ', 'Waivers', 'Privacy'].map(item => (
                <li key={item}><a href="#" className="text-white/60 hover:text-fl-gold transition-colors text-sm font-bold">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-fl-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-black tracking-[0.4em] text-white/20 text-center">
        <p>© 2026 FIT LAB USA | PRODUCED IN MANSFIELD, TX</p>
        <p>NO LIMITS. NO EXCUSES. ELEVATE YOUR GAME.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="bg-fl-bg selection:bg-fl-red selection:text-white">
      <ScrollToTop />
      <Navbar />
      <Hero />
      <RedMarquee />
      <BrandStory />
      <BentoGrid />
      <SignatureServices />
      <TestimonialsSection />
      <TrainersSection />
      <PricingSection />
      <FAQSection />
      
      {/* Visual Quote Section */}
      <section className="h-[70vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80" 
          alt="Athlete Focus"
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fl-bg to-transparent flex items-center p-6 md:p-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl md:text-[clamp(3.5rem,8vw,6rem)] font-black leading-none mb-8">
              DREAM MORE.<br />
              GROW MORE.<br />
              <span className="text-fl-gold italic">FIT LAB USA.</span>
            </h2>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-sm">Empowering Mansfield's Elite Athletes Since '16</p>
          </motion.div>
        </div>
      </section>

      <LocationSection />
      <GrandCTA />
      <SocialGrid />
      <Newsletter />
      <Footer />
    </main>
  );
}
