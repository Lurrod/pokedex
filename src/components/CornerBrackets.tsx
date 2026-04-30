import { motion } from 'framer-motion';

interface CornerBracketsProps {
  color?: string;
  size?: number;
  thickness?: number;
}

interface Corner {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
}

export function CornerBrackets({
  color = '#22d3ee',
  size = 14,
  thickness = 2,
}: CornerBracketsProps) {
  const corners: Corner[] = [
    { top: 0, left: 0, borderTop: true, borderLeft: true },
    { top: 0, right: 0, borderTop: true, borderRight: true },
    { bottom: 0, right: 0, borderBottom: true, borderRight: true },
    { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      {corners.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            width: size,
            height: size,
            borderTop: c.borderTop ? `${thickness}px solid ${color}` : undefined,
            borderRight: c.borderRight ? `${thickness}px solid ${color}` : undefined,
            borderBottom: c.borderBottom ? `${thickness}px solid ${color}` : undefined,
            borderLeft: c.borderLeft ? `${thickness}px solid ${color}` : undefined,
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      ))}
    </div>
  );
}
