// Single source of truth for the portfolio content.
// Edit this file to update what the site shows — the frontend reads it via GET /api/profile.

export const profile = {
  name: 'Avijit Biswas',
  headline: 'Competitive Programmer · Full-Stack Developer · AI/ML',
  tagline:
    'M.Tech in Data Science & AI at IIT Madras. I build production apps, RAG systems and automation tooling — and I have solved 4,000+ algorithmic problems along the way.',
  location: 'India',
  // Optional: fill these in to show them on the site (left empty = hidden).
  email: '',
  resumeUrl: '',
  socials: {
    github: 'https://github.com/BiswasAvijit',
    linkedin: '',
  },

  stats: [
    { label: 'Problems solved', value: '4,000+' },
    { label: 'LeetCode max', value: '2167', note: 'Guardian' },
    { label: 'CodeChef max', value: '2226', note: '6★' },
    { label: 'Codeforces', value: 'Expert' },
  ],

  education: [
    {
      school: 'Indian Institute of Technology, Madras',
      short: 'IIT Madras',
      degree: 'Master of Technology (M.Tech)',
      field: 'Data Science and Artificial Intelligence (DSAI)',
      period: '2026 – Present',
    },
    {
      school: 'Indian Institute of Information Technology, Jabalpur',
      short: 'IIIT Jabalpur',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering (CSE)',
      period: '2022 – 2026',
    },
  ],

  experience: [
    {
      role: 'Technical Intern — Distributed Systems',
      org: 'Cisco',
      type: 'Internship',
      points: [
        'Integrated AI/ML-assisted automation into Cisco IOS XR workflows to improve build efficiency and system reliability.',
        'Developed Python scripts for log analysis, data preprocessing, and engineering task automation.',
        'Applied intelligent log analysis to identify recurring errors and accelerate root cause analysis.',
        'Troubleshot firmware upgrade issues through log analysis and debugging techniques.',
        'Automated validation workflows to improve software quality and firmware integration reliability.',
      ],
      tags: ['Python', 'AI/ML', 'IOS XR', 'Log Analysis', 'Automation'],
    },
    {
      role: 'Research Intern — Hardware Security',
      org: 'Key-Based Logic Locking',
      type: 'Research',
      points: [
        'Developing a system and method for implementing input-dependent key-based logic locking to secure integrated circuits.',
        'Patented project (Patent No. 526207) under Dr. Vijaypal Singh Rathor, funded by the Data Security Council of India.',
        'Proposed a solution and implemented it on Raspberry Pi.',
        'Implemented encryption methods and conducted analyses on Raspberry Pi.',
      ],
      tags: ['Hardware Security', 'Raspberry Pi', 'Encryption', 'Patent'],
    },
  ],

  projects: [
    {
      name: 'NextJobSeeker',
      summary:
        'A job search app published on the Google Play Store and Apple App Store.',
      points: [
        'Developed secure REST APIs for jobs, companies, favorites, feedback, and user account management.',
        'Integrated MongoDB storage, Firebase authentication, AWS backend support, and push notifications.',
      ],
      tags: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'AWS'],
      links: [
        { label: 'Website', url: 'https://nextjobseeker.com/' },
        { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.nextjobseeker.app' },
        { label: 'App Store', url: 'https://apps.apple.com/au/app/nextjobseeker/id6761741828' },
      ],
      featured: true,
    },
    {
      name: 'YtHelper',
      summary:
        'A full-stack Retrieval-Augmented Generation (RAG) system that indexes blog articles and YouTube transcripts for semantic search with precise timestamp retrieval.',
      points: [
        'Automated ingestion, chunking and vector embedding of multi-format content with Vercel Workflows.',
        'Neon (Postgres) + Drizzle ORM for high-dimensional embeddings and similarity-based search.',
        'Production-grade lifecycle with AI code reviews (CodeRabbit) and strict GitHub branch protection.',
      ],
      tags: ['RAG', 'Vector Search', 'Neon Postgres', 'Drizzle ORM', 'Vercel Workflows'],
      links: [{ label: 'GitHub', url: 'https://github.com/BiswasAvijit/YtHelper' }],
      featured: true,
    },
  ],

  codingProfiles: [
    {
      platform: 'LeetCode',
      handle: 'AVIJIT_BISWAS',
      url: 'https://leetcode.com/u/AVIJIT_BISWAS',
      rating: '2167',
      rank: 'Guardian',
      highlights: ['1,150+ problems solved', '700+ day streak'],
      color: '#FFA116',
    },
    {
      platform: 'Codeforces',
      handle: 'Avijit',
      url: 'https://codeforces.com/profile/Avijit',
      rating: null,
      rank: 'Expert',
      highlights: ['1,100+ problems solved', '365+ day streak'],
      color: '#3B82F6',
    },
    {
      platform: 'CodeChef',
      handle: 'avijit001',
      url: 'https://www.codechef.com/users/avijit001',
      rating: '2226',
      rank: '6 Star',
      highlights: ['Max rating 2226'],
      color: '#B45309',
    },
    {
      platform: 'AtCoder',
      handle: 'AVIJIT_BISWAS',
      url: 'https://atcoder.jp/users/AVIJIT_BISWAS',
      rating: '1121',
      rank: 'Green',
      highlights: ['Max rating 1121'],
      color: '#22C55E',
    },
    {
      platform: 'GeeksforGeeks',
      handle: 'avijitbisv15a',
      url: 'https://www.geeksforgeeks.org/user/avijitbisv15a',
      rating: null,
      rank: 'World Rank 334',
      highlights: [],
      color: '#2F8D46',
    },
    {
      platform: 'VJudge',
      handle: 'AVIJIT_BISWAS_',
      url: 'https://vjudge.net/user/AVIJIT_BISWAS_',
      rating: null,
      rank: null,
      highlights: ['700+ problems solved'],
      color: '#94A3B8',
    },
  ],

  achievements: [
    { title: 'Trilogy Codenation 2024 qualifier', detail: 'All India Rank 18' },
    {
      title: 'Meta Hacker Cup 2024',
      detail: 'World rank 2767',
      url: 'https://www.facebook.com/codingcompetitions/hacker-cup/2024/certificate/831227331821251',
    },
    { title: 'TCS CodeVita', detail: 'Round 2 qualifier' },
    {
      title: 'SII Scholarship — Ministry of Education, Govt. of India',
      detail: 'Full coverage of education costs (up to $9,500) for the entire B.Tech program',
    },
    { title: 'IIITJ Lockout Contest', detail: 'Quarterfinalist' },
    { title: 'Mentor @ The Programming Club, IIITDMJ', detail: 'Guided 25 students in DSA and problem solving' },
    { title: '4,000+ problems solved', detail: 'Across competitive programming platforms' },
    { title: 'NPTEL Competitive Programming', detail: 'Scored 81%' },
  ],

  skills: [
    {
      group: 'Languages',
      items: ['C', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      group: 'Web & Backend',
      items: ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'DaisyUI', 'React Native'],
    },
    {
      group: 'Databases',
      items: ['MongoDB', 'MySQL', 'NoSQL', 'PostgreSQL'],
    },
    {
      group: 'AI / ML',
      items: ['Machine Learning', 'Deep Learning', 'RAG', 'Vector Search'],
    },
    {
      group: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Linux', 'Git', 'GitHub'],
    },
    {
      group: 'Core CS',
      items: ['Data Structures & Algorithms', 'Competitive Programming', 'OOP', 'Problem Solving'],
    },
  ],
};
