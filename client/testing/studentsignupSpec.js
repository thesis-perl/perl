describe('Sign up', function() {
  it('allow sign up as student and take to student dashboard', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    //start at landing page
    browser.get('http://localhost:8000/#/');

    // pause to allow easier visualization of test
    browser.sleep(3000);    

    //select signup to load signup modal overlay
    element(by.css('.landSignup')).click();

    // fills in username but not password
    element(by.model('studentCheckBox')).click();
    element(by.model('username')).sendKeys('hello everyone');
    element(by.model('fullname')).sendKeys('Lee Lee');
    element(by.model('password')).sendKeys('no way');
    element(by.model('location')).sendKeys('hello');
    element(by.model('bio')).sendKeys('I like fish and javascript');
    element(by.model('location')).sendKeys('hello');
    element(by.model('javascriptCheckbox')).click();

    // pause to allow easier visualization of test
    browser.sleep(3000);

    //sign up should take us to the student dashboard
    element(by.id('signUpbtn')).click();

    // pause to allow easier visualization of test
    browser.sleep(3000);

    // checks that the url is the landing page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/studentDashboard');     
  });
});