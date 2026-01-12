import { useState, useEffect } from "react";
import Counter from "./counter.jsx";
import bg from "./assets/b1.png";

// Helper to get Hijri date in desired format
function getHijriDate() {
  const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const parts = formatter.formatToParts(new Date());
  const day = parts.find(p => p.type === 'day')?.value || '';
  const month = parts.find(p => p.type === 'month')?.value || '';
  const year = parts.find(p => p.type === 'year')?.value || '';
  return `${day} ${month} ${year}`;
}

// Helper to get current time in 12-hour format with AM/PM
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();
}

export default function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('dhikrCount');
    return saved !== null ? Number(saved) : 0;
  });

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const hijriToday = getHijriDate(); // Static for the day

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('dhikrCount', count);
  }, [count]);

  return (
    <div className="relative min-h-[100dvh] w-full bg-black overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-left md:bg-left"
        style={{
          backgroundImage: `url("${bg}")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-[100dvh] w-full px-4 py-8">
        <h1 className="text-4xl font-bold">Tasbih Counter</h1>

        <Counter
          value={count}
          onIncrement={() => setCount(c => c + 1)}
          onDecrement={() => setCount(c => Math.max(0, c - 1))}
          onReset={() => setCount(0)}
        />

        {/* Buttons container */}
        <div className="flex gap-5 justify-center flex-wrap">
          
          {/* First button - Color Palette */}
          <div>
            <button
              className="
                w-14 h-14
                bg-blue-300/90 rounded-xl
                flex items-center justify-center
                shadow-md hover:bg-blue-400/90 transition
              "
              title="Change color theme"
            >
              <svg
                viewBox="0 0 512 512"
                className="w-7 h-7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 32C132.3 32 32 121.6 32 232c0 69.6 39.8 130.7 100.1 167.4 20.4 12.3 43.9 18.6 67.7 18.6h31.3c13.3 0 24 10.7 24 24 0 13.3-10.7 24-24 24h-30.8c-17.4 0-31.3 14.2-30.1 31.6 2.5 37.5 40.2 66.4 88.1 66.4 110.5 0 221.7-89.6 221.7-200S379.7 32 256 32zM144 240a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm64-96a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm64 96a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm-96 64a32 32 0 1 1 0-64 32 32 0 0 1 0 64z"/>
              </svg>
            </button>
          </div>

          {/* Second button - Time & Hijri Date */}
          <div>
            <button
              className="
                min-w-[220px] h-14
                bg-blue-300/90 rounded-xl
                flex items-center justify-center
                text-sm sm:text-base font-medium
                px-5 text-center leading-tight
                shadow-md hover:bg-blue-400/90 transition
              "
              
            >
              {currentTime} | {hijriToday} AH
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}