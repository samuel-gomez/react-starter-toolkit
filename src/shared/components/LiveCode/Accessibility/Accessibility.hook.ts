import axe, { AxeResults } from 'axe-core';
import { useEffect, useState } from 'react';

export type TResults = {
  errors: Error | undefined;
  results: AxeResults | undefined;
};

export const axeRunAccessibility = (html: string, setResults: ({ errors, results }: TResults) => void) =>
  axe.run(html, {}, (errors, results) => setResults({ errors, results }));

type TuseAxe = {
  html: string;
  axeRunAccessibilityFn?: typeof axeRunAccessibility;
};

export const useAxe = ({ html, axeRunAccessibilityFn = axeRunAccessibility }: TuseAxe) => {
  const [results, setResults] = useState<TResults>();

  useEffect(() => {
    axeRunAccessibilityFn(html, setResults);
  }, [axeRunAccessibilityFn, html]);

  return { errors: results?.errors, results: results?.results };
};
