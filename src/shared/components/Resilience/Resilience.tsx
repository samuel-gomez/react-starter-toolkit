import { ComponentProps, ReactNode } from 'react';
import ResilienceSubstitut from './ResilienceSubstitut';

type TResilience = Omit<ComponentProps<typeof ResilienceSubstitut>, 'anomaly'> & {
  anomaly?: ComponentProps<typeof ResilienceSubstitut>['anomaly'] | null;
  children?: ReactNode;
};

const Resilience = ({ resilienceMode, resilienceModifier, FallbackComponent, anomaly = null, children = null }: TResilience) =>
  anomaly ? (
    <ResilienceSubstitut
      anomaly={anomaly}
      resilienceMode={resilienceMode}
      resilienceModifier={resilienceModifier}
      FallbackComponent={FallbackComponent}
    />
  ) : (
    <>{children}</>
  );

export default Resilience;
