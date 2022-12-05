import { ChangeEvent } from 'react';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from './shared/testsUtils/msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Just for demo, to delete
jest.mock('@uiw/react-textarea-code-editor', () => ({
  __esModule: true,
  default: ({ value, onChange }: { value: string; onChange: (e: ChangeEvent) => void }) => (
    <textarea onChange={onChange} aria-label="jsx-code-editor" value={value}></textarea>
  ),
}));

// Just for demo, to delete - Mock react markdown
jest.mock('react-markdown', () => ({ children }: { children: JSX.Element }) => {
  return <>{children}</>;
});

// Just for demo, to delete - Mock plugin for react markdown
jest.mock('remark-gfm', () => () => ({}));
jest.mock('rehype-slug', () => () => ({}));
