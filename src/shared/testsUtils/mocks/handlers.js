import { rest } from 'msw';
import { MOCK_API_URL } from '..';

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
  rest.get(`${MOCK_API_URL}members`, commonResponse),
  rest.get(`${MOCK_API_URL}members/search`, commonResponse),
  rest.get(`${MOCK_API_URL}members/:id/download-detail`, commonResponse),
];
