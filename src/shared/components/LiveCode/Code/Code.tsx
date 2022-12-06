import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProviderProps } from 'react-live';
import ClipBoard from '../ClipBoard';

type TCode = {
  title?: string;
  icon?: string;
  theme: LiveProviderProps['theme'];
  code: string;
};

const ariaLabel = 'af-accessibility-code' as const;

const Code = ({ theme, code }: TCode) => (
  <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <>
        <ClipBoard content={code} />
        <pre aria-label={ariaLabel} className={className} style={{ ...style, padding: '1rem', fontSize: '0.8rem', position: 'relative' }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className="token-line__number">{i + 1}</span>
              <span className="token-line__content">
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      </>
    )}
  </Highlight>
);

export default Code;
