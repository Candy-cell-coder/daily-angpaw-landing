/**
 * Decorative festive layer — small angpao (🧧) gently falling across the whole
 * page. Purely visual: it sits above the page as a fixed overlay, ignores all
 * clicks (pointer-events: none), and is hidden from assistive tech.
 *
 * Kept subtle (small, semi-transparent, sparse) so text stays readable.
 */

// Fixed, hand-tuned set so the fall looks natural (no randomness needed).
// Small, sparse, medium speed. l = left %, s = size px, d = fall duration s,
// delay = start delay s, o = opacity.
const PACKETS = [
  { l: 8, s: 12, d: 12, delay: 0, o: 0.5 },
  { l: 22, s: 15, d: 13, delay: 3, o: 0.5 },
  { l: 37, s: 11, d: 12.5, delay: 6.5, o: 0.45 },
  { l: 50, s: 14, d: 11.5, delay: 1.8, o: 0.5 },
  { l: 64, s: 12, d: 13.5, delay: 4.8, o: 0.45 },
  { l: 78, s: 16, d: 12, delay: 8, o: 0.5 },
  { l: 91, s: 11, d: 13, delay: 2.4, o: 0.45 },
  { l: 45, s: 13, d: 14, delay: 9.5, o: 0.45 },
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
