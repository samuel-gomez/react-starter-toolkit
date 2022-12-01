import { Result } from 'axe-core';

const TitleTab = ({ results, label, icon }: { results: Result[] | undefined; label: string; icon: string }) => (
  <>
    <i className={`glyphicon glyphicon-${icon}`} /> ({results?.length || 0}) {label}
  </>
);

export default TitleTab;
