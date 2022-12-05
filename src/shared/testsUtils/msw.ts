import { rest } from 'msw';
import type { ResponseResolver, RestRequest, PathParams, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { GITHUB_API } from 'shared/constants';
import { MOCK_API_URL } from '.';

type HandlerResolver = ResponseResolver<RestRequest<never, PathParams<string>>, RestContext>;

const commonResponse: HandlerResolver = (req, res, ctx) => {
  const testMock = req.headers.get('testMock');
  const testMockParsed = testMock === null ? {} : JSON.parse(testMock);
  const { responseBody = {}, code = 200 } = testMockParsed;
  return res(
    ctx.json({
      code,
      responseBody,
    }),
  );
};

export const handlers = [
  rest.get(`${MOCK_API_URL.github}${GITHUB_API}test/README.md`, commonResponse),
  rest.get(`${MOCK_API_URL.vercel}members`, commonResponse),
  rest.get(`${MOCK_API_URL.vercel}members/search`, commonResponse),
  rest.get(`${MOCK_API_URL.vercel}members/:id/download-detail`, commonResponse),
];

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
