import { PortfolioProfile } from '../types/portfolio';

export const initialPortfolioData: PortfolioProfile = {
  brandName: "PANDU.DEV",
  fullName: "I. Jayasaisrinandhan",
  role: "B.Tech Computer Science Engineering Student",
  supportingTitle: "B.Tech CSE Student • Developer • Technology Enthusiast",
  heroDescription: "I am a Computer Science Engineering student passionate about programming, web development, problem solving, and learning new technologies.",
  heroBgText: "PANDU",
  university: "KL University",
  location: "Vijayawada, Andhra Pradesh, India",
  email: "jayasaisrinandhan@gamil.com",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  avatarUrl: "",
  aboutText: "Hello! I'm I. Jayasaisrinandhan, a B.Tech Computer Science Engineering student at KL University. I enjoy learning programming, developing websites, understanding new technologies, and improving my problem-solving skills.\n\nMy goal is to continuously develop my technical knowledge and become a skilled software professional.",
  aboutHighlights: [
    { label: "Name", value: "I. Jayasaisrinandhan" },
    { label: "Course", value: "B.Tech CSE" },
    { label: "University", value: "KL University" },
    { label: "Location", value: "Vijayawada, India" },
    { label: "Role", value: "Student / Aspiring Developer" },
  ],
  careerGoalHeading: "Building My Future Through Technology.",
  careerGoalText: "My career goal is to become a skilled software professional where I can apply my programming knowledge, solve real-world problems, contribute to meaningful projects, and continuously learn new technologies.",
  education: [
    {
      id: "edu-1",
      degree: "B.Tech — Computer Science Engineering",
      field: "Computer Science and Engineering",
      institution: "KL University",
      status: "Currently Pursuing",
      timeline: "Present",
      location: "Vijayawada, Andhra Pradesh",
      description: "Focusing on fundamental computing principles, data structures, algorithms, object-oriented programming, and modern software paradigms."
    }
  ],
  skillCategories: [
    {
      title: "Programming",
      description: "Core programming languages and logic syntax",
      skills: [
        { name: "C", levelBadge: "Core", iconName: "Code2" },
        { name: "Java", levelBadge: "Core", iconName: "Coffee" },
        { name: "Python", levelBadge: "Basics", iconName: "Terminal" },
      ]
    },
    {
      title: "Web Development",
      description: "Frontend architecture and responsive web standards",
      skills: [
        { name: "HTML", levelBadge: "Standard", iconName: "FileCode" },
        { name: "CSS", levelBadge: "Responsive Design", iconName: "Palette" },
      ]
    },
    {
      title: "Computer Science",
      description: "Foundational theory and analytical thinking",
      skills: [
        { name: "Data Structures", levelBadge: "Basics", iconName: "Network" },
        { name: "Problem Solving", levelBadge: "Analytical", iconName: "BrainCircuit" },
      ]
    },
    {
      title: "Tools & Environments",
      description: "Development tools and collaboration platforms",
      skills: [
        { name: "Git", levelBadge: "Version Control", iconName: "GitBranch" },
        { name: "GitHub", levelBadge: "Collaboration", iconName: "Github" },
        { name: "MS Office", levelBadge: "Productivity", iconName: "FileSpreadsheet" },
      ]
    }
  ],
  currentLearning: [
    {
      id: "learn-1",
      title: "Java & Object-Oriented Programming",
      description: "Inheritance, polymorphism, constructors, methods and other OOP concepts.",
      tags: ["Inheritance", "Polymorphism", "Constructors", "Encapsulation", "Method Overriding"]
    },
    {
      id: "learn-2",
      title: "Data Structures & Algorithms",
      description: "Searching, sorting, trees, graphs, BFS and DFS.",
      tags: ["Binary Trees", "Graphs", "BFS & DFS", "Sorting Algorithms", "Time Complexity"]
    },
    {
      id: "learn-3",
      title: "Web Development",
      description: "HTML, CSS, responsive design and modern web technologies.",
      tags: ["Flexbox / Grid", "Responsive Design", "Modern Layouts", "DOM Manipulation"]
    },
    {
      id: "learn-4",
      title: "Artificial Intelligence & Machine Learning",
      description: "Machine-learning fundamentals, supervised learning, unsupervised learning and AI concepts.",
      tags: ["Supervised Learning", "Unsupervised Learning", "Neural Nets Basics", "Data Preprocessing"]
    },
    {
      id: "learn-5",
      title: "Git & GitHub",
      description: "Version control, branches, merge, pull, push, clone and GitHub workflows.",
      tags: ["Branching Strategy", "Merge & Rebase", "Pull Requests", "Conflict Resolution"]
    }
  ],
  interests: [
    {
      id: "int-1",
      title: "Programming",
      iconName: "Code",
      description: "Writing clean, efficient code and exploring new language capabilities."
    },
    {
      id: "int-2",
      title: "Web Development",
      iconName: "Globe",
      description: "Crafting responsive, visually engaging, and accessible web interfaces."
    },
    {
      id: "int-3",
      title: "Artificial Intelligence",
      iconName: "Bot",
      description: "Understanding intelligent systems, neural logic, and AI tools."
    },
    {
      id: "int-4",
      title: "Machine Learning",
      iconName: "LineChart",
      description: "Studying algorithmic models, prediction patterns, and data analysis."
    },
    {
      id: "int-5",
      title: "UI/UX Design",
      iconName: "Layout",
      description: "Designing intuitive user flows, dark aesthetic themes, and micro-interactions."
    },
    {
      id: "int-6",
      title: "Exploring New Technologies",
      iconName: "Rocket",
      description: "Staying curious about emerging frameworks, dev tooling, and innovations."
    }
  ],
  strengths: [
    {
      id: "str-1",
      title: "Quick Learner",
      description: "I enjoy understanding new technologies and continuously improving my knowledge.",
      iconName: "Zap"
    },
    {
      id: "str-2",
      title: "Hardworking",
      description: "I stay focused on completing tasks and improving my technical abilities.",
      iconName: "Target"
    },
    {
      id: "str-3",
      title: "Team Player",
      description: "I enjoy collaborating, sharing ideas, and learning with others.",
      iconName: "Users"
    },
    {
      id: "str-4",
      title: "Problem Solver",
      description: "I like approaching programming problems logically and finding practical solutions.",
      iconName: "Lightbulb"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Web Development Project",
      category: "Frontend Web Application",
      description: "An upcoming responsive web application built with modern HTML, CSS, and modern interactive elements.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      githubUrl: "",
      liveDemoUrl: "",
      isComingSoon: true,
      imagePlaceholderText: "Web Dev Architecture"
    },
    {
      id: "proj-2",
      title: "Java Project",
      category: "Software Application",
      description: "An upcoming Java application demonstrating Object-Oriented Programming principles, robust logic and modular structure.",
      technologies: ["Java", "OOP", "Data Structures"],
      githubUrl: "",
      liveDemoUrl: "",
      isComingSoon: true,
      imagePlaceholderText: "Java OOP Logic"
    },
    {
      id: "proj-3",
      title: "AI / ML Project",
      category: "Data & Intelligence",
      description: "An upcoming machine learning experiment exploring data classification, pattern recognition, and predictive models.",
      technologies: ["Python", "Machine Learning", "Algorithms"],
      githubUrl: "",
      liveDemoUrl: "",
      isComingSoon: true,
      imagePlaceholderText: "AI / ML Pipeline"
    }
  ],
  repositories: [
    {
      id: "repo-1",
      name: "pandu-portfolio",
      description: "Personal animated developer portfolio built with React, GSAP, and Tailwind CSS.",
      language: "TypeScript",
      githubUrl: "https://github.com"
    },
    {
      id: "repo-2",
      name: "java-oop-fundamentals",
      description: "Collection of practical examples showcasing core OOP concepts, inheritance, and polymorphism in Java.",
      language: "Java",
      githubUrl: "https://github.com"
    },
    {
      id: "repo-3",
      name: "dsa-practice-lab",
      description: "Implementation of essential data structures, sorting algorithms, and graph traversals in C and Java.",
      language: "C",
      githubUrl: "https://github.com"
    }
  ]
};
