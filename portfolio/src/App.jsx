import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import selfImage from './assets/selfimage.jpeg'
import './App.css'

// Initialize EmailJS
emailjs.init('nTGZIEfAUjjTRe5gf')

/* =========================================
   SVG ICON COMPONENTS
   ========================================= */
const Icons = {
  GitHub: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
}

/* =========================================
   TYPING ANIMATION HOOK
   ========================================= */
function useTypingEffect(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    let timeout

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentText.substring(0, displayText.length - 1)
            : currentText.substring(0, displayText.length + 1)
        )
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}

/* =========================================
   SCROLL REVEAL HOOK
   ========================================= */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    // Small delay to ensure all components have rendered their DOM
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])
}

/* =========================================
   NAVBAR COMPONENT
   ========================================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a className="nav-logo" href="#home" onClick={(e) => handleNavClick(e, 'home')}>
          SV.
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['about', 'skills', 'projects', 'experience', 'education'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={activeSection === item ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Let's Talk
          </a>
        </div>
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

/* =========================================
   HERO SECTION
   ========================================= */
function Hero() {
  const typedText = useTypingEffect([
    'Python Fullstack Developer',
    'React & Django Specialist',
    'REST API Architect',
    'Cloud Deployment Expert',
  ])

  return (
    <section className="hero section" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="status-dot"></span>
              Open to opportunities
            </div>
            <h1 className="hero-name">
              Hi, I'm <span className="gradient-text">Susan</span>
              <br />Veronica
            </h1>
            <p className="hero-title">
              <span className="typed-text">{typedText}</span>
            </p>
            <p className="hero-description">
              Results-driven developer with hands-on experience building and deploying
              end-to-end web applications using React, Django, and MySQL. Passionate about
              clean code, scalable architecture, and delivering impactful digital solutions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary" onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                View Projects <Icons.ArrowRight />
              </a>
              <a href="#contact" className="btn-secondary" onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                <Icons.Mail /> Get in Touch
              </a>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="avatar-wrapper">
              <div className="avatar-glow"></div>
              <div className="avatar-ring"></div>
              <div className="avatar-ring-inner">
                <img src={selfImage} alt="Susan Veronica - Python Fullstack Developer" />
              </div>
              <div className="floating-badge">⚛️ React</div>
              <div className="floating-badge">🐍 Python</div>
              <div className="floating-badge">🗄️ Django</div>
              <div className="floating-badge">🚀 CI/CD</div>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">2+</div>
              <div className="stat-label">Projects Deployed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">87.6%</div>
              <div className="stat-label">Certification Grade</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================
   ABOUT SECTION
   ========================================= */
function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">// About Me</span>
          <h2 className="section-title">Developer with a Purpose</h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal reveal-delay-1">
            <p>
              I'm <strong>Susan Veronica</strong>, a Python Fullstack Developer based in
              <strong> Chennai, India</strong>. With a solid foundation from a 10-month
              intensive fullstack programme and hands-on internship experience, I specialize in
              building complete web applications from frontend to backend.
            </p>
            <p>
              My journey into tech is unique — with an <strong>MBA in Human Resource Management</strong> and
              over <strong>3 years of HR domain experience</strong>, I bring a rare combination of
              technical expertise and business acumen. I understand both the code and the people behind it.
            </p>
            <p>
              I'm proficient in building <strong>RESTful APIs with Django</strong>, creating dynamic
              interfaces with <strong>React.js</strong>, and deploying full-stack applications with
              <strong> CI/CD pipelines</strong>. I'm passionate about leveraging AI-assisted development
              tools to write cleaner, more efficient code.
            </p>
          </div>
          <div className="about-highlights reveal reveal-delay-2">
            <div className="highlight-card">
              <div className="highlight-icon">🎯</div>
              <div className="highlight-value">A Grade</div>
              <div className="highlight-label">Certification Score</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🚀</div>
              <div className="highlight-value">2+</div>
              <div className="highlight-label">Live Projects</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">💼</div>
              <div className="highlight-value">3+</div>
              <div className="highlight-label">Years of Experience</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🤖</div>
              <div className="highlight-value">6+</div>
              <div className="highlight-label">AI Tools Mastered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================
   SKILLS SECTION
   ========================================= */
const skillsData = [
  {
    category: 'Languages',
    icon: '💻',
    iconClass: 'lang',
    skills: ['Python', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    iconClass: 'frontend',
    skills: ['React.js', 'Redux', 'Context API', 'Responsive Design'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    iconClass: 'backend',
    skills: ['Django', 'Django REST Framework', 'REST APIs', 'JWT Auth'],
  },
  {
    category: 'Database & Payment',
    icon: '🗃️',
    iconClass: 'database',
    skills: ['MySQL', 'Aiven (Cloud DB)', 'Razorpay Integration'],
  },
  {
    category: 'DevOps & Deployment',
    icon: '🚀',
    iconClass: 'devops',
    skills: ['Git', 'GitHub', 'Docker', 'Netlify', 'Render', 'Railway', 'CI/CD Pipelines'],
  },
  {
    category: 'AI & Dev Tools',
    icon: '🤖',
    iconClass: 'tools',
    skills: ['Cursor', 'Claude', 'OpenAI', 'Google AI Studio', 'Antigravity', 'Windsurf', 'Kiro', 'GitHub Copilot', 'Postman'],
  },
]

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">// Tech Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive toolkit for building modern, scalable web applications from end to end.
          </p>
        </div>
        <div className="skills-grid">
          {skillsData.map((cat, i) => (
            <div key={cat.category} className={`skill-category reveal reveal-delay-${Math.min(i + 1, 5)}`}>
              <div className="skill-category-header">
                <div className={`skill-category-icon ${cat.iconClass}`}>{cat.icon}</div>
                <h3 className="skill-category-name">{cat.category}</h3>
              </div>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================
   PROJECTS SECTION
   ========================================= */
const projectsData = [
  {
    type: 'Fullstack Application',
    name: 'Competition Registration Platform',
    desc: 'A full-featured competition management platform supporting paid and free registration modes, enabling organisations to host and manage competitions at scale.',
    features: [
      'Razorpay payment gateway for secure transactions & document submission',
      'RESTful APIs with Django REST Framework & JWT authentication',
      'Dedicated Admin panel for competition management',
      'Deployed on Netlify (frontend) & Render/Railway (backend) with CI/CD',
    ],
    tech: ['React', 'Django', 'MySQL', 'Razorpay', 'JWT', 'REST APIs', 'Netlify', 'Render'],
    liveUrl: 'https://competitionai.netlify.app',
    githubUrl: 'https://github.com/SusanR9/AIproject',
    icon: '🏆',
  },
  {
    type: 'E-Commerce Platform',
    name: 'Eshop-Toys — Toy Purchases E-Commerce',
    desc: 'A user-friendly e-commerce platform for purchasing toys, featuring separate Admin and User portals with distinct roles and access controls.',
    features: [
      'Admin portal with secure login, dashboard & full product lifecycle management',
      'User portal with homepage, product browsing, cart, checkout & Razorpay payment',
      'JWT-based authentication for two distinct user roles',
      'Deployed with Aiven (MySQL), Netlify, and Render with CI/CD pipelines',
    ],
    tech: ['React', 'Django', 'MySQL', 'Razorpay', 'JWT', 'REST APIs', 'CI/CD'],
    liveUrl: 'https://e-toys.netlify.app',
    githubUrl: 'https://github.com/SusanR9/eshop',
    icon: '🧸',
  },
]

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">// Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Real-world applications deployed with modern tech stacks and CI/CD pipelines.
          </p>
        </div>
        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <div key={project.name} className={`project-card reveal reveal-delay-${Math.min(i + 1, 3)}`}>
              <div className="project-preview">
                <div className="project-preview-content">
                  <div className="project-preview-icon">{project.icon}</div>
                  <div className="project-preview-label">Live Project</div>
                </div>
              </div>
              <div className="project-info">
                <span className="project-type">{project.type}</span>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.desc}</p>
                <ul className="project-features">
                  {project.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.liveUrl}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <Icons.ExternalLink />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code <Icons.GitHub />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================
   EXPERIENCE SECTION
   ========================================= */
const experienceData = [
  {
    company: 'Vetri IT Systems Private Limited',
    role: 'Python Fullstack Developer Intern',
    date: 'Nov 2025 – Apr 2026',
    points: [
      'Developed and deployed full-stack web applications using Python, Django, React.js, and MySQL',
      'Built RESTful APIs with Django REST Framework and integrated JWT authentication and Razorpay payment gateway',
      'Deployed applications on Netlify, Render, and Railway with CI/CD workflows',
      'Completed the associated 10-month Python Fullstack certification with A Grade (87.60%)',
    ],
  },
  {
    company: 'AGNOSHIN Technologies',
    role: 'HR Executive',
    date: 'Jan 2024 – Apr 2024',
    points: [
      'Managed end-to-end HR operations for a 40+ employee organisation',
      'Drove full-cycle recruitment for 10+ roles — sourcing, screening, and issuing employment contracts',
      'Administered compensation and benefits plans, ensuring 100% payroll accuracy',
      'Onboarded 15+ new hires and designed training programmes, reducing ramp-up time by 30%',
    ],
  },
  {
    company: 'NEGOCIOS IT Solutions',
    role: 'HR Analyst',
    date: 'Jun 2022 – Oct 2023',
    points: [
      'Sourced 200+ candidates per month via Naukri, Hirect, LinkedIn, and social media',
      'Screened 100+ resumes weekly and conducted structured interviews, reducing time-to-hire by 25%',
      'Organised and participated in 5+ job fairs and recruitment events per quarter',
    ],
  },
  {
    company: 'SIXSIGMA SoftSolutions Pvt. Ltd.',
    role: 'HR Analyst',
    date: 'Jun 2019 – Dec 2019',
    points: [
      'Sourced and screened 80+ candidates per month for technical roles',
      'Conducted 30+ phone, video, and in-person interviews per month',
      'Delivered shortlisted candidates to hiring managers within 48 hours, maintaining a 90% fill rate',
    ],
  },
  {
    company: 'Sutherland Global Technologies',
    role: 'Associate CS',
    date: 'Feb 2021 – Sep 2021',
    points: [
      'Handled 60+ inbound customer calls daily with a 95% first-call resolution rate',
      'Supported vendors on sales queries, contributing to a 20% reduction in escalation tickets',
    ],
  },
]

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">// Career Journey</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            A unique blend of fullstack development expertise and professional HR experience.
          </p>
        </div>
        <div className="timeline">
          {experienceData.map((exp, i) => (
            <div key={exp.company} className={`timeline-item reveal reveal-delay-${Math.min(i + 1, 5)}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-company">{exp.company}</h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <p className="timeline-role">{exp.role}</p>
                <ul className="timeline-points">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================
   EDUCATION SECTION
   ========================================= */
function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">// Education & Certification</span>
          <h2 className="section-title">Academic Background</h2>
        </div>

        {/* Certification */}
        <div className="cert-card reveal reveal-delay-1" style={{ marginBottom: 'var(--space-2xl)' }}>
          <div className="cert-badge">✅ Verified Certificate</div>
          <h3 className="cert-title">Python Fullstack — Certificate & Internship</h3>
          <p className="cert-issuer">
            Vetri Technology Solutions & Vetri IT Systems Pvt. Ltd. &nbsp;|&nbsp; ISO 9001:2015 &nbsp;|&nbsp; MSME & Digital India
          </p>
          <div className="cert-details">
            <span>
              📚 10-month fullstack programme covering Python, Django, React.js, MySQL, REST APIs, and deployment
            </span>
            <span>🏅 Passed with A Grade — 87.60% &nbsp;|&nbsp; Cert No: CN99D2YB1K &nbsp;|&nbsp; Issued: 20 Apr 2026</span>
            <span>
              💼 Concurrent 6-month internship (Nov 2025 – Apr 2026) at Vetri IT Systems Pvt. Ltd.
            </span>
          </div>
        </div>

        {/* Education cards */}
        <div className="education-grid">
          <div className="edu-card reveal reveal-delay-2">
            <div className="edu-icon">🎓</div>
            <h3 className="edu-degree">MBA – Human Resource Management</h3>
            <p className="edu-school">University of Madras</p>
            <div className="edu-meta">
              <span>📅 2016 – 2018</span>
            </div>
          </div>
          <div className="edu-card reveal reveal-delay-3">
            <div className="edu-icon">🎓</div>
            <h3 className="edu-degree">BCA – Computer Applications</h3>
            <p className="edu-school">Stella Maris College, Chennai</p>
            <div className="edu-meta">
              <span>📅 2013 – 2016</span>
              <span>📊 GPA: 78%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================
   CONTACT SECTION
   ========================================= */
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const templateParams = {
      to_email: 'susanveronica96@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    }

    emailjs.send('service_uazigbo', 'template_apo9ayp', templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text)
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      })
      .catch((err) => {
        console.error('Failed to send email:', err)
        setError('Failed to send message. Please try again.')
        setTimeout(() => setError(''), 4000)
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">// Get in Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>
        <div className="contact-wrapper">
          <div className="contact-info reveal reveal-delay-1">
            <h3>Let's connect and create something amazing.</h3>
            <p>
              Whether you're looking for a fullstack developer to join your team or need
              help building your next web application, I'm ready to bring your ideas to life
              with clean code and modern technology.
            </p>
            <div className="contact-details">
              <a href="mailto:susanveronica9918@gmail.com" className="contact-item">
                <div className="contact-item-icon"><Icons.Mail /></div>
                <span>susanveronica9918@gmail.com</span>
              </a>
              <a href="tel:+917904652288" className="contact-item">
                <div className="contact-item-icon"><Icons.Phone /></div>
                <span>+91-7904652288</span>
              </a>
              <div className="contact-item">
                <div className="contact-item-icon"><Icons.MapPin /></div>
                <span>Chennai, Tamil Nadu – 600013</span>
              </div>
            </div>
            <div className="social-links">
              <a
                href="https://github.com/SusanR9"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Icons.GitHub />
              </a>
              <a
                href="https://linkedin.com/in/susan-veronica-26328b323"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Icons.LinkedIn />
              </a>
              <a
                href="mailto:susanveronica9918@gmail.com"
                className="social-link"
                aria-label="Send Email"
              >
                <Icons.Mail />
              </a>
            </div>
          </div>
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? '⏳ Sending...' : submitted ? '✓ Message Sent!' : 'Send Message →'}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

/* =========================================
   FOOTER COMPONENT
   ========================================= */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} <span className="gradient-text">Susan Veronica</span>. Built with React & Vite.
          </p>
          <div className="footer-links">
            <a href="https://github.com/SusanR9" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/susan-veronica-26328b323" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:susanveronica9918@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* =========================================
   MAIN APP
   ========================================= */
function App() {
  useScrollReveal()

  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-orbs"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
