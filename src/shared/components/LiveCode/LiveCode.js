import React from 'react';
import PropTypes from 'prop-types';
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
  code: PropTypes.string.isRequired,
  scope: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object, PropTypes.array])).isRequired,
  className: PropTypes.string,
};

LiveCode.defaultProps = {
  className: 'af-livecode',
};

export default LiveCode;
