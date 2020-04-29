const axios = require("axios").default;
const moment = require("moment");

const config = require("./../../../fresh-config");
let cookies = require("../../../data/cookies.json") || [];

/** Setup **/
const tomorrow = moment().add(1, "Day").format("dddd, MMM D");
const dayAfterTomorrow = moment().add(2, "Day").format("dddd, MMM D");
const checkoutUrl = "https://www.amazon.co.uk/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1";

const amountToRepeat = config.amountToRepeat;
const webhookToCallOnFail = config.webhook;

/** Tests **/
Cypress.on("fail", () => {
  webhookToCallOnFail && axios.get(webhookToCallOnFail);

  var audio = new Audio('https://www.tones7.com/media/very_nice_alarm.mp3');
  audio.play();

  return Cypress.stop(); //save the page as it is
});

describe("Amazon Fresh", function () {
  before(function () {
    Cypress.Cookies.defaults({whitelist: () => true});

    const config = Cypress.config();

    console.log({config});
  });

  Cypress._.times(amountToRepeat, (i) => {
    describe("Checkout", () => {
      before(() => {
        cookies.forEach(cookie => {
          cy.setCookie(cookie.name, cookie.value);
        });

        cy.visit(checkoutUrl).then(() => {
          cy.getCookies().then(cookies => {
            cy.writeFile("data/cookies.json", cookies);
          });
        });

      });

      it("Check Today and tomorrow", () => {
        const time1 = (Math.floor(Math.random() * 50) + 2) * 100;
        const time2 = (Math.floor(Math.random() * 50) + 2) * 100;
        const time3 = (Math.floor(Math.random() * 250) + 10) * 100;
        const time4 = (Math.floor(Math.random() * 250) + 10) * 100;
        cy.wait(time3);
        cy.get(".date-button-item:eq(0)").click();
        cy.contains("No morning delivery windows are available for Today");
        cy.contains("No afternoon delivery windows are available for Today");
        cy.wait(time1);
        cy.contains("No evening delivery windows are available for Today");

        cy.get(".date-button-item:eq(1)").click();
        cy.contains(`No morning delivery windows are available for ${tomorrow}`);
        cy.contains(`No afternoon delivery windows are available for ${tomorrow}`);
        cy.wait(time2);
        cy.contains(`No evening delivery windows are available for ${tomorrow}`);

        cy.get(".date-button-item:eq(2)").click();
        cy.contains(`No morning delivery windows are available for ${dayAfterTomorrow}`);
        cy.contains(`No afternoon delivery windows are available for ${dayAfterTomorrow}`);
        cy.wait(time4);
        cy.contains(`No evening delivery windows are available for ${dayAfterTomorrow}`);
      });
    });
  });
});
