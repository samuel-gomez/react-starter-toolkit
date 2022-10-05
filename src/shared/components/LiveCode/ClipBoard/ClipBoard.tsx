import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@axa-fr/react-toolkit-all';
import './ClipBoard.scss';

export const useClipBoard = ({ content }: { content: string }) => {
  const [clicked, setClicked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onClick = useCallback(() => {
    setClicked(true);
    navigator.clipboard.writeText(content);
    timerRef.current = setTimeout(() => setClicked(false), 1000);
  }, [content]);
  useEffect(() => () => clearTimeout(timerRef.current as NodeJS.Timeout), []);

  return { onClick, clicked };
};

export type TReturnUseClipBoard = ReturnType<typeof useClipBoard>;

export type TClipBoard = { content: string; useClipBoardFn?: typeof useClipBoard };

const ClipBoard = ({ content, useClipBoardFn = useClipBoard }: TClipBoard) => {
  const { onClick, clicked } = useClipBoardFn({ content });
  const classClicked = clicked ? ' af-clipboard--clicked' : '';

  return (
    <Button title="Copy to clipboard" className={`af-btn--circle af-clipboard${classClicked}`}>
      <i className="glyphicon glyphicon-copy" onClick={onClick}></i>
      <span className="af-clipboard__message">Copied !</span>
    </Button>
  );
};

export default ClipBoard;
