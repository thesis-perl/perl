describe('Login', function() {
  it('should successfully sign a user in', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/');

    //select signup to load signup modal overlay
    element(by.css('[ng-click="showsignin()"]')).click();

    // fills in the sign in form fields (user is a student)
    element(by.model('signinUsername')).sendKeys('fish');
    element(by.model('signinPassword')).sendKeys('fish');

    // clicks the sign in button
    element(by.id('signInbtn')).click();

    // waits for page to load and checks that the browser goes to the studentDashboard
    browser.sleep(2000);

    // checks that the url is the studentDashboard
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/studentDashboard');
  });

  it('should allow signed in user to view list of tutor profiles', function () {

    //click link to redirect to tutorfilter
    element(by.css(".md-accent")).click();

    // waits for page to load and checks that the browser goes to the tutorFilter page
    browser.sleep(2000);    

    // checks that the url is the tutor filter page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/tutorFilter'); 

  it('should student to pick a tutor on tutor filter page', function () {

    //selects first tutor
    element(by.repeater('tutor in tutors').row(0)).element(by.css('.md-button md-ink-ripple')).click()

    // waits for page to load and checks that the browser goes to the tutorFilter page
    browser.sleep(2000);    

    // checks that the url is the profile page of chosen tutor
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/tutorProfile');        
  })
});