/* eslint-disable import/no-extraneous-dependencies */
import { Audit } from 'lighthouse';

const MAX_LOAD_TIME = 100;

export default class SessionAudit extends Audit {
  // information about this custom audit - will be displayed in Lighthouse report
  static get meta() {
    return {
      id: 'session-audit',
      title: 'Session audit',
      category: 'Session Config',
      name: 'session-audit',
      description: 'Configure the user session',
      failureTitle: 'Session audit failed',
      failureDescription: 'User session failed to initialize',
      requiredArtifacts: ['SessionGatherer'],
    };
  }

  static audit(artifacts) {
    // This should "pass" if the token was set (in reality, this should always pass).
    // Note: If there isn't an audit using a custom gatherer, the gatherer is not run, so
    // this is a dummy audit to force our "createSession" function to be run
    const loadMetrics = artifacts.TestProjectHeroImage;
    const belowThreshold = loadMetrics <= MAX_LOAD_TIME;
    return {
      rawValue: loadMetrics,
      score: Number(belowThreshold),
    };
    // return {
    //   displayValue: `This session's token: ${artifacts}`,
    //   score: !!artifacts ? 1 : 0,
    //   numericValue: !!artifacts ? 1 : 0,
    // };
  }
}
