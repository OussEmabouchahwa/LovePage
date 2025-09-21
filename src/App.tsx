import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Music, Moon, Sun, Crown, Flower2 } from "lucide-react";
import salwaVideo from "./assets/salwa.mp4";
import loveImg from "./assets/love.png";
import zina from "./assets/Zina.mp3"; // <-- local music

// --- Utility: fancy date string ---
const nowStr = () =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

const nicknames = [
  { key: "salwa", label: "Salwa", icon: <Crown className="w-5 h-5" /> },
  { key: "doctora", label: "Doctora Slimen", icon: <Flower2 className="w-5 h-5" /> },
  { key: "doudty", label: "Doudty", icon: <Sparkles className="w-5 h-5" /> },
];

// Floating heart particle
const HeartParticle: React.FC = () => {
const left = useMemo(() => Math.random() * 100, []);
const delay = useMemo(() => Math.random() * 4, []);
const size = useMemo(() => 12 + Math.random() * 18, []);
return (
<motion.div
initial={{ y: 0, opacity: 0 }}
animate={{ y: -220, opacity: [0, 1, 1, 0] }}
transition={{ duration: 6 + Math.random() * 3, delay, repeat: Infinity, ease: "easeOut" }}
className="pointer-events-none absolute bottom-0"
style={{ left: `${left}%` }}
>
<Heart className="opacity-70" style={{ width: size, height: size }} />
</motion.div>
);
};

// Glass card wrapper
const Card: React.FC<{ className?: string; children?: React.ReactNode }> = ({
  className = "",
  children,
}) => (
  <div className={`backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function LovePage() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState(nicknames[0]);
  const [ts, setTs] = useState(nowStr());
  const [showUnmute, setShowUnmute] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTs(nowStr()), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Try to autoplay music on mount; if blocked, show Unmute button
  useEffect(() => {
    const tryPlay = async () => {
      try {
        await audioRef.current?.play();
        setShowUnmute(false);
      } catch {
        setShowUnmute(true);
      }
    };
    tryPlay();
  }, []);

  const handleUnmute = async () => {
    try {
      await audioRef.current?.play();
      setShowUnmute(false);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-sky-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 text-slate-800 dark:text-slate-100">
      {/* hidden audio element (autoplay loop) */}
      <audio ref={audioRef} src={zina} autoPlay loop />

      {/* Floating hearts */}
     <div className="absolute inset-0 opacity-30 text-rose-400 dark:text-rose-300">
  {Array.from({ length: 36 }).map((_, i) => (
    <HeartParticle key={i} />
  ))}
</div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-2 rounded-2xl bg-white/40 dark:bg-white/10 border border-white/30"
          >
            <Heart className="w-5 h-5" />
          </motion.div>
          <p className="text-sm opacity-80">{ts}</p>
        </div>
        <div className="flex items-center gap-3">
          {showUnmute && (
            <button
              onClick={handleUnmute}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-rose-300 bg-rose-500/90 text-white hover:bg-rose-600"
              title="Enable music"
            >
              <Music className="w-4 h-4" />
              <span className="text-xs font-semibold">Unmute Music</span>
            </button>
          )}
          <button
            onClick={() => setDark((d) => !d)}
            className="group inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/30 bg-white/40 dark:bg-white/10 hover:bg-white/60 transition"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-xs opacity-80">{dark ? "Light" : "Dark"} mode</span>
          </button>
        </div>
      </div>

      {/* Center hero */}
      <div className="relative z-10 flex flex-col items-center px-5 sm:px-8 pt-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <Card className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left: text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-300 font-medium mb-3">
                  <Sparkles className="w-4 h-4" />
                  Surprise for my love
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                  I love you
                  <span className="block bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                    {" "}
                    {active.label}
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg opacity-80 max-w-prose mx-auto lg:mx-0">
                  Every heartbeat writes your name in my sky. Today I built you this little world—just for us.
                </p>

                {/* Nickname switcher */}
                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {nicknames.map((n) => (
                    <button
                      key={n.key}
                      onClick={() => setActive(n)}
                      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border transition ${
                        active.key === n.key
                          ? "bg-rose-500/90 text-white border-rose-400"
                          : "bg-white/40 dark:bg-white/10 border-white/30 hover:bg-white/60"
                      }`}
                    >
                      {n.icon}
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: photo card */}
              <motion.div
                className="flex-1 w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <div className="relative">
                  <div className="aspect-square w-full rounded-3xl overflow-hidden border border-white/30">
                    <img
                      src={loveImg}
                      alt="Salwa & Oussema — love moment"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <motion.div
                    className="absolute -top-5 -right-4"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <Card className="px-4 py-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm opacity-80">For {active.label} with ♥</span>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Love Letter (added back) */}
        <section id="love-letter" className="w-full max-w-4xl mt-10">
          <Card className="p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500" />
              A Love Letter
            </h2>
            <p className="mt-4 leading-relaxed opacity-90">
              To my {active.label},
              <br />
              The world is noisy, but your smile is my quiet place. When I call you{" "}
              {active.key === "doctora" ? "Doctora Slimen" : active.key === "doudty" ? "Doudty" : "Salwa"},
              I feel lucky twice—once for the name, and once for the soul that answers it. Every day, I choose you again.
            </p>
            <p className="mt-4 leading-relaxed opacity-90">
              If love had a dashboard, all the metrics would point to you: 100% care, infinite patience, and an uptime
              of forever. Thank you for being my favourite project and my constant home.
            </p>
            <p className="mt-6 font-semibold">— oussema bouchahwa</p>
          </Card>
        </section>

        {/* Optional memory/video block — keep if you like */}
        <section id="memory" className="w-full max-w-4xl mt-6">
          <Card className="p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold">Tiny Memory</h3>
                <p className="opacity-85 mt-2">
                  Remember this moment: you opened this page, and I was smiling, thinking of you. Let this be our little
                  routine—whenever we miss each other, we meet here.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/20">
                  <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                    <source src={salwaVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-5 sm:px-8 pb-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-70">© {new Date().getFullYear()} made with ❤️ by oussema bouchahwa</p>
          <p className="text-xs opacity-70 flex items-center gap-2">
            Crafted for {active.label}
          </p>
        </div>
      </footer>
    </div>
  );
}
