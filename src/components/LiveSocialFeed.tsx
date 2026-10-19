import React, { useState } from 'react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Share2, 
  Sparkles, 
  X, 
  ArrowUpRight, 
  Flame, 
  Eye, 
  Clock, 
  Bookmark 
} from 'lucide-react';
import platedDishImg from '../assets/images/luminary_plated_dish_1791143053718.jpg';
import openFireImg from '../assets/images/luminary_open_fire_1791143030752.jpg';
import diningHeroImg from '../assets/images/luminary_hero_dining_1791143020999.jpg';
import conservatoryImg from '../assets/images/luminary_conservatory_1791155233511.jpg';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  author: string;
  likes: number;
  commentsCount: number;
  timeAgo: string;
  tag: string;
  isDailySpecial?: boolean;
}

const SOCIAL_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: platedDishImg,
    caption: 'Tonight’s culinary spotlight: wild Brittany turbot filleted at 3 PM, crisped directly over white-oak binchotan coals, crowned with smoked trout roe and golden verjus emulsion. Only 18 covers tonight.',
    author: 'luminarydining',
    likes: 1842,
    commentsCount: 74,
    timeAgo: '2 hours ago',
    tag: 'Daily Hearth Special',
    isDailySpecial: true,
  },
  {
    id: 'post-2',
    image: openFireImg,
    caption: 'Chef Elias stoking the Hudson Valley binchotan coals at 4:45 PM. The hearth reaches 420°C before the first guest crosses our Mercer Street threshold.',
    author: 'luminarydining',
    likes: 2410,
    commentsCount: 119,
    timeAgo: '6 hours ago',
    tag: 'Behind the Pass',
  },
  {
    id: 'post-3',
    image: conservatoryImg,
    caption: 'Golden hour filtering through the Soho cast-iron skylight inside our Botanical Conservatory. Autumn foliage installation by @studiofloras.',
    author: 'guest_curator',
    likes: 1290,
    commentsCount: 42,
    timeAgo: '1 day ago',
    tag: 'Guest Perspective',
  },
  {
    id: 'post-4',
    image: diningHeroImg,
    caption: 'Room lit. Embers glowing. Table 4 awaits a 10th anniversary celebration. Hospitality is remembering the smallest details.',
    author: 'luminarydining',
    likes: 3105,
    commentsCount: 153,
    timeAgo: '2 days ago',
    tag: 'Sanctuary',
  },
  {
    id: 'post-5',
    image: platedDishImg,
    caption: 'Study in balance: hand-pinched agnolotti bathed in molten sheep milk ricotta, brown butter emulsion, and generous shavings of Norcia winter truffle.',
    author: 'michelin_eats_ny',
    likes: 1980,
    commentsCount: 88,
    timeAgo: '3 days ago',
    tag: 'Tasting Journey',
    isDailySpecial: true,
  },
  {
    id: 'post-6',
    image: openFireImg,
    caption: 'The final dessert course being scorched with live cherrywood embers: caramelized mission fig with wild rosemary honey.',
    author: 'luminarydining',
    likes: 2215,
    commentsCount: 96,
    timeAgo: '4 days ago',
    tag: 'Pastry Hearth',
  },
];

export const LiveSocialFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <section id="social-feed" className="px-6 py-20 md:px-12 md:py-28 bg-[#0e0c0a] border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-3">
              <Instagram size={14} className="text-[#c7a85c]" />
              <span>Live Social Feed · Soho Daily Dispatch</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-white leading-tight">
              Stories from the <br />
              <em className="font-normal text-[#c7a85c]">Hearth & Pass</em>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <span className="text-xs font-serif text-white block">48.2k Patrons</span>
              <span className="text-[10px] uppercase tracking-wider text-white/40">Instagram Community</span>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-3d flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.2em]"
            >
              <Instagram size={13} />
              <span>@luminarydining</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Dynamic Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const currentLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#161310] border border-white/10 cursor-pointer card-3d-hover"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

                {/* Badge if daily special */}
                {post.isDailySpecial && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="flex items-center gap-1 rounded-full bg-[#c7a85c] text-[#0b0a09] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider shadow-md">
                      <Flame size={10} className="fill-current" />
                      <span>Today</span>
                    </span>
                  </div>
                )}

                {/* Hover overlay data */}
                <div className="absolute inset-0 z-10 p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#e5c97d] truncate">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-3 text-white text-xs mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="fill-red-500 text-red-500" />
                      {currentLikes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {post.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* LIGHTBOX MODAL */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-up"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="relative max-w-2xl w-full rounded-2xl border border-white/20 bg-[#14120f] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button with red hover */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all duration-200 hover:text-red-500 hover:bg-red-500/20 hover:border-red-500/50 cursor-pointer"
                aria-label="Close post"
              >
                <X size={16} />
              </button>

              <div className="grid sm:grid-cols-[1fr_1fr]">
                {/* Photo */}
                <div className="relative aspect-square sm:aspect-auto sm:h-full bg-black">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.caption}
                    className="w-full h-full object-cover"
                  />
                  {selectedPost.isDailySpecial && (
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-[#c7a85c] text-[#0b0a09] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <Flame size={12} className="fill-current" />
                        <span>Daily Special</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between bg-[#14120f]">
                  <div>
                    {/* Author bar */}
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#c7a85c] to-[#e5c97d] p-0.5">
                        <div className="h-full w-full rounded-full bg-[#0b0a09] flex items-center justify-center font-serif text-xs text-[#c7a85c]">
                          L
                        </div>
                      </div>
                      <div>
                        <span className="font-serif text-sm text-white font-medium block">
                          @{selectedPost.author}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#c7a85c]">
                          18 Mercer Street, Soho
                        </span>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="mt-4 max-h-48 overflow-y-auto pr-2 space-y-3">
                      <p className="text-xs text-white/80 leading-relaxed font-sans">
                        {selectedPost.caption}
                      </p>
                      <div className="flex flex-wrap gap-2 text-[10px] text-[#c7a85c]">
                        <span>#LuminarySoho</span>
                        <span>#WoodFiredMichelin</span>
                        <span>#BinchotanCraft</span>
                        <span>#TwoMichelinStars</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & likes */}
                  <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(selectedPost.id)}
                          className="flex items-center gap-1.5 text-xs text-white transition-transform active:scale-125 cursor-pointer"
                        >
                          <Heart
                            size={18}
                            className={likedPosts[selectedPost.id] ? 'fill-red-500 text-red-500' : 'hover:text-red-400'}
                          />
                          <span>{selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)}</span>
                        </button>
                        <span className="flex items-center gap-1 text-xs text-white/60">
                          <MessageCircle size={16} />
                          <span>{selectedPost.commentsCount}</span>
                        </span>
                      </div>

                      <span className="text-[10px] text-white/40 flex items-center gap-1">
                        <Clock size={11} />
                        <span>{selectedPost.timeAgo}</span>
                      </span>
                    </div>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold-3d w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] uppercase tracking-[0.2em]"
                    >
                      <span>View on Instagram</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
