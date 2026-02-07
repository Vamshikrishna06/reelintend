import { useEffect, useState } from "react";

const Saved = () => {
  const [savedReels, setSavedReels] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedReels") || "[]");
    setSavedReels(stored);
  }, []);

  if (savedReels.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        No saved reels yet
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll">
      {savedReels.map((reel) => (
        <div key={reel.id} className="h-screen">
          <iframe
            src={`${reel.videoUrl}?autoplay=0&mute=1`}
            className="w-full h-full"
            allow="autoplay"
          />
        </div>
      ))}
    </div>
  );
};

export default Saved;
