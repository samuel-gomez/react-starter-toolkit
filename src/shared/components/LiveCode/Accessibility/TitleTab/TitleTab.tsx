import { Result } from 'axe-core';

export type TTitleTab = { results: Result[] | undefined; label: string; icon: string };

const TitleTab = ({ results, label, icon }: TTitleTab) => (
  <>
    <i className={`glyphicon glyphicon-${icon}`} /> ({results?.length || 0}) {label}
  </>
);

export default TitleTab;
