import vsDark from 'prism-react-renderer/themes/vsDark';
import React from 'react';
import { LiveProviderProps, LiveProvider, LiveError, LivePreview } from 'react-live';
import * as reactTookitAll from '@axa-fr/react-toolkit-all';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Highlight, { defaultProps } from 'prism-react-renderer';
import ClipBoard from './ClipBoard';
import './Livecode.scss';
import { TReturnUseToggleModal } from '../ModalCommon';

type TLiveCode = {
  code: string;
  scope: LiveProviderProps['scope'];
  theme?: LiveProviderProps['theme'];
  className?: string;
  onChange?: (arg: string) => void;
  styleLiveEditor?: React.CSSProperties;
  styleLivePreview?: React.CSSProperties;
  modalProps?: TReturnUseToggleModal;
};

const styleLivePreviewDefault = { background: 'white', padding: '2rem', width: '100%' } as const;

const LiveCode = withClassNameModifier(
  ({ code, scope, className, styleLivePreview = {}, theme = vsDark, modalProps }: TLiveCode) => (
    <article className={className}>
      <LiveProvider theme={theme} code={`<>${code}</>`} scope={{ ...reactTookitAll, ...scope, modalProps }}>
        <LivePreview aria-label="demo-preview" style={{ ...styleLivePreviewDefault, ...styleLivePreview }} />
        <LiveError />
      </LiveProvider>
      <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre aria-label="demo-source-code" className={className} style={{ ...style, padding: '1rem', fontSize: '0.8rem', position: 'relative' }}>
            <ClipBoard content={code} />
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
        )}
      </Highlight>
    </article>
  ),
  'af-livecode',
);

export default LiveCode;
