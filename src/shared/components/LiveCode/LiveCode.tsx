import theme from 'prism-react-renderer/themes/dracula';
import { LiveProviderProps, LiveProvider, LiveError, LivePreview } from 'react-live';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Highlight, { defaultProps } from 'prism-react-renderer';
import './livecode.scss';

type TLiveCode = {
  code: string;
  scope: LiveProviderProps['scope'];
  theme?: LiveProviderProps['theme'];
  className?: string;
  onChange?: (arg: string) => void;
  styleLiveEditor?: React.CSSProperties;
  styleLivePreview?: React.CSSProperties;
};

const LiveCode = withClassNameModifier(
  ({ code, scope, className, styleLivePreview = { background: 'white', padding: '2rem' } }: TLiveCode) => (
    <article className={className}>
      <LiveProvider theme={theme} code={code} scope={scope}>
        <LivePreview style={styleLivePreview} />
        <LiveError />
      </LiveProvider>
      <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, fontSize: '0.8rem' }}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </article>
  ),
  'af-livecode',
);

export default LiveCode;
