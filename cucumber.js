const options = [
  'test/features/*', // feature filter
  '--require test/features/steps/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];

exports.profile = options.join(' ');

const optionsApi = [
  'test/features/*', // feature filter
  '--require test/features/api/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "@api and not @wip"',
];

exports.profileApi = optionsApi.join(' ');
