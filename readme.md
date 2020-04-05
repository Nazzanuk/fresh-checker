###Amazon Fresh Checkout Tester

You'll need node installed along with npm/yarn.

1. Clone this repo

2. In terminal run `npm install`

3. In terminal run `npm start`
    - This will start Cypress

4. Click `run all specs`
    - This will start running the tests

5. Sign in to your account
    - As cypress is basically an incognito window you might need to do 2 factor auth to sign in
    
6. Shop / go to checkout screen
    - You need to navigate to the screen where you can choose days and it says "No morning delivery windows are available for Today"
    ![alt text](/images/checkout.png "Logo Title Text 1")


7. Press play
    - That's it, the test will run 1000 times by default at around 5 second per attempt.
    - The screen will stop
