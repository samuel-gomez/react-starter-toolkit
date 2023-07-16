/* eslint-disable no-unused-vars */
export const ECOINDEX_OPTIONS = {
  ecoIndex: 50,
  grade: 'B',
  visits: 2000,
  checkThresholds: false,
  beforeScript: (globals) => {
    /* TODO: Injection authentification depuis globals.token ICI */
  },
  afterScript: (globals) => {},
  globals: ({ token }) => ({ accessToken: JSON.stringify(token) }),
  output: ['json'],
  waitForSelector: '.af-header__content',
};

export const ECOINDEX_PATHS = {
  reportsPath: './cypress/reports/eco-index',
};
