/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import { Gatherer } from 'lighthouse';

function createSession(authtoken) {
  // add token to session storage
  /* TODO: Injection authentification ICI */
}

export default class SessionGatherer extends Gatherer {
  /**
   * Called before navigation to target url.
   * @param {!Object} options
   */
  async beforePass(options) {
    const { driver } = options;

    // this runs after a new tab is opened, but before the tab visits the URL
    driver.executionContext.evaluateOnNewDocument(createSession, {
      args: [options.settings.token],
    });
    // return an "artifact" which can be used in the custom audit
    return options.settings.token;
  }

  /**
   * Called after target page is loaded, all gatherer `pass` methods have been
   * executed, and — if generated in this pass — the trace is ended. The trace
   * and record of network activity are provided in `loadData`.
   * @param {!Object} options
   * @param {networkRecords: !Array, trace: {traceEvents: !Array}} loadData
   * @return {*|!Promise<*>}
   */
  async afterPass(options) {
    const { driver } = options.driver;
    return driver.executionContext.evaluateAsync().then((loadMetrics) => {
      if (!loadMetrics || loadMetrics.searchableTime === undefined) {
        // Throw if page didn't provide the metrics we expect. This isn't
        // fatal -- the Lighthouse run will continue, but any audits that
        // depend on this gatherer will show this error string in the report.
        throw new Error('Unable to find load metrics in page');
      }
      return loadMetrics;
    });
  }
}
