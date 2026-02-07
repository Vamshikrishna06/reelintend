export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  reelCount: number;
}

export interface Reel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  topic: string;
  likes: number;
  saves: number;
  shares: number;
  views: number;
  duration: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  selectedTopics: string[];
  savedReels: string[];
  likedReels: string[];
  watchHistory: string[];
}

export const topics: Topic[] = [
  {
    id: "data-analytics",
    name: "Data Analytics",
    icon: "📊",
    description: "Master data visualization & insights",
    color: "from-cyan-500 to-blue-500",
    reelCount: 1240,
  },
  {
    id: "full-stack",
    name: "Full Stack Dev",
    icon: "💻",
    description: "Build complete web applications",
    color: "from-purple-500 to-pink-500",
    reelCount: 2150,
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: "🤖",
    description: "Explore AI & neural networks",
    color: "from-green-500 to-emerald-500",
    reelCount: 1890,
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "🧠",
    description: "Algorithms & predictive models",
    color: "from-orange-500 to-red-500",
    reelCount: 1560,
  },
  {
    id: "critical-thinking",
    name: "Critical Thinking",
    icon: "💡",
    description: "Sharpen your analytical mind",
    color: "from-yellow-500 to-orange-500",
    reelCount: 890,
  },
  {
    id: "programming",
    name: "Programming",
    icon: "⚡",
    description: "Code in any language",
    color: "from-indigo-500 to-purple-500",
    reelCount: 3200,
  },
  {
    id: "business",
    name: "Business & Startups",
    icon: "🚀",
    description: "Entrepreneurship & growth",
    color: "from-pink-500 to-rose-500",
    reelCount: 1450,
  },
  {
    id: "design",
    name: "UI/UX Design",
    icon: "🎨",
    description: "Create beautiful interfaces",
    color: "from-teal-500 to-cyan-500",
    reelCount: 980,
  },
];

export const dummyReels: Reel[] = [
  {
    id: "1",
    title: "Python List Comprehension in 60 Seconds",
    description: "Learn the most powerful Python feature in under a minute! 🐍 #python #coding #programming",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
    creator: {
      name: "CodeMaster",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      verified: true,
    },
    topic: "programming",
    likes: 24500,
    saves: 8900,
    shares: 3200,
    views: 156000,
    duration: "0:58",
  },
  {
    id: "2",
    title: "Neural Networks Explained Simply",
    description: "Understanding how AI learns, explained with visual examples 🤖 #ai #machinelearning",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    creator: {
      name: "AI Academy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      verified: true,
    },
    topic: "ai",
    likes: 45200,
    saves: 18700,
    shares: 7800,
    views: 289000,
    duration: "1:15",
  },
  {
    id: "3",
    title: "React Hooks Crash Course",
    description: "Master useState and useEffect in this quick tutorial 🔥 #react #javascript #frontend",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    creator: {
      name: "Dev Tips",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      verified: true,
    },
    topic: "full-stack",
    likes: 32100,
    saves: 12400,
    shares: 5600,
    views: 198000,
    duration: "1:02",
  },
  {
    id: "4",
    title: "SQL Joins Visualized",
    description: "Finally understand INNER, LEFT, RIGHT and FULL joins! 📊 #sql #data #analytics",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    creator: {
      name: "Data Wizards",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      verified: true,
    },
    topic: "data-analytics",
    likes: 18700,
    saves: 9200,
    shares: 2100,
    views: 87000,
    duration: "0:45",
  },
  {
    id: "5",
    title: "Startup Fundraising 101",
    description: "How to pitch to VCs and raise your first round 💰 #startup #business #entrepreneur",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
    creator: {
      name: "Startup School",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
      verified: true,
    },
    topic: "business",
    likes: 28900,
    saves: 15600,
    shares: 8900,
    views: 145000,
    duration: "1:28",
  },
  {
    id: "6",
    title: "Gradient Descent Intuition",
    description: "The core algorithm behind ML optimization explained 🧠 #machinelearning #math",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400",
    creator: {
      name: "ML Fundamentals",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      verified: true,
    },
    topic: "ml",
    likes: 21300,
    saves: 11200,
    shares: 3400,
    views: 112000,
    duration: "1:10",
  },
  {
    id: "7",
    title: "First Principles Thinking",
    description: "How Elon Musk solves impossible problems 💡 #criticalthinking #mindset",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400",
    creator: {
      name: "Mind Upgrade",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100",
      verified: false,
    },
    topic: "critical-thinking",
    likes: 35600,
    saves: 19800,
    shares: 12300,
    views: 234000,
    duration: "1:35",
  },
  {
    id: "8",
    title: "CSS Grid in 2 Minutes",
    description: "Build complex layouts with ease! 🎨 #css #webdev #frontend",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400",
    creator: {
      name: "CSS Tricks",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      verified: true,
    },
    topic: "full-stack",
    likes: 19200,
    saves: 8700,
    shares: 2900,
    views: 98000,
    duration: "1:58",
  },
];

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};
