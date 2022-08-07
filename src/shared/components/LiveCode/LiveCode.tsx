import dracula from 'prism-react-renderer/themes/dracula';
import { LiveProviderProps, LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import './livecode.scss';

type TLiveCode = LiveProviderProps & {
  className?: string;
  styleLiveEditor?: React.CSSProperties;
  styleLivePreview?: React.CSSProperties;
};

const LiveCode = ({
  code,
  scope,
  theme = dracula,
  className = 'af-livecode',
  styleLiveEditor = { fontSize: '12px' },
  styleLivePreview = { padding: '2rem', border: '3px solid #ccc' },
}: TLiveCode) => (
  <article className={className}>
    <LiveProvider theme={theme} code={code} scope={scope}>
      <LiveEditor style={styleLiveEditor} />
      <LiveError />
      <LivePreview style={styleLivePreview} />
    </LiveProvider>
  </article>
);

export default LiveCode;
