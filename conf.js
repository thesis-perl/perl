// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./client/testing/tutorprofileSpec.js'],
  capabilities: {
    browserName: 'chrome'
  }
}
