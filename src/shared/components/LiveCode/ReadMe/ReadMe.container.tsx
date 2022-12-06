import { useGithubReadme } from './ReadMe.hook';
import ReadMe from './ReadMe';

type TReadMeContainer = {
  hideComponent?: boolean;
  title?: string;
  icon?: string;
  githubPackage?: string;
  useGithubReadmeFn?: typeof useGithubReadme;
};

const ReadMeContainer = ({ githubPackage, useGithubReadmeFn = useGithubReadme }: TReadMeContainer) => {
  const { markdownContent, isFetching, error, refetch } = useGithubReadmeFn({ githubPackage });

  return <ReadMe markdownContent={markdownContent} isFetching={isFetching} error={error} refetch={refetch} />;
};

export default ReadMeContainer;
