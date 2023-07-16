const fs = require('fs');
const { AGGREGATOR_OPTIONS } = require('./aggregator-config');

const { reports, verbose, srcLighthouse, srcEcoIndex, outputPath } = AGGREGATOR_OPTIONS;

const buildAggregatorArgs = () => ({
  reports,
  verbose,
  srcLighthouse,
  srcEcoIndex,
  outputPath,
});

const shouldRunAggregator = () => fs.existsSync(srcLighthouse) && fs.existsSync(srcEcoIndex);

exports.buildAggregatorArgs = buildAggregatorArgs;
exports.shouldRunAggregator = shouldRunAggregator;
