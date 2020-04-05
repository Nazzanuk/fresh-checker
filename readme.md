###Amazon Fresh Checkout Tester

You'll need node installed along with npm/yarn.

1. Clone this repo

2. In terminal run `npm install`

3. In terminal run `npm start`
    - This will start Cypress

4. Click `run all specs`
    - This will start running the tests
    ![Run Specs](/images/run-specs.png "Run Specs")

5. Sign in to your account
    - the first test will fail
    - As cypress is basically an incognito window you might need to do 2 factor auth to sign in
    
6. Shop / go to checkout screen
    - You need to navigate to the screen where you can choose days and it says "No morning delivery windows are available for Today"
    ![Checkout](/images/checkout.png "Checkout")

7. Press refresh
    ![Refresh](/images/refresh.png "Refresh")
    - That's it, the test will run 1000 times by default at around 5 second per attempt.
    - It will check dates for today and tomorrow
    - The screen will stop when the test fails (i.e. a slot is available)
