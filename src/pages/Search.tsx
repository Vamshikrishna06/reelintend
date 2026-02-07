import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { dummyReels, topics } from "@/data/mockData";
import { Search as SearchIcon, TrendingUp, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredReels = searchQuery
    ? dummyReels.filter(
        (reel) =>
          reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reel.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reel.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const trendingTopics = topics.slice(0, 6);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong p-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search topics, creators, reels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-12 pr-12 h-12 rounded-2xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {searchQuery ? (
          // Search Results
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">
              Results for "{searchQuery}"
            </h2>
            {filteredReels.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredReels.map((reel) => (
                  <motion.button
                    key={reel.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-[9/16] rounded-2xl overflow-hidden group"
                    onClick={() => navigate("/feed")}
                  >
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-medium line-clamp-2 text-left">
                        {reel.title}
                      </p>
                      <p className="text-xs text-foreground/70 mt-1">
                        {reel.creator.name}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found</p>
              </div>
            )}
          </motion.div>
        ) : (
          // Trending Topics
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Trending Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Trending Topics</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {trendingTopics.map((topic, index) => (
                  <motion.button
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSearchQuery(topic.name)}
                    className="glass-card p-4 rounded-2xl text-left hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="text-xs text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {topic.reelCount.toLocaleString()} reels
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Searches placeholder */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {["React Hooks", "Python basics", "SQL tips", "Startup growth", "AI tools", "CSS tricks"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="glass-card px-4 py-2 rounded-full text-sm hover:bg-muted/30 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
