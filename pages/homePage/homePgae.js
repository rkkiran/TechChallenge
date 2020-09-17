'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class HomePage {
  /**
   *
   * @param {*} url - need to pass the home page url or base url
   * done
   */
  async gotToHomePage(url) {
    await protractor.getBrowser(url);
  }
  /**
   * @onHomePageOrNot will verify that we or on home page or not
   * done
   */
  async onHomePageOrNot() {
    const xpathValue =
      './/*[@class="Header__AccountLink-sc-9hif8-13 cPITVI"]';
    await waitFor.elementToBePresent(xpathValue);
    await waitFor.browser();
    return await protractor.xpath(xpathValue, 'isPresent');
  }
  /**
   * @login                 - function will be used to an account using email address and password
   * @param {*} emailAdress - email value to login into an account with
   *                          will fill the given email address in the email text box
   * @param {*} password    - password value to an login into an account with
   *                          will fill the given password in the password text box
   * done
   */
  async login(emailAdress, password) {
    await protractor.mouseHover(
      'xpath',
      './/*[@data-cy="account-link-sign-in"]',
      './/*[@data-cy="login-link"]',
    );
    await waitFor.elementToBePresent(
      './/*[@class="sep-bottom border-bottom text-center"]',
    );
    await protractor.id('login-email', 'sendKeys', emailAdress);
    await protractor.id('login-password', 'sendKeys', password);
    await protractor.xpath(
      './/*[@id="modal-root"]//*[@type="submit"]',
      'click',
    );
  }
}
module.exports = new HomePage();
