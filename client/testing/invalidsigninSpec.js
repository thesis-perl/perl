describe('Login', function() {
  it('should not let user sign in if missing field or provides incorrect info', function() {
    // navigates to the sign in page
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8000/#/');

    //select signup to load signup modal overlay
    element(by.css('[ng-click="showsignin()"]')).click();    

    // fills in username but not password
    element(by.model('signinUsername')).sendKeys('fish');
    element(by.model('signinPassword')).sendKeys('');

    // clicks the sign in button ( will receive notice must enter password)
    element(by.id('signInbtn')).click();

    // pause to allow easier visualization of test
    browser.sleep(2000);

    // fill in password with invalid password
    element(by.model('signinUsername')).sendKeys('');
    element(by.model('signinPassword')).sendKeys('supermanbatman');  

    // clicks the sign in button ( will not let you sign in with invalid password )
    element(by.id('signInbtn')).click();      

    // pause to allow easier visualization of test
    browser.sleep(2000);      
  });
});