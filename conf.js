// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./client/testing/tutorsignupSpec.js', './client/testing/signinSpec.js'],
  capabilities: {
    browserName: 'chrome'
  }
}
