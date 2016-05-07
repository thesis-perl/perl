describe('signinSpec should be able to sign in ', function() {
  it('should successfully sign a user in', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/signin');

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

  it('should allow signed in user to view tutor profile', function () {

    //click link to redirect to signin upon signout
    element(by.css(".md-accent")).click();

    // waits for page to load and checks that the browser goes to the profile page
    browser.sleep(2000);    

    // //click link to redirect to signin upon signout
    // element(by.css(".md-button md-ink-ripple")).click();

    // // waits for page to load and checks that the browser goes to the profile page
    // browser.sleep(2000);

    // checks that the url is the profile page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/signin');    
  })
});