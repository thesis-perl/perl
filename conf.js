// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./client/testing/tutorsignupSpec.js'],
  capabilities: {
    browserName: 'firefox'
  }
}
