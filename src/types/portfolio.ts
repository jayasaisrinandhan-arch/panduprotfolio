export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  status: string;
  timeline: string;
  location?: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  levelBadge?: string; // e.g. "Basics", "Core", "Essential"
  iconName?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface LearningItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface InterestItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  isComingSoon: boolean;
  imagePlaceholderText: string;
}

export interface RepositoryItem {
  id: string;
  name: string;
  description: string;
  language: string;
  githubUrl: string;
}

export interface PortfolioProfile {
  brandName: string;
  fullName: string;
  role: string;
  supportingTitle: string;
  heroDescription: string;
  heroBgText: string;
  university: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  avatarUrl: string;
  aboutText: string;
  aboutHighlights: { label: string; value: string }[];
  careerGoalHeading: string;
  careerGoalText: string;
  education: EducationItem[];
  skillCategories: SkillCategory[];
  currentLearning: LearningItem[];
  interests: InterestItem[];
  strengths: StrengthItem[];
  projects: ProjectItem[];
  repositories: RepositoryItem[];
}
