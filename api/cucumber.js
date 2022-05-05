/**
 * Cucumber Mission module tests
 */
// unit testing
const mission = [
  'test/Mission/cucumber/features/*.feature', // feature filter
  '--require test/Mission/cucumber/units/*.steps.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];
exports.mission = mission.join(' ');
// e2e testing
const missionE2E = [
  'test/Mission/cucumber/features/*', // feature filter
  '--require test/Mission/cucumber/integrations/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];
exports.missionE2E = missionE2E.join(' ');
/**
 * Cucumber Cooperator module tests
 */
// unit testing
const cooperator = [
  'test/Cooperator/cucumber/features/*.feature', // feature filter
  '--require test/Cooperator/cucumber/units/*.steps.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];
exports.cooperator = cooperator.join(' ');
// e2e testing
const cooperatorE2E = [
  'test/Cooperator/cucumber/features/*', // feature filter
  '--require test/Cooperator/cucumber/integrations/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];
exports.cooperatorE2E = cooperatorE2E.join(' ');
