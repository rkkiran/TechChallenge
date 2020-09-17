'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');
const { element, by, browser } = require('protractor');

class CcCreditsPage {
  /**
   * @clickTopUpNow function click on top up now on cc credits page
   * @param {*} text - toup button text
   */
  async clickTopUpNow(text) {
    return await protractor.xpath(
      `//button[contains(text(),"${text}")]`,
      'click',
    );
  }
  /**
   * @selectCreditBundle function will select given credit bundle amount
   * @param {*} text element text to find the element
   */
  async selectCreditBundle(text) {
    await protractor.xpath(
      `.//button[contains(text(),"${text}")]`,
      'click',
    );
    await protractor.xpath(
      '//label[contains(text(),"Pay with my authorised card")]',
      'click',
    );
    return await text.substring(0, 2).trim();
  }
  /**
   * @paymentByCard function will enter the payment test card details
   */
  async paymentByCard() {
    await waitFor.browser();
    await browser
      .switchTo()
      .frame(
        element(
          by.xpath('.//*[@title="Secure card payment input frame"]'),
        ).getWebElement(),
      );
    await protractor.sendKeysXpath(
      './/*[@autocomplete="cc-number"]',
      '4242424242424242',
    );
    await protractor.sendKeysXpath(
      './/*[@autocomplete="cc-exp"]',
      '1230',
    );
    await protractor.sendKeysXpath(
      './/*[@autocomplete="cc-csc"]',
      '123',
    );
    await protractor.sendKeysXpath(
      './/*[@autocomplete="postal-code"]',
      '12345',
    );
    await browser.switchTo().defaultContent();
    await waitFor.browser();
    await element
      .all(by.css('.fdr-input.btn-primary'))
      .last()
      .click();

    await waitFor.browser();
  }
  /**
   * @getCurrentCredits function will get the number of Credits before adding bundle on Creditspage
   */
  async getCurrentCredits() {
    await waitFor.elementToBePresent(
      './/*[@class= "CreditsView__CreditText-sc-16sdvo-3 kpsoIz"]',
    );
    const credits = await protractor.css(
      '.CreditsView__CreditText-sc-16sdvo-3.kpsoIz',
      'getText',
    );
    return credits.substr(0, credits.indexOf('.'));
  }
  /**
   * @afterAddingCredits function will the new credit amount after adding credit bundle
   */
  async afterAddingCredits() {
    const credits = await protractor.css(
      '.CreditsView__CreditText-sc-16sdvo-3.kpsoIz',
      'getText',
    );
    return credits.substr(0, credits.indexOf('.'));
  }
  /**
   * @creditConfirmation function will return the current credits + amount of credits use adds credit bundle
   * @param {*} currentAmount     - will get the current credits amount
   * @param {*} amountAfterAdding - amount of credits user adds
   */
  async creditConfirmation(currentAmount, amountAfterAdding) {
    const conFirmationMessage = await protractor.xpath(
      '(//*[contains(text(),"Close")])[1]',
      'isPresent',
    );
    if (conFirmationMessage === true) {
      await protractor.xpath(
        '(//*[contains(text(),"Close")])[1]',
        'click',
      );
    }
    const totalCredits =
      parseInt(currentAmount) + parseInt(amountAfterAdding);
    return totalCredits;
  }
  /**
   * @recordedTransactionsCount function will get the count/number of records before adding bundle on Creditspage
   */
  async recordedTransactionsCount() {
    const xpathValue =
      '//div[contains(@class,"Row__BodyContentCell-sc-34gcfc-2 ibbIIe")]//div[contains(@class,"Row__CellContent-sc-34gcfc-3 cVxjkH")]//div';
    const numberOfTransactions = await protractor.elementAllXpath(
      'count',
      xpathValue,
    );
    const latestTransactions = await protractor.xpath(
      `(${xpathValue})[1]`,
      'getText',
    );
    return [numberOfTransactions, latestTransactions];
  }
}
module.exports = new CcCreditsPage();
