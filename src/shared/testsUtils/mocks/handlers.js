import { rest } from 'msw';

/* export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');

    return res(ctx.status(200));
  }),

  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    );
  }),
]; */

const MOCK_API_URL = 'https://react-starter-toolkit-api.netlify.app/api';

const commonResponse = (req, res, ctx) => {
  const testMock = req.headers.get('testMock');
  const testMockParsed = JSON.parse(testMock);
  const { responseBody = {}, code = 200 } = testMockParsed;
  return res(
    ctx.json({
      code,
      responseBody,
    }),
  );
};

export const handlers = [
  rest.get(`${MOCK_API_URL}/members`, commonResponse),
  rest.get(`${MOCK_API_URL}/members/search`, commonResponse),
  rest.get(`${MOCK_API_URL}/members/:id/download-detail`, commonResponse),
];
