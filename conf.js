// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./client/testing/studentdemoSpec.js', './client/testing/tutordemoSpec.js'],
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  }

};

