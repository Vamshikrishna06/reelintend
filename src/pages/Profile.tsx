import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { dummyReels, topics } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";
import {
  Settings,
  Edit3,
  Heart,
  Bookmark,
  Clock,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"liked" | "saved" | "history">("liked");

  // Demo user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
    joinDate: "Jan 2024",
    stats: {
      watched: 156,
      liked: 48,
      saved: 23,
    },
    selectedTopics: ["programming", "ai", "full-stack", "business"],
  };

  const likedReels = dummyReels.slice(0, 3);
  const savedReels = dummyReels.slice(2, 5);
  const historyReels = dummyReels.slice(0, 6);

  const currentReels =
    activeTab === "liked"
      ? likedReels
      : activeTab === "saved"
      ? savedReels
      : historyReels;

  const userTopics = topics.filter((t) => user.selectedTopics.includes(t.id));

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong p-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold">Profile</h1>
        <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {user.joinDate}
              </p>
            </div>
            <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{user.stats.watched}</p>
              <p className="text-xs text-muted-foreground">Watched</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{user.stats.liked}</p>
              <p className="text-xs text-muted-foreground">Liked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{user.stats.saved}</p>
              <p className="text-xs text-muted-foreground">Saved</p>
            </div>
          </div>
        </motion.div>

        {/* Topics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Topics</h3>
            <button
              onClick={() => navigate("/topics")}
              className="text-sm text-primary flex items-center gap-1"
            >
              Edit <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {userTopics.map((topic) => (
              <div
                key={topic.id}
                className="glass-card px-3 py-2 rounded-full flex items-center gap-2"
              >
                <span>{topic.icon}</span>
                <span className="text-sm">{topic.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-4">
            {[
              { id: "liked" as const, icon: Heart, label: "Liked" },
              { id: "saved" as const, icon: Bookmark, label: "Saved" },
              { id: "history" as const, icon: Clock, label: "History" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? "gradient-primary text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Reels Grid */}
          <div className="grid grid-cols-3 gap-2">
            {currentReels.map((reel) => (
              <motion.button
                key={reel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => navigate("/feed")}
                className="relative aspect-[9/16] rounded-xl overflow-hidden group"
              >
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-medium line-clamp-1">{reel.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            variant="glass"
            size="lg"
            className="w-full text-destructive hover:bg-destructive/10"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
