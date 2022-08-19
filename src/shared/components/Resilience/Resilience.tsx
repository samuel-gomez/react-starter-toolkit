import { ComponentProps, ReactNode } from 'react';
import ResilienceSubstitut from './ResilienceSubstitut';

type TResilience = Omit<ComponentProps<typeof ResilienceSubstitut>, 'anomaly'> & {
  anomaly?: ComponentProps<typeof ResilienceSubstitut>['anomaly'] | null;
  refetch?: () => void | null;
  children?: ReactNode;
};

const Resilience = ({ resilienceMode, resilienceModifier, FallbackComponent, refetch, anomaly = null, children = null }: TResilience) =>
  anomaly ? (
    <ResilienceSubstitut
      anomaly={anomaly}
      refetch={refetch}
      resilienceMode={resilienceMode}
      resilienceModifier={resilienceModifier}
      FallbackComponent={FallbackComponent}
    />
  ) : (
    <>{children}</>
  );

export default Resilience;
