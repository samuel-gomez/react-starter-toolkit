import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@axa-fr/react-toolkit-all';
import { RESILIENCE_MODE, DEFAULT_CLASS_ALERT, DEFAULT_CLASS_CONTAINER } from './constants';

export const Empty = () => null;

export const setClassModifier = ({ type, resilienceModifier }) => [type, resilienceModifier !== '' ? resilienceModifier : ''].join(' ').trim();

export const setClassName = ({ resilienceModifier, classAlertCt = DEFAULT_CLASS_ALERT, classContainerCt = DEFAULT_CLASS_CONTAINER }) =>
  resilienceModifier === classContainerCt ? `${classContainerCt} ${classAlertCt}` : classAlertCt;

const ResilienceSubstitut = ({ anomaly, children, resilienceMode, FallbackComponent, resilienceModifier, setClassModifierFn, setClassNameFn }) => {
  const { label, detail, type = 'error', iconName = 'exclamation-sign' } = anomaly;
  const classModifier = setClassModifierFn({ type, resilienceModifier });
  const className = setClassNameFn({ resilienceModifier });
  return {
    [RESILIENCE_MODE.ALERT]: (
      <Alert className={className} title={label} icon={iconName} classModifier={classModifier}>
        {detail && <p>{detail}</p>}
        {children}
      </Alert>
    ),
    [RESILIENCE_MODE.NONE]: null,
    [RESILIENCE_MODE.FALLBACK]: <FallbackComponent />,
  }[resilienceMode];
};

ResilienceSubstitut.propTypes = {
  anomaly: PropTypes.shape({
    label: PropTypes.string,
    detail: PropTypes.string,
    type: PropTypes.string,
    iconName: PropTypes.string,
  }).isRequired,
  resilienceMode: PropTypes.string,
  resilienceModifier: PropTypes.string,
  children: PropTypes.node,
  FallbackComponent: PropTypes.elementType,
  setClassModifierFn: PropTypes.func,
  setClassNameFn: PropTypes.func,
};

ResilienceSubstitut.defaultProps = {
  children: null,
  resilienceMode: 'alert',
  resilienceModifier: '',
  FallbackComponent: Empty,
  setClassModifierFn: setClassModifier,
  setClassNameFn: setClassName,
};

export default ResilienceSubstitut;
