const AGGREGATOR_OPTIONS = {
  reports: 'html',
  verbose: true,
  srcLighthouse: './cypress/reports/lighthouse',
  srcEcoIndex: './cypress/reports/eco-index',
  outputPath: './cypress/reports/green-it',
};

exports.AGGREGATOR_OPTIONS = AGGREGATOR_OPTIONS;
