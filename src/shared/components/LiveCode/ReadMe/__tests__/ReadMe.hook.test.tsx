import { renderHook, act, waitFor } from '@testing-library/react';
import { WrapperQuery } from 'shared/testsUtils';
import { useGithubReadme } from '../ReadMe.hook';

const useQueryFn = jest.fn();
useQueryFn.mockReturnValue({
  data: 'test',
  isFetching: false,
  error: false,
  refetch: () => ({}),
});
describe('useGithubReadme', () => {
  it('Render useGithubReadme with githubPackage, useGithubReadmeFn', () => {
    const { result } = renderHook(() => useGithubReadme({ githubPackage: 'test', useQueryFn }));
    act(() => {
      expect(result.current.markdownContent).toEqual('test');
    });
  });

  it('Render useGithubReadme with only githubPackage', async () => {
    const wrapper = ({ children }: { children: JSX.Element }) => <WrapperQuery queryData="test markdown">{children}</WrapperQuery>;
    const { result } = renderHook(() => useGithubReadme({ githubPackage: 'test' }), { wrapper });
    await waitFor(() => expect(result.current.markdownContent).toEqual('test markdown'));
  });
});
