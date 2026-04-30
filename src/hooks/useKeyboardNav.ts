import { useEffect } from 'react';

interface KeyboardHandlers {
  onPrev: () => void;
  onNext: () => void;
  onRandom?: () => void;
}

export function useKeyboardNav({
  onPrev,
  onNext,
  onRandom,
}: KeyboardHandlers): void {
  useEffect(() => {
    function handler(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onNext();
          break;
        case ' ':
        case 'Enter':
          if (onRandom) {
            event.preventDefault();
            onRandom();
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [onPrev, onNext, onRandom]);
}
