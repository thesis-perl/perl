 describe('tutor dashboard', function(){

	browser.ignoreSynchronization = true;
	browser.get('http://localhost:8000/#/');
 	browser.sleep(3000);    
    element(by.css('.landSignin')).click();
    element(by.model('signinUsername')).sendKeys('Seal');
    element(by.model('signinPassword')).sendKeys('123');
    element(by.id('signInbtn')).click();
    browser.sleep(3000);
    // expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/s);
    // browser.get('http://localhost:8000/#/')

    element.all(by.repeater('item in invitedStudents')).then(function(invitedStudents) {
      if(invitedStudents[0]) {
     	 var firstElement = invitedStudents[0].element(by.className('invitionChat'));
 		 firstElement.click();
	
         browser.sleep(3000);
  
 

    element(by.model('msg')).sendKeys('sending message via Jasmine test', protractor.Key.ENTER);
      browser.sleep(3000);

      element(by.className('chatRoom')).sendKeys(protractor.Key.ESCAPE);
      
      browser.sleep(3000)
    
     element.all(by.repeater('item in invitedStudents')).then(function(invitedStudents) {
      
     	 var firstElement = invitedStudents[0].element(by.className('acceptInvitation'));
 		 firstElement.click();
	   
	});
   }
});
     browser.sleep(3000);
     

 //     element(by.id('scheduledTab')).click();
 //     browser.sleep(3000);
 //    element.all(by.repeater('item in acceptedStudents')).then(function(acceptedStudents) {
 //      if(invitedStudents[0]) {
 //     	 var firstElement = acceptedStudents[0].element(by.className('sessionStart'));
 // 		 firstElement.click();
	//    }
	// });

 var scheduletab = element(by.id('scheduleTab'));

   scheduletab.click();

 //    element.all(by.repeater('item in acceptedStudents')).then(function(acceptedStudents) {
 //      if(acceptedStudents[0]) {
 //     	 var firstElement = acceptedStudents[0].element(by.className('sessionStart'));
 // 		 firstElement.click();
	//    }
	// });
    

 });
