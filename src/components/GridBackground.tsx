interface GridBackgroundProps {
  tint: string;
}

export function GridBackground({ tint }: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {/* Vertical fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(34, 211, 238, 0.18), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(168, 85, 247, 0.15), transparent 60%), linear-gradient(180deg, #020617 0%, #0a0f1f 100%)',
        }}
      />

      {/* Tint glow following pokémon type */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${tint}25, transparent 55%)`,
        }}
      />

      {/* Perspective grid */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] [perspective:600px]">
        <div
          className="absolute inset-0 origin-top animate-grid-pan"
          style={{
            transform: 'rotateX(60deg) translateZ(-100px) scale(2.4)',
            backgroundImage: `
              linear-gradient(${tint}55 1px, transparent 1px),
              linear-gradient(90deg, ${tint}55 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage:
              'linear-gradient(180deg, transparent 0%, black 25%, black 80%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(180deg, transparent 0%, black 25%, black 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Subtle horizontal scanlines on top of everything */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
}
