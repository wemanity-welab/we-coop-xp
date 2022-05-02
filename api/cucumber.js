// unit testing

const options = [
  'test/**/cucumber/features/*', // feature filter
  '--require test/**/cucumber/units/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];

exports.profile = options.join(' ');

// e2e testing

const optionsApi = [
  'test/**/cucumber/features/*', // feature filter
  '--require test/**/cucumber/integrations/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];

exports.e2e = optionsApi.join(' ');
