import axe, { AxeResults } from 'axe-core';
import { useEffect, useState } from 'react';

export type TResults = {
  errors?: Error;
  results?: AxeResults;
};
export type TsetResult = ({ errors, results }: TResults) => void;

export const axeRunAccessibility = (html: string, setResults: TsetResult) => axe.run(html, {}, (errors, results) => setResults({ errors, results }));

export type TuseAxe = {
  html: string;
  code?: string;
  axeRunAccessibilityFn?: typeof axeRunAccessibility;
};

export const useAxe = ({ html, code, axeRunAccessibilityFn = axeRunAccessibility }: TuseAxe) => {
  const [results, setResults] = useState<TResults>();

  useEffect(() => {
    axeRunAccessibilityFn(html, setResults);
  }, [axeRunAccessibilityFn, html, code]);

  return { errors: results?.errors, results: results?.results };
};
