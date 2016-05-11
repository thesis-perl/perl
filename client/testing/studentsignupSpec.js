describe('Sign up', function() {
  it('allow sign up as student and take to student dashboard', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/signup');

    // fills in username but not password
    element(by.model('studentCheckBox')).click();
    element(by.model('username')).sendKeys('wingz');
    element(by.model('fullname')).sendKeys('Jonathan Lee');
    element(by.model('password')).sendKeys('hello');
    element(by.model('location')).sendKeys('hello');
    element(by.model('bio')).sendKeys('I like fish and javascript');
    element(by.model('location')).sendKeys('hello');
    element(by.model('javascriptCheckbox')).click();

    // pause to allow easier visualization of test
    browser.sleep(2000);

    //sign up should take us to the student dashboard
    element(by.id('signUpbtn')).click();

    // pause to allow easier visualization of test
    browser.sleep(2000);

    // checks that the url is the landing page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/studentDashboard');     
  });
});