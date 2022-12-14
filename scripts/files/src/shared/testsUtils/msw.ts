import { rest } from 'msw';
import type { ResponseResolver, RestRequest, PathParams, RestContext } from 'msw';
import { setupServer } from 'msw/node';
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
  // here your mock urls, example :
  // rest.get(`${MOCK_API_URL.base}members`, commonResponse),
];

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
