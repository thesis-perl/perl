describe('SignUp', function() {
  it('should not let user sign up if missing field(s)', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/signup');

    // fills in username but not password
    element(by.model('username')).sendKeys('wingz');
    element(by.model('fullname')).sendKeys('Jonathan Lee');
    element(by.model('password')).sendKeys('hello');
    element(by.model('bio')).sendKeys('I like fish and javascript');

    // clicks the sign in button ( will receive notice must enter location)
    element(by.id('signUpbtn')).click();

    // pause to allow easier visualization of test
    browser.sleep(2000);

    //since we cannot sigup, lets cancel and go back to landing page
    element(by.id('cancelSignup')).click();

    // checks that the url is the landing page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');     
  });
});