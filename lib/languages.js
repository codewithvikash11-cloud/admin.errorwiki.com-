import {
    FileJson,
    Code2,
    Layout,
    Palette,
    Server,
    Atom,
    Database,
    GitBranch,
    Terminal,
    Zap,
    Globe,
    Cpu,
    Smartphone,
    Layers,
    Box,
    Cloud,
    Hash,
    Coffee,
    Gem,
    HardDrive,
    Container,
    Command,
    Wifi,
    Shield,
    Ghost,
    UserCheck,
    BookOpen,
    Award
} from 'lucide-react';

export const LANGUAGES = [
    // Frontend
    {
        id: 'js',
        name: 'JavaScript',
        slug: 'javascript',
        category: 'Frontend',
        icon: FileJson,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        description: 'The scripting language for Web pages.',
        image: '/images/javascript.png'
    },
    {
        id: 'ts',
        name: 'TypeScript',
        slug: 'typescript',
        category: 'Frontend',
        icon: Code2,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        description: 'JavaScript with syntax for types.',
        image: '/images/typescript.png'
    },
    {
        id: 'html',
        name: 'HTML',
        slug: 'html',
        category: 'Frontend',
        icon: Layout,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        description: 'Standard markup language for documents.',
        image: '/images/html.png'
    },
    {
        id: 'css',
        name: 'CSS',
        slug: 'css',
        category: 'Frontend',
        icon: Palette,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        description: 'Style sheet language used for describing the presentation.',
        image: '/images/css.png'
    },
    {
        id: 'react',
        name: 'React',
        slug: 'react',
        category: 'Frontend',
        icon: Atom,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
        description: 'A JavaScript library for building user interfaces.',
        image: '/images/react.png'
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        slug: 'nextjs',
        category: 'Frontend',
        icon: Zap,
        color: 'text-text-primary',
        bg: 'bg-text-primary/10',
        description: 'The React Framework for the Web.',
        image: '/images/nextjs.png'
    },
    {
        id: 'vue',
        name: 'Vue',
        slug: 'vue',
        category: 'Frontend',
        icon: Layers,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        description: 'The Progressive JavaScript Framework.',
        image: '/images/Vue.png'
    },
    {
        id: 'angular',
        name: 'Angular',
        slug: 'angular',
        category: 'Frontend',
        icon: Box,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        description: 'The modern web developer\'s platform.',
        image: '/images/Angular.png'
    },

    // Backend
    {
        id: 'node',
        name: 'Node.js',
        slug: 'nodejs',
        category: 'Backend',
        icon: Server,
        color: 'text-green-600',
        bg: 'bg-green-600/10',
        description: 'JavaScript runtime built on Chrome\'s V8 engine.',
        image: '/images/node.png'
    },
    {
        id: 'python',
        name: 'Python',
        slug: 'python',
        category: 'Backend',
        icon: Hash,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        description: 'A programming language that lets you work quickly.',
        image: '/images/python.png'
    },
    {
        id: 'java',
        name: 'Java',
        slug: 'java',
        category: 'Backend',
        icon: Coffee,
        color: 'text-red-400',
        bg: 'bg-red-400/10',
        description: 'Object-oriented programming language designed to have as few dependencies as possible.',
        image: '/images/java.png'
    },
    {
        id: 'php',
        name: 'PHP',
        slug: 'php',
        category: 'Backend',
        icon: Globe,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10',
        description: 'A popular general-purpose scripting language that is especially suited to web development.'
    },
    {
        id: 'ruby',
        name: 'Ruby',
        slug: 'ruby',
        category: 'Backend',
        icon: Gem,
        color: 'text-red-600',
        bg: 'bg-red-600/10',
        description: 'A dynamic, open source programming language with a focus on simplicity and productivity.',
        image: '/images/Ruby.png'
    },
    {
        id: 'go',
        name: 'Go',
        slug: 'go',
        category: 'Backend',
        icon: Zap,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        description: 'An open source programming language that makes it easy to build simple, reliable, and efficient software.',
        image: '/images/go.png'
    },
    {
        id: 'rust',
        name: 'Rust',
        slug: 'rust',
        category: 'Backend',
        icon: Settings,
        color: 'text-orange-600',
        bg: 'bg-orange-600/10',
        description: 'A language empowering everyone to build reliable and efficient software.',
        image: '/images/rust.png'
    },
    {
        id: 'c',
        name: 'C',
        slug: 'c',
        category: 'Backend',
        icon: Code2,
        color: 'text-blue-300',
        bg: 'bg-blue-300/10',
        description: 'A general-purpose, procedural computer programming language supporting structured programming.',
        image: '/images/C.png'
    },
    {
        id: 'cpp',
        name: 'C++',
        slug: 'cpp',
        category: 'Backend',
        icon: Code2,
        color: 'text-blue-600',
        bg: 'bg-blue-600/10',
        description: 'General-purpose programming language created as an extension of the C programming language.',
        image: '/images/cpp.png'
    },
    {
        id: 'csharp',
        name: 'C#',
        slug: 'csharp',
        category: 'Backend',
        icon: Hash,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        description: 'A modern, object-oriented, and type-safe programming language.',
        image: '/images/csharp.png'
    },

    // Databases
    {
        id: 'sql',
        name: 'SQL',
        slug: 'sql',
        category: 'Database',
        icon: Database,
        color: 'text-gray-400',
        bg: 'bg-gray-400/10',
        description: 'Domain-specific language used in programming and designed for managing data held in a relational database management system.',
        image: '/images/SQL.png'
    },
    {
        id: 'mysql',
        name: 'MySQL',
        slug: 'mysql',
        category: 'Database',
        icon: Database,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        description: 'Open-source relational database management system.',
        image: '/images/MySQL.png'
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        slug: 'postgresql',
        category: 'Database',
        icon: Database,
        color: 'text-blue-300',
        bg: 'bg-blue-300/10',
        description: 'Open source object-relational database system.',
        image: '/images/PostgreSQL.png'
    },
    {
        id: 'mongodb',
        name: 'MongoDB',
        slug: 'mongodb',
        category: 'Database',
        icon: Database,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        description: 'Source-available cross-platform document-oriented database program.',
        image: '/images/MongoDB.png'
    },
    {
        id: 'redis',
        name: 'Redis',
        slug: 'redis',
        category: 'Database',
        icon: Layers,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        description: 'In-memory data structure store, used as a database, cache, and message broker.',
        image: '/images/Redis.png'
    },

    // Mobile
    {
        id: 'android',
        name: 'Android',
        slug: 'android',
        category: 'Mobile',
        icon: Smartphone,
        color: 'text-green-400',
        bg: 'bg-green-400/10',
        description: 'Mobile operating system based on a modified version of the Linux kernel.',
        image: '/images/Android.png'
    },
    {
        id: 'ios',
        name: 'iOS',
        slug: 'ios',
        category: 'Mobile',
        icon: Smartphone,
        color: 'text-gray-200',
        bg: 'bg-gray-200/10',
        description: 'Mobile operating system created and developed by Apple Inc.',
        image: '/images/iOS.png'
    },
    {
        id: 'flutter',
        name: 'Flutter',
        slug: 'flutter',
        category: 'Mobile',
        icon: Layers,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
        description: 'Open source UI software development kit created by Google.',
        image: '/images/Flutter.png'
    },
    {
        id: 'reactnative',
        name: 'React Native',
        slug: 'reactnative',
        category: 'Mobile',
        icon: Atom,
        color: 'text-cyan-600',
        bg: 'bg-cyan-600/10',
        description: 'Open-source UI software framework created by Meta Platforms, Inc.',
        image: '/images/react-native.png'
    },

    // DevOps & Cloud
    {
        id: 'git',
        name: 'Git',
        slug: 'git',
        category: 'DevOps',
        icon: GitBranch,
        color: 'text-orange-600',
        bg: 'bg-orange-600/10',
        description: 'Distributed version control system.',
        image: '/images/Git.png'
    },
    {
        id: 'docker',
        name: 'Docker',
        slug: 'docker',
        category: 'DevOps',
        icon: Container,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        description: 'Platform for developing, shipping, and running applications.',
        image: '/images/docker.png'
    },
    {
        id: 'aws',
        name: 'AWS',
        slug: 'aws',
        category: 'Cloud Computing',
        icon: Cloud,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        description: 'On-demand cloud computing platforms and APIs.',
        image: '/images/AWS.png'
    },
    {
        id: 'kubernetes',
        name: 'Kubernetes',
        slug: 'kubernetes',
        category: 'DevOps',
        icon: Container,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        description: 'Container orchestration system.',
        image: '/images/Kubernetes.png'
    },



];

// Helper to get all categories
export const CATEGORIES = [...new Set(LANGUAGES.map(lang => lang.category))];

// Helper to get languages by category
export const getLanguagesByCategory = (category) => LANGUAGES.filter(lang => lang.category === category);

// Helper to get language by slug
export const getLanguageBySlug = (slug) => LANGUAGES.find(lang => lang.slug === slug);

// Helper to get language icon
import { Settings, Flame } from 'lucide-react'; // Late import to fix reference
