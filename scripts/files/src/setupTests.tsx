import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from 'shared/testsUtils/msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
