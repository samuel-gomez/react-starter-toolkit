import React from 'react';
import ResilienceSubstitut from './ResilienceSubstitut';

const Resilience = ({ anomaly, resilienceMode, resilienceModifier, FallbackComponent, children }) =>
  anomaly ? (
    <ResilienceSubstitut
      anomaly={anomaly}
      resilienceMode={resilienceMode}
      resilienceModifier={resilienceModifier}
      FallbackComponent={FallbackComponent}
    />
  ) : (
    children
  );

export default Resilience;
