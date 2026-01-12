import { useState, useEffect } from "react";

export default function TasbihCounter({ value, onIncrement, onDecrement, onReset }) {
  const commonTasbihCounts = ["select count",1,33, 99, 100, 1000]; // removed placeholder for cleaner UX
  const [target, setTarget] = useState("select count");
  const [showWin, setShowWin] = useState(false);

  // Check for win condition
  useEffect(() => {
    if (value >= target && target > 0) {
      setShowWin(true);
      
      // Auto reset after celebration (1.8 seconds)
      const timer = setTimeout(() => {
        onReset();
        setShowWin(false);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [value, target, onReset]);

  return (
    <div className="relative w-full max-w-[320px] mx-auto px-4 sm:px-0">
      <div
        className={`
          relative bg-gray-900 rounded-[40px]
          shadow-2xl flex flex-col items-center
          w-full aspect-[3/4] max-w-[320px]
          mx-auto pt-6 sm:pt-8 h-[410px] overflow-hidden
        `}
      >

        {/* Target selector */}
        <div className="relative w-full max-w-xs px-6 mb-2">
          <select
            value={target}
            onChange={(e) => {
              setTarget(Number(e.target.value));
              setShowWin(false); // reset win state when changing target
            }}
            className="
              w-full px-4 py-2.5
              bg-gray-900 text-white
              border border-gray-700 rounded-xl
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-violet-600
              appearance-none text-center font-medium
            "
          >
            {commonTasbihCounts.map((count) => (
              <option key={count} value={count}>
                 {count}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Main Display - Celebration or normal count */}
        <div className="relative mt-2 w-44 h-20 flex items-center justify-center">
          {showWin ? (
            <div className="relative flex flex-col items-center animate-pop">
              <div className="text-3xl font-bold   text-yellow-400">{target} الله أكبر </div>
              {/* Simple confetti effect using CSS (you can use canvas/confetti-js for real one) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="confetti-layer animate-confetti" />
              </div>
            </div>
          ) : (
            <div
              className={`
                bg-gray-800 border rounded-2xl shadow-inner
                w-full h-16
                flex items-center justify-center
                text-5xl sm:text-6xl font-mono tracking-widest
                font-bold text-white
              `}
            >
              {value}
            </div>
          )}
        </div>

        {/* Small control buttons */}
        <div className="flex w-full justify-around mt-6 sm:mt-8 px-8">
          <button
            onClick={onDecrement}
            className="
              w-12 h-12
              bg-gray-200 rounded-full shadow-md
              flex items-center justify-center
              text-2xl font-bold
              hover:bg-gray-300 active:scale-95 transition
            "
          >
            –
          </button>

          <button
            onClick={onReset}
            className="
              w-12 h-12
              bg-gray-200 rounded-full shadow-md
              flex items-center justify-center
              hover:bg-gray-300 active:scale-95 transition
            "
            aria-label="Reset"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.5 2.5L21 7" />
              <path d="M21 3v4h-4" />
              <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.5-2.5L3 17" />
              <path d="M3 21v-4h4" />
            </svg>
          </button>
        </div>
        {/* Big increment button */}
        <button
          onClick={onIncrement}
          className="
            mt-8 sm:mt-7
            w-20 h-20 sm:w-28 sm:h-28
            rounded-full
            bg-gradient-to-br from-white to-gray-300
            shadow-[inset_-6px_-6px_10px_rgba(0,0,0,0.3),inset_6px_6px_10px_rgba(255,255,255,0.6)]
            active:scale-95 transition
          "
        />
      </div>

    
    </div>
  );
}