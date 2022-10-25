import dracula from 'prism-react-renderer/themes/dracula';
import { useState } from 'react';
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
  ({ code, scope, className, styleLivePreview = {}, theme = dracula, modalProps }: TLiveCode) => (
    <article className={className}>
      <LiveProvider theme={theme} code={`<>${code}</>`} scope={{ ...reactTookitAll, useState, ...scope, modalProps }}>
        <LivePreview style={{ ...styleLivePreviewDefault, ...styleLivePreview }} />
        <LiveError />
      </LiveProvider>
      <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '1rem', fontSize: '0.8rem', position: 'relative' }}>
            <ClipBoard content={code} />
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
