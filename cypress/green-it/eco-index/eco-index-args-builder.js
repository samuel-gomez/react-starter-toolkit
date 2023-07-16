const buildEcoIndexArgs = (options, paths) => {
  const { beforeScript, afterScript, globals, url, visits, output, waitForSelector } = options;
  const { outputPathDir, outputFileName } = paths;
  return {
    beforeScript,
    afterScript,
    headless: false,
    globals,
    url,
    visits,
    output,
    outputPathDir,
    outputFileName,
    beforeClosingPageTimeout: 2000,
    remote_debugging_port: global.remote_debugging_port,
    remote_debugging_address: global.remote_debugging_address,
    waitForSelector,
  };
};

exports.buildEcoIndexArgs = buildEcoIndexArgs;
