describe('Sign up', function() {
  it('allow sign up as student and take to student dashboard', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    //start at landing page
    browser.get('http://localhost:8000/#/');

    // pause to allow easier visualization of test
    browser.sleep(3000);    

    //select signup to load signup modal overlay
    element(by.css('[ng-click="showsignup()"]')).click();

    // fills in username but not password
    element(by.model('tutorCheckBox')).click();
    element(by.model('username')).sendKeys('winter GRINCH');
    element(by.model('fullname')).sendKeys('Santa CLAUS');
    element(by.model('password')).sendKeys('ho ho ho HO');
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