// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./client/testing/invalidsigninSpec.js'],
  capabilities: {
    browserName: 'firefox'
  }
}