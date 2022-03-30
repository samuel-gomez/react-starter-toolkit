import React from 'react';
import { string, objectOf, oneOfType, func, object, array } from 'prop-types';
import dracula from 'prism-react-renderer/themes/dracula';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';
import './livecode.scss';

const LiveCode = WithClassNameModifier(({ className, code, scope }) => (
  <article className={className}>
    <LiveProvider theme={dracula} code={code} scope={scope}>
      <LiveEditor style={{ fontSize: '12px' }} />
      <LiveError />
      <LivePreview style={{ padding: '2rem', border: '3px solid #ccc' }} />
    </LiveProvider>
  </article>
));

LiveCode.propTypes = {
  code: string.isRequired,
  scope: objectOf(oneOfType([func, string, object, array])).isRequired,
  className: string,
};

LiveCode.defaultProps = {
  className: 'af-livecode',
};

export default LiveCode;
