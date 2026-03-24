// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "IT Placement System - Lead City University",
  description: "AI-Powered Student Industrial Training Placement System for Lead City University. Apply for your IT placement with intelligent matching.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "LCU IT Placement",
  menuLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#features" },
    { label: "Apply Now", href: "#products" },
    { label: "Success Stories", href: "#blog" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "#" },
    { icon: "Facebook", label: "Facebook", href: "#" },
    { icon: "Twitter", label: "Twitter", href: "#" },
  ],
  searchPlaceholder: "Search for companies or services...",
  cartEmptyText: "Your application cart is empty",
  cartCheckoutText: "Proceed to Payment",
  continueShoppingText: "Continue Browsing",
  menuBackgroundImage: "/images/menu-bg.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "Lead City University",
  title: "AI-Powered\nIndustrial Training\nPlacement System",
  ctaPrimaryText: "Apply for IT Placement",
  ctaPrimaryTarget: "#products",
  ctaSecondaryText: "Learn More",
  ctaSecondaryTarget: "#about",
  backgroundImage: "/images/hero-bg.jpg",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "Our Mission",
  heading: "Revolutionizing IT Placement with Machine Learning",
  bodyParagraphs: [
    "The Industrial Training (IT) program is a pivotal component of undergraduate education in Nigerian universities. Our AI-powered system bridges the gap between theoretical learning and practical industrial experience.",
    "Using advanced machine learning algorithms including Random Forest, SVM, and Neural Networks, we match students with companies based on skills, interests, CGPA, and company requirements - ensuring optimal placement outcomes.",
  ],
  linkText: "Discover How It Works",
  linkTarget: "#features",
  image1: "/images/subhero-1.jpg",
  image2: "/images/subhero-2.jpg",
  stats: [
    { value: 287, suffix: "+", label: "Students Enrolled" },
    { value: 47, suffix: "+", label: "Partner Companies" },
    { value: 95, suffix: "%", label: "Placement Rate" },
    { value: 72, suffix: "h", label: "Processing Time" },
  ],
};

// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "Machine Learning",
  heading: "Intelligent Matching Algorithm",
  bodyParagraphs: [
    "Our system analyzes multiple data points including your CGPA, technical skills, career interests, and location preferences to find the perfect company match.",
    "The ML model learns from historical placement outcomes to continuously improve matching accuracy, ensuring you get placed where you'll thrive and grow.",
  ],
  ctaText: "View Matching Process",
  ctaTarget: "#about",
  backgroundImage: "/images/ml-section.jpg",
};

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "Application Services",
  heading: "IT Placement Application",
  description: "Complete your industrial training application with our streamlined process. Application fee: ₦2,000 + ₦75 VAT = ₦2,075 total.",
  viewAllText: "View All Services",
  addToCartText: "Add to Application",
  addedToCartText: "Added to Application",
  categories: ["All", "Application", "Services"],
  products: [
    { 
      id: 1, 
      name: "IT Placement Application Form", 
      price: 2000, 
      category: "Application", 
      image: "/images/application-form.jpg" 
    },
    { 
      id: 2, 
      name: "Premium Matching Service", 
      price: 5000, 
      category: "Services", 
      image: "/images/ml-matching.jpg" 
    },
    { 
      id: 3, 
      name: "Company Research Package", 
      price: 3000, 
      category: "Services", 
      image: "/images/tech-company.jpg" 
    },
    { 
      id: 4, 
      name: "Interview Preparation", 
      price: 4000, 
      category: "Services", 
      image: "/images/success-story.jpg" 
    },
  ],
};

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "ShieldCheck",
      title: "Secure Application",
      description: "Your data is protected with enterprise-grade security. All applications are processed through our secure payment gateway.",
    },
    {
      icon: "Truck",
      title: "Fast Processing",
      description: "Get your placement results within 72 hours. Our AI system processes applications 20x faster than manual methods.",
    },
    {
      icon: "Heart",
      title: "Optimal Matching",
      description: "Our ML algorithms consider your skills, interests, and career goals to find the perfect company match.",
    },
    {
      icon: "Leaf",
      title: "Transparent Process",
      description: "Track your application status in real-time. No hidden decisions - every placement is data-driven and fair.",
    },
  ],
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "Success Stories",
  heading: "Student Achievements",
  viewAllText: "View All Stories",
  readMoreText: "Read Full Story",
  posts: [
    {
      id: 1,
      title: "From Classroom to Tech Lead: Chidi's Journey",
      date: "March 15, 2026",
      image: "/images/success-story.jpg",
      excerpt: "Chidi was matched with a leading fintech company where he gained invaluable experience in software development. Today, he leads a team of developers.",
    },
    {
      id: 2,
      title: "How AI Matching Changed My Career Path",
      date: "March 10, 2026",
      image: "/images/tech-company.jpg",
      excerpt: "Amara shares how the ML-powered placement system connected her with a company that perfectly aligned with her data science aspirations.",
    },
    {
      id: 3,
      title: "Building Professional Networks Through IT",
      date: "March 5, 2026",
      image: "/images/mentorship.jpg",
      excerpt: "Discover how industrial training placements create lasting professional relationships that benefit students throughout their careers.",
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "Support",
  heading: "Frequently Asked Questions",
  ctaText: "Still have questions? Contact us",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "What is the application fee for IT placement?",
      answer: "The application fee for the IT Placement Form is ₦2,000 (Two Thousand Naira only). This is a non-refundable fee that covers the processing of your application and access to our AI matching system.",
    },
    {
      id: 2,
      question: "How does the AI matching system work?",
      answer: "Our machine learning algorithm analyzes your CGPA, technical skills, career interests, location preferences, and company requirements to predict the optimal student-company match. The system uses Random Forest, SVM, and Neural Network models trained on historical placement data.",
    },
    {
      id: 3,
      question: "How long does the placement process take?",
      answer: "Unlike the traditional manual process that takes 6-14 weeks, our AI-powered system processes applications within 72 hours. You'll receive your placement notification via email and SMS.",
    },
    {
      id: 4,
      question: "What documents do I need to apply?",
      answer: "You'll need your student ID, current transcript showing your CGPA, a CV highlighting your technical skills, and a statement of interest. All documents can be uploaded during the online application process.",
    },
    {
      id: 5,
      question: "Can I choose my preferred companies?",
      answer: "Yes, you can indicate your company preferences during application. However, the final placement is determined by our AI matching algorithm to ensure the best fit for both you and the company based on multiple factors.",
    },
    {
      id: 6,
      question: "What if I'm not satisfied with my placement?",
      answer: "We have an appeal process in place. If you have valid concerns about your placement, you can submit an appeal within 7 days of receiving your placement notification. Our team will review your case.",
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "About The System",
      heading: "Transforming IT Placement at Lead City University",
      paragraphs: [
        "The current manual IT placement system suffers from inefficiencies that undermine the educational value of industrial training. Our machine learning-driven placement model addresses these challenges through predictive analytics.",
        "Unlike existing administrative tools that focus on scheduling, this system employs predictive modeling to learn from historical placement outcomes and recommend matches likely to result in successful training experiences.",
      ],
      quote: "",
      attribution: "",
      image: "/images/university-building.jpg",
      backgroundColor: "#423d3f",
      textColor: "#ffffff",
    },
    {
      tag: "Our Vision",
      heading: "Bridging the Gap Between Education and Industry",
      paragraphs: [
        "We envision a future where every student gets placed in a company that aligns with their skills, interests, and career aspirations. Our AI system ensures equitable access to opportunities, removing the advantage currently enjoyed by students with personal connections.",
        "By optimizing the Person-Environment Fit, we enhance the quality of training received, better preparing students for the competitive labor market and improving graduate employability.",
      ],
      quote: "",
      attribution: "",
      image: "/images/mentorship.jpg",
      backgroundColor: "#8b6d4b",
      textColor: "#ffffff",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Get In Touch",
  description: "Have questions about the IT placement process? Our support team is here to help you with your application and answer any inquiries.",
  locationLabel: "Location",
  location: "Lead City University, Ibadan, Oyo State, Nigeria",
  emailLabel: "Email",
  email: "itplacement@lcu.edu.ng",
  phoneLabel: "Phone",
  phone: "+234 123 456 7890",
  formFields: {
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    messageLabel: "Message",
    messagePlaceholder: "How can we help you?",
  },
  submitText: "Send Message",
  submittingText: "Sending...",
  submittedText: "Sent!",
  successMessage: "Thank you for reaching out! We'll get back to you within 24 hours.",
  backgroundImage: "/images/contact-bg.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "LCU IT Placement",
  brandDescription: "AI-Powered Student Industrial Training Placement System for Lead City University. Transforming the future of IT placement through machine learning.",
  newsletterHeading: "Stay Updated",
  newsletterDescription: "Subscribe to receive updates about placement opportunities and deadlines.",
  newsletterPlaceholder: "Enter your email address",
  newsletterButtonText: "Subscribe",
  newsletterSuccessText: "Thank you for subscribing!",
  linkGroups: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "How It Works", href: "#features" },
        { label: "Apply Now", href: "#products" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Success Stories", href: "#blog" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact Us", href: "#contact" },
        { label: "Partner Companies", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Application Guide", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  copyrightText: "© 2026 Lead City University. All rights reserved. Designed by Prosper Osandatuwa-Tanko (LCU/UG/22/23505).",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "#" },
    { icon: "Facebook", label: "Facebook", href: "#" },
    { icon: "Twitter", label: "Twitter", href: "#" },
  ],
};
