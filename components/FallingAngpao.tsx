/**
 * Decorative festive layer — small angpao (🧧) gently falling across the whole
 * page. Purely visual: it sits above the page as a fixed overlay, ignores all
 * clicks (pointer-events: none), and is hidden from assistive tech.
 *
 * Kept subtle (small, semi-transparent, sparse) so text stays readable.
 */

// Fixed, hand-tuned set so the fall looks natural (no randomness needed).
// l = left %, s = size px, d = fall duration s, delay = start delay s, o = opacity
const PACKETS = [
  { l: 4, s: 18, d: 13, delay: 0, o: 0.5 },
  { l: 12, s: 24, d: 16, delay: 2.5, o: 0.55 },
  { l: 20, s: 14, d: 11, delay: 5, o: 0.4 },
  { l: 28, s: 20, d: 15, delay: 1.2, o: 0.5 },
  { l: 36, s: 16, d: 12, delay: 3.8, o: 0.45 },
  { l: 44, s: 26, d: 18, delay: 6.2, o: 0.55 },
  { l: 52, s: 15, d: 10, delay: 0.8, o: 0.4 },
  { l: 60, s: 22, d: 14, delay: 4.5, o: 0.5 },
  { l: 68, s: 18, d: 13, delay: 2, o: 0.5 },
  { l: 76, s: 25, d: 17, delay: 5.6, o: 0.55 },
  { l: 84, s: 14, d: 11, delay: 1.6, o: 0.4 },
  { l: 92, s: 20, d: 15, delay: 3.2, o: 0.5 },
  { l: 16, s: 16, d: 12, delay: 7, o: 0.45 },
  { l: 48, s: 19, d: 16, delay: 8.5, o: 0.5 },
  { l: 72, s: 15, d: 12, delay: 6.8, o: 0.4 },
  { l: 88, s: 22, d: 14, delay: 9.2, o: 0.5 },
];

export default function FallingAngpao() {
  return (
    <div className="angpao-rain" aria-hidden="true">
      {PACKETS.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.l}%`,
            fontSize: `${p.s}px`,
            opacity: p.o,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          🧧
        </span>
      ))}
    </div>
  );
}
