describe('Login ', function() {
  it('should successfully sign a user out', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/');

    //select signup to load signup modal overlay
    element(by.css('[ng-click="showsignin()"]')).click();    

    // fills in the sign in form fields
    element(by.model('signinUsername')).sendKeys('fish');
    element(by.model('signinPassword')).sendKeys('fish');

    // clicks the sign in button
    element(by.id('signInbtn')).click();

    // waits for page to load and checks that the browser goes to the profile page
    browser.sleep(2000);

    // checks that the url is the profile page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/studentDashboard');
  });

  it('should allow signed in user to sign out', function () {

    //click button to show sidebar
    element(by.css('[ng-click="$mdOpenMenu($event)"]')).click();

    // waits for page to load and checks that the browser goes to the tutorFilter page
    browser.sleep(2000);    

    //click button to sign out
    element(by.css('[ng-click="signOutUser()"]')).click();

    // waits for page to load and checks that the browser redirects to sign in
    browser.sleep(2000);    

    // checks that the url is the landing page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');    
  })
});