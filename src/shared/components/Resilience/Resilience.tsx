import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import ResilienceSubstitut from './ResilienceSubstitut';

type TResilience<Trefetch> = Omit<ComponentProps<typeof ResilienceSubstitut>, 'anomaly'> & {
  anomaly?: ComponentProps<typeof ResilienceSubstitut>['anomaly'] | null;
  refetch?: Trefetch;
  children?: ReactNode;
};

const Resilience = <Trefetch,>({
  resilienceMode,
  resilienceModifier,
  FallbackComponent,
  refetch,
  anomaly = null,
  children = null,
}: PropsWithChildren<TResilience<Trefetch>>) =>
  anomaly ? (
    <ResilienceSubstitut<Trefetch>
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
