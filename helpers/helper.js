const {
  browser,
  ExpectedConditions,
  element,
  protractor,
} = require('protractor');
const {
  selectFromDropDown,
} = require('../ProtractorElements/elementClass');

module.exports = {
  /**
   *
   * @param {*} value - xpath value
   * @waitForElementToBePresent will wait for element to be present
   *
   */
  async elementToBePresent(value) {
    return await browser.wait(
      () => element(by.xpath(value)).isPresent(),
      600000,
    );
  },
  async browser() {
    return await browser.sleep(4000);
  },
  /**
   *
   * @param {*} value - xpath value
   * @waitForElementToBeDisplayed will wait for element to be displayed
   *
   */
  async elementToBeDisplayed(value) {
    return await browser.wait(
      () => element(by.xpath(value)).isDisplayed(),
      60000,
    );
  },
  /**
   *
   * @param {*} value - xpath value
   * @waitForElementVisibility will wait for element to be visible
   *
   */
  async elementVisibility(value) {
    let EC = protractor.ExpectedConditions;
    let condition = EC.visibilityOf(element(by.xpath(value)));
    return await browser.wait(condition, 60000);
  },
  /**
   *
   * @param {*} value - xpath value
   * @waitForElementToBeClickable will wait for element to be clickable
   *
   */
  async elementToBeClickable(value) {
    var elm = await element(by.xpath(value));
    var EC = await protractor.ExpectedConditions;
    return await browser.wait(EC.elementToBeClickable(elm), 60000);
  },
};
