import { render } from '@testing-library/react';
import { WrapperQuery } from 'shared/testsUtils';
import ReadMeContainer from '../ReadMe.container';

const useGithubReadmeFn = jest.fn();
useGithubReadmeFn.mockReturnValue({
  markdownContent: 'test',
  isFetching: false,
  error: false,
  refetch: () => ({}),
});

describe('<ReadMeContainer />', () => {
  it('Render <ReadMeContainer /> with githubPackage, useGithubReadmeFn', () => {
    const { asFragment } = render(<ReadMeContainer githubPackage="test" useGithubReadmeFn={useGithubReadmeFn} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <ReadMeContainer /> with only githubPackage', () => {
    const { asFragment } = render(
      <WrapperQuery queryData="test markdown">
        <ReadMeContainer githubPackage="test" />
      </WrapperQuery>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
