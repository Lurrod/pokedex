import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speedMs = 22): string {
  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput('');
    if (!text) return;

    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setOutput(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(id);
      }
    }, speedMs);

    return () => {
      window.clearInterval(id);
    };
  }, [text, speedMs]);

  return output;
}
