/* eslint-disable react/display-name */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from './shared/testsUtils/msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Just for demo, to delete
jest.mock('@uiw/react-textarea-code-editor', () => ({
  __esModule: true,
  default: ({ value, onChange }) => <textarea onChange={onChange} aria-label="jsx-code-editor" value={value}></textarea>,
}));

// Just for demo, to delete - Mock react markdown
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);

// Just for demo, to delete - Mock plugin for react markdown
jest.mock('remark-gfm', () => () => ({}));
jest.mock('rehype-slug', () => () => ({}));

// Just for demo, to delete - Mock uuid
jest.mock('uuid', () => ({
  v1: () => '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  v4: () => '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  v5: () => '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
}));
