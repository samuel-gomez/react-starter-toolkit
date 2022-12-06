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
  code: string | undefined;
  axeRunAccessibilityFn?: typeof axeRunAccessibility;
};

export const useAxe = ({ html, code, axeRunAccessibilityFn = axeRunAccessibility }: TuseAxe) => {
  const [results, setResults] = useState<TResults>();

  useEffect(() => {
    axeRunAccessibilityFn(html, setResults);
  }, [axeRunAccessibilityFn, html, code]);

  return { errors: results?.errors, results: results?.results };
};
