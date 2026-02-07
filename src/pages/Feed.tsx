import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { formatNumber } from "@/data/mockData";
import { Heart, Bookmark, Share2, BadgeCheck } from "lucide-react";
import BottomNav from "@/components/BottomNav";

/* Reel Card */
const ReelCard = ({
  reel,
  isActive,
  isMutedGlobal,
  setIsMutedGlobal,
}: {
  reel: any;
  isActive: boolean;
  isMutedGlobal: boolean;
  setIsMutedGlobal: (v: boolean) => void;
}) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes || 1000);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
  const saved = JSON.parse(localStorage.getItem("savedReels") || "[]");

  if (isSaved) {
    const updated = saved.filter((r: any) => r.id !== reel.id);
    localStorage.setItem("savedReels", JSON.stringify(updated));
  } else {
    saved.push(reel);
    localStorage.setItem("savedReels", JSON.stringify(saved));
  }

  setIsSaved(!isSaved);
};

  return (
    <div className="reel-item h-screen w-full relative flex-shrink-0 snap-start">
      <iframe
        ref={videoRef}
        src={`${reel.videoUrl}?autoplay=${isActive ? 1 : 0}&mute=${isMutedGlobal ? 1 : 0}`}
        allow="autoplay; encrypted-media"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Right Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5 z-10">

  {/* Speaker */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setIsMutedGlobal(!isMutedGlobal);
    }}
    className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white backdrop-blur-sm"
  >
    {isMutedGlobal ? "🔇" : "🔊"}
  </button>

  {/* Like */}
  <button onClick={handleLike} className="flex flex-col items-center">
    <Heart className={`w-6 h-6 ${isLiked ? "text-red-500" : "text-white"}`} />
    <span className="text-xs text-white">{formatNumber(likeCount)}</span>
  </button>

  {/* Save */}
  <button onClick={handleSave}>
    <Bookmark className={`w-6 h-6 ${isSaved ? "text-primary" : "text-white"}`} />
  </button>

</div>


      {/* Bottom info */}
      <div className="absolute bottom-24 left-0 right-20 p-4 z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-white">{reel.creator?.name}</span>
          {reel.creator?.verified && (
            <BadgeCheck className="w-4 h-4 text-primary fill-primary" />
          )}
        </div>

        <h3 className="font-medium mb-2 text-white">{reel.title}</h3>
        <p className="text-sm text-white/80">{reel.description}</p>
      </div>
    </div>
  );
};

/* Feed Page */
const Feed = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedTopic = params.get("topic") || "learning";

  const [activeIndex, setActiveIndex] = useState(0);
  const [reels, setReels] = useState<any[]>([]);
  const [nextToken, setNextToken] = useState("");
  const [isMutedGlobal, setIsMutedGlobal] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Reset when topic changes */
  useEffect(() => {
    setReels([]);
    setNextToken("");
  }, [selectedTopic]);

  /* Fetch reels */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reels/${selectedTopic}?pageToken=${nextToken}`)
      .then((res) => {
        const mapped = res.data.items.map((v: any) => ({
          id: v.id.videoId,
          videoUrl: `https://www.youtube.com/embed/${v.id.videoId}`,
          title: v.snippet.title,
          description: v.snippet.description,
          likes: Math.floor(Math.random() * 50000) + 500,
          creator: {
            name: v.snippet.channelTitle,
            avatar: v.snippet.thumbnails.default.url,
            verified: false,
          },
        }));

        setReels((prev) => [...prev, ...mapped]);
        setNextToken(res.data.nextPageToken);
      });
  }, [selectedTopic]);

  /* Scroll detection */
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const newIndex = Math.round(scrollTop / clientHeight);
    setActiveIndex(newIndex);

    if (scrollTop + clientHeight >= scrollHeight - 200 && nextToken) {
      axios
        .get(`http://localhost:5000/api/reels/${selectedTopic}?pageToken=${nextToken}`)
        .then((res) => {
          const mapped = res.data.items.map((v: any) => ({
            id: v.id.videoId,
            videoUrl: `https://www.youtube.com/embed/${v.id.videoId}`,
            title: v.snippet.title,
            description: v.snippet.description,
            likes: Math.floor(Math.random() * 50000) + 500,
            creator: {
              name: v.snippet.channelTitle,
              avatar: v.snippet.thumbnails.default.url,
              verified: false,
            },
          }));

          setReels((prev) => [...prev, ...mapped]);
          setNextToken(res.data.nextPageToken);
        });
    }
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll reel-container hide-scrollbar"
      >
        {reels.map((reel, index) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            isActive={index === activeIndex}
            isMutedGlobal={isMutedGlobal}
            setIsMutedGlobal={setIsMutedGlobal}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Feed;
