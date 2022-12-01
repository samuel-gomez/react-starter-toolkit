import vsDark from 'prism-react-renderer/themes/vsDark';
import React from 'react';
import { LiveProviderProps, LiveProvider, LiveError, LivePreview } from 'react-live';
import * as reactTookitAll from '@axa-fr/react-toolkit-all';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import { TReturnUseToggleModal } from '../ModalCommon';
import TabsLiveCode from './TabsLiveCode';
import Accessibility from './Accessibility';
import Code from './Code';
import ReadMe from './ReadMe';
import './Livecode.scss';

type TLiveCode = {
  code: string;
  githubPackage?: string;
  scope: LiveProviderProps['scope'];
  theme?: LiveProviderProps['theme'];
  className?: string;
  onChange?: (arg: string) => void;
  styleLiveEditor?: React.CSSProperties;
  styleLivePreview?: React.CSSProperties;
  modalProps?: TReturnUseToggleModal;
};

const styleLivePreviewDefault = { background: 'white', padding: '2rem', width: '100%' } as const;
const ariaLabel = 'af-accessibility' as const;

const LiveCode = withClassNameModifier(
  ({ code, scope, githubPackage, className, styleLivePreview = {}, theme = vsDark, modalProps }: TLiveCode) => (
    <article className={className}>
      <LiveProvider theme={theme} code={`<>${code}</>`} scope={{ ...reactTookitAll, ...scope, modalProps }}>
        <LivePreview aria-label={ariaLabel} style={{ ...styleLivePreviewDefault, ...styleLivePreview }} />
        <LiveError />
      </LiveProvider>
      <TabsLiveCode>
        <Code title="Code" icon="copyright-mark" theme={theme} code={code} />
        <Accessibility title="Accessibilité" icon="font" ariaLabel={ariaLabel} />
        <ReadMe title="Readme" icon="book" githubPackage={githubPackage} />
      </TabsLiveCode>
    </article>
  ),
  'af-livecode',
);

export default LiveCode;
