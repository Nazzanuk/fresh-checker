const axios = require("axios").default;
const moment = require("moment");

const config = require("./../../../fresh-config");
const cookies = require("../../../data/cookies.json");

/** Setup **/
const tomorrow = moment().add(1, "Day").format("dddd, MMM D");
const checkoutUrl = "https://www.amazon.co.uk/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1";

const amountToRepeat = config.amountToRepeat;
const webhookToCallOnFail = config.webhook;

/** Tests **/
Cypress.on("fail", () => {
  webhookToCallOnFail && axios.get(webhookToCallOnFail);
  return Cypress.stop(); //save the page as it is
});

describe("Amazon Fresh", function () {
  before(function () {
    Cypress.Cookies.defaults({whitelist: () => true});

    const config = Cypress.config();

    console.log({config})
  });

  Cypress._.times(amountToRepeat, (i) => {
    describe("Checkout", () => {
      before(() => {
        cookies.forEach(cookie => {
          cy.setCookie(cookie.name, cookie.value);
        });



        cy.visit(checkoutUrl).then(() => {
          // cookies.forEach(cookie => {
          //   cy.setCookie(cookie.name, cookie.value);
          // });
          cy.getCookies().then(cookies => {
            console.log("cookies after load", {cookies});
            cy.writeFile("data/cookies.json", cookies);
          });
        });

        // const cookies = cy.readFile("menu.json").then(cookies => {
          console.log("cookies before", {cookies});
        // });





      });

      it("Check Today and tomorrow", () => {
        cy.get(".date-button-item:eq(0)").click();
        // cy.contains("No morning delivery windows are available for Today");
        // cy.contains("No afternoon delivery windows are available for Today");
        // cy.contains("No evening delivery windows are available for Today");
        //
        // cy.get(".date-button-item:eq(1)").click();
        // cy.contains(`No morning delivery windows are available for ${tomorrow}`);
        // cy.contains(`No afternoon delivery windows are available for ${tomorrow}`);
        // cy.contains(`No evening delivery windows are available for ${tomorrow}x`);
      });
    });
  });
});
