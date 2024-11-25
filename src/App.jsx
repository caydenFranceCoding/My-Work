import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Mail, Linkedin, Code, Monitor, Database, Home, Briefcase, MessageSquare, Sun, Moon, User } from 'lucide-react';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return [theme, setTheme];
};

const NavTab = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400 hover:bg-white/10'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm">{label}</span>
  </motion.button>
);

const ThemeToggle = ({ theme, setTheme }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="fixed top-8 right-8 z-50 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-lg border border-white/10"
  >
    {theme === 'dark' ? (
      <Sun className="w-5 h-5 text-yellow-400" />
    ) : (
      <Moon className="w-5 h-5 text-gray-400" />
    )}
  </motion.button>
);

const FuturisticPortfolio = () => {
  const [theme, setTheme] = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message. Please try again.');
  }
};

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
      onMouseMove={handleMouseMove}
    >
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-2 ${
        theme === 'dark' ? 'bg-black/50' : 'bg-white/50'
      } backdrop-blur-lg rounded-2xl border ${
        theme === 'dark' ? 'border-white/10' : 'border-black/10'
      }`}>
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'about', icon: User, label: 'About' },
          { id: 'projects', icon: Briefcase, label: 'Projects' },
          { id: 'contact', icon: MessageSquare, label: 'Contact' },
        ].map((item) => (
          <NavTab
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSection === item.id}
            onClick={() => scrollToSection(item.id)}
          />
        ))}
      </nav>

      <motion.div
        className={`fixed top-0 left-0 right-0 h-0.5 z-50 ${theme === 'dark' ? 'bg-cyan-500' : 'bg-blue-500'}`}
        style={{ scaleX, transformOrigin: "0%" }}
      />

      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,213,255,0.1),rgba(0,0,0,0))]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),rgba(255,255,255,0))]'
        }`} />
        <motion.div
          className={`absolute w-[500px] h-[500px] rounded-full ${
            theme === 'dark' ? 'bg-cyan-500/10' : 'bg-blue-500/10'
          } blur-[100px]`}
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: "spring", damping: 20 }}
        />
      </div>

      <main className="relative z-10">
        <section id="home" className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="space-y-6"
            >
              <h1 className={`text-7xl font-bold bg-clip-text text-transparent ${
                  theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600'
              }`}>
                Hi, im Cayden France
              </h1>
              <p className={theme === 'dark' ? 'text-xl text-gray-400' : 'text-xl text-gray-600'}>
                Full Stack Developer • AI Engineer • UI/UX Designer • Web Designer
              </p>

              <div className="flex justify-center gap-8 mt-8">
                {[Code, Monitor, Database].map((Icon, index) => (
                    <Icon key={index} className={`w-6 h-6 ${
                        theme === 'dark' ? 'text-cyan-500' : 'text-blue-600'
                    }`}/>
                ))}
              </div>

              <div className="flex justify-center gap-6 mt-12">
                {[
                  {Icon: Github, url: "https://github.com/caydenFranceCoding"},
                  {Icon: Linkedin, url: "https://linkedin.com/in/cayden-france-3b261833a/"},
                  {Icon: Mail, url: "mailto:cfcodinginspire@gmail.com"}
                ].map(({Icon, url}, index) => ( // Added index parameter here
                    <motion.a
                        key={index}
                        href={url} // Added url here
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{scale: 1.1}}
                        className={`p-3 rounded-lg ${
                            theme === 'dark'
                                ? 'bg-white/5 hover:bg-white/10'
                                : 'bg-black/5 hover:bg-black/10'
                        } transition-colors`}
                    >
                      <Icon className="w-6 h-6"/>
                    </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4" id="about">
          <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                className={`p-8 rounded-xl border backdrop-blur-sm ${
                    theme === 'dark'
                        ? 'bg-white/5 border-white/10'
                        : 'bg-black/5 border-black/10'
                }`}
            >
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className={`mb-8 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm a passionate developer focused on creating elegant solutions to complex problems.
                With experience in both front-end and back-end development, I bring ideas to life
                through clean code and intuitive design. I specialize in building scalable web
                applications and exploring the possibilities of AI integration. I am constantly learning
                and love learning. I will continue to expand my growth and knowledge as I grow in this everlasting
                field.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
                  }`}>Skills</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "React/Next.js",
                      "Node.js",
                      "Python",
                      "TypeScript",
                      "TailwindCSS",
                      "MongoDB",
                      "Flask",
                      "Javascript"

                    ].map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'dark'
                          ? 'bg-white/5 text-gray-300'
                          : 'bg-black/5 text-gray-600'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
                  }`}>Interests</h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    • Full Stack Development<br />
                    • AI/ML Integration<br />
                    • UI/UX Design<br />
                    • Web3 Technologies
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-20 px-4">
          <h2 className="text-4xl font-bold text-center mb-16">My Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                }`} />
                <div className={`relative p-6 rounded-xl border backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-black/5 border-black/10'
                }`}>
                  <div className="h-48 bg-white/5 rounded-lg mb-4 overflow-hidden">
                    <div className={`w-full h-full ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                        : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Project {index}</h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    A futuristic project showcasing advanced technologies and modern design principles.
                  </p>
                  <motion.a
                    href="#"
                    className={`inline-flex items-center ${
                      theme === 'dark' ? 'text-cyan-500 hover:text-cyan-400' : 'text-blue-600 hover:text-blue-500'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    View Project <ExternalLink className="ml-2 w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Work With Me / Ask Questions</h2>
            <motion.form
                onSubmit={handleSubmit}
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                className="space-y-6"
            >
              <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors placeholder-gray-500 ${
                      theme === 'dark'
                          ? 'bg-white/5 border-white/10 focus:border-cyan-500'
                          : 'bg-black/5 border-black/10 focus:border-blue-500'
                  } focus:outline-none`}
                  required
              />
              <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors placeholder-gray-500 ${
                      theme === 'dark'
                          ? 'bg-white/5 border-white/10 focus:border-cyan-500'
                          : 'bg-black/5 border-black/10 focus:border-blue-500'
                  } focus:outline-none`}
                  required
              />
              <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors placeholder-gray-500 ${
                      theme === 'dark'
                          ? 'bg-white/5 border-white/10 focus:border-cyan-500'
                          : 'bg-black/5 border-black/10 focus:border-blue-500'
                  } focus:outline-none`}
                  required
              />
              <motion.button
                  type="submit"
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                  className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
                      theme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                  } hover:opacity-90`}
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FuturisticPortfolio;