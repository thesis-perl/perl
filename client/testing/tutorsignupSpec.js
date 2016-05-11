describe('Sign up', function() {
  it('allow sign up as student and take to student dashboard', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/signup');

    // fills in username but not password
    element(by.model('tutorCheckBox')).click();
    element(by.model('username')).sendKeys('winter');
    element(by.model('fullname')).sendKeys('Santa');
    element(by.model('password')).sendKeys('ho ho ho');
    element(by.model('location')).sendKeys('North Pole');
    element(by.model('bio')).sendKeys('I like fish and javascript');
    element(by.model('location')).sendKeys('hello');
    element(by.model('javascriptCheckbox')).click();
    element(by.model('rubyCheckbox')).click();
    element(by.model('pythonCheckbox')).click();

    // pause to allow easier visualization of test
    browser.sleep(2000);

    //sign up should take us to the student dashboard
    element(by.id('signUpbtn')).click();

    // pause to allow easier visualization of test
    browser.sleep(5000);

    // checks that the url is the landing page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/tutorDashboard');     
  });
});