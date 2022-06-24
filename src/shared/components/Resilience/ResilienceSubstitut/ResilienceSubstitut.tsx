import { ElementType, ReactNode } from 'react';
import { Alert } from '@axa-fr/react-toolkit-all';
import type { Tanomaly } from 'shared/types';
import { ERESILIENCE_MODE, DEFAULT_CLASS_ALERT, DEFAULT_CLASS_CONTAINER } from './constants';

export const Empty = () => <></>;

type TsetClassModifier = {
  type: string;
  resilienceModifier: string;
};

export const setClassModifier = ({ type, resilienceModifier }: TsetClassModifier) =>
  [type, resilienceModifier !== '' ? resilienceModifier : ''].join(' ').trim();

type TsetClassName = {
  classAlertCt?: string;
  classContainerCt?: string;
  resilienceModifier: string;
};

export const setClassName = ({ resilienceModifier, classAlertCt = DEFAULT_CLASS_ALERT, classContainerCt = DEFAULT_CLASS_CONTAINER }: TsetClassName) =>
  resilienceModifier === classContainerCt ? `${classContainerCt} ${classAlertCt}` : classAlertCt;

type TResilienceSubstitut = {
  anomaly: Tanomaly;
  children?: ReactNode;
  resilienceMode?: keyof typeof ERESILIENCE_MODE;
  FallbackComponent?: ElementType;
  resilienceModifier: string;
  setClassModifierFn?: typeof setClassModifier;
  setClassNameFn?: typeof setClassName;
};

const ResilienceSubstitut = ({
  anomaly,
  children,
  resilienceMode = ERESILIENCE_MODE.alert,
  FallbackComponent = Empty,
  resilienceModifier,
  setClassModifierFn,
  setClassNameFn,
}: TResilienceSubstitut) => {
  const { label, detail = '', type = 'error', iconName = 'exclamation-sign' } = anomaly;
  const classModifier = setClassModifierFn?.({ type, resilienceModifier });
  const className = setClassNameFn?.({ resilienceModifier });

  return {
    [ERESILIENCE_MODE.alert]: (
      <Alert className={className} title={label} icon={iconName} classModifier={classModifier}>
        {detail && <p>{detail}</p>}
        {children}
      </Alert>
    ),
    [ERESILIENCE_MODE.none]: null,
    [ERESILIENCE_MODE.fallback]: <FallbackComponent />,
  }[resilienceMode];
};

export default ResilienceSubstitut;
