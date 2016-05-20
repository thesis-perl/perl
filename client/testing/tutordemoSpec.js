describe('Login', function() {
  it('should successfully sign a user in', function() {
    // navigates to the landing page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/');

    //select signup to load signup modal overlay
    element(by.css('[ng-click="showsignin()"]')).click();

    // waits for page to load and checks that the browser goes to the studentDashboard
    browser.sleep(2000);    

    // fills in the sign in form fields (user is a student)
    element(by.model('signinUsername')).sendKeys('tutor1');
    element(by.model('signinPassword')).sendKeys('1');

    // waits for page to load and checks that the browser goes to the studentDashboard
    browser.sleep(2000);    

    // clicks the sign in button
    element(by.id('signInbtn')).click();

    // waits for page to load and checks that the browser goes to the studentDashboard
    browser.sleep(2000);

    // checks that the url is the studentDashboard
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/tutorDashboard');
  });

  it('should allow signed in user to view list of tutor profiles', function () {

    browser.get('http://localhost:8000/#/session/18');

    // waits for page to load and checks that the browser goes to the studentDashboard
    browser.sleep(60000);         
  });
});