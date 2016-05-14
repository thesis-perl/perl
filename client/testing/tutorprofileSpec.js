describe('Login', function() {
  it('should successfully sign a user in', function() {
    // navigates to the landing page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/');

    //select signup to load signup modal overlay
    element(by.css('.landSignin')).click();    

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

    // checks that the url is the profile page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/tutorFilter');    
  });

  it('should allow student to select particular tutor',function () {
    element.all(by.repeater('tutor in tutors')).then(function(tutors) {
     if(tutors[0]) {
         var firstElement = tutors[0].element(by.id('viewProfile'));
         firstElement.click();
       }
    });

    // waits for page to load and checks that the browser goes to the tutorFilter page
    browser.sleep(2000);    

    // checks that the url is the profile page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/tutorProfile/3'); 

    // waits for page to load and checks that the browser goes to the studentDashboard page
    browser.sleep(2000);          

    //request session with tutor 
    element(by.className('request')).click();    

    // waits for page to load and checks that the browser goes to the studentDashboard page
    browser.sleep(2000);   

    browser.get('http://localhost:8000/#/studentDashboard');

    // waits for page to load and checks that the browser goes to the studentDashboard page
    browser.sleep(2000);            
  });
});