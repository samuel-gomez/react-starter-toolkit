import { themes } from 'prism-react-renderer';
import React from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import * as reactTookitAll from '@axa-fr/react-toolkit-all';
import withClassNameModifier, { TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import { TReturnUseToggleModal } from '../ModalCommon';
import TabsLiveCode from './TabsLiveCode';
import Accessibility from './Accessibility';
import Code from './Code';
import ReadMe from './ReadMe';
import './Livecode.scss';

type LiveProviderProps = React.ComponentProps<typeof LiveProvider>;

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
  hideCode?: boolean;
  hideAccessibility?: boolean;
  hideReadme?: boolean;
} & TwithClassNameModifier;

const styleLivePreviewDefault = { background: 'white', padding: '2rem', width: '100%' } as const;
const ariaLabel = 'af-accessibility' as const;

const LiveCode = withClassNameModifier(
  ({
    code,
    scope,
    githubPackage,
    className,
    styleLivePreview = {},
    theme = themes.vsDark,
    modalProps,
    hideCode = false,
    hideAccessibility = false,
    hideReadme = false,
  }: TLiveCode) => (
    <article className={className}>
      <LiveProvider theme={theme} code={`<>${code}</>`} scope={{ ...reactTookitAll, ...scope, modalProps }}>
        <LivePreview aria-label={ariaLabel} style={{ ...styleLivePreviewDefault, ...styleLivePreview }} />
        <LiveError />
      </LiveProvider>
      <TabsLiveCode>
        <Code key="code" hideComponent={hideCode} title="Code" icon="copyright-mark" theme={theme} code={code} />
        <Accessibility key="accessibility" hideComponent={hideAccessibility} code={code} title="Accessibilité" icon="font" ariaLabel={ariaLabel} />
        <ReadMe key="readme" hideComponent={hideReadme} title="Readme" icon="book" githubPackage={githubPackage} />
      </TabsLiveCode>
    </article>
  ),
  { defaultClassName: 'af-livecode' },
);

export default LiveCode;
