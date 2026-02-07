import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { topics } from "@/data/mockData";
import { Check, ArrowRight } from "lucide-react";

const TopicSelection = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);

  const toggleTopic = (topic: any) => {
    setSelectedTopics((prev) =>
      prev.find((t) => t.id === topic.id)
        ? prev.filter((t) => t.id !== topic.id)
        : [...prev, topic]
    );
  };

  /* IMPORTANT */
  const handleContinue = () => {
    if (selectedTopics.length > 0) {
      navigate(`/feed?topic=${encodeURIComponent(selectedTopics[0].name)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full z-10 flex-1 flex flex-col">

        <h1 className="text-3xl font-display font-bold mb-6 text-center">
          What do you want to <span className="gradient-text">learn</span>?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {topics.map((topic) => {
            const isSelected = selectedTopics.find((t) => t.id === topic.id);

            return (
              <motion.button
                key={topic.id}
                onClick={() => toggleTopic(topic)}
                className={`relative p-6 rounded-2xl text-left ${
                  isSelected
                    ? "glass-strong ring-2 ring-primary"
                    : "glass-card"
                }`}
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-lg font-semibold">{topic.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>

                {isSelected && (
                  <Check className="absolute top-3 right-3 w-5 h-5" />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="neon"
            size="xl"
            onClick={handleContinue}
            disabled={selectedTopics.length === 0}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default TopicSelection;
