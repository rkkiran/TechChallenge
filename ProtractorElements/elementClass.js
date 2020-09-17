'use strict';
const { element, by, browser } = require('protractor');

class ElementsClass {
  /**
   *
   * @param url - url value or link
   */
  async getBrowser(url) {
    return await browser.get(url);
  }
  /**
   *
   * @param value          - xapth value
   * @param actionType     - protractor action type like to click() or getText() and more
   * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
   */
  async xpath(value, actionType, attributeValue) {
    if (attributeValue === undefined) {
    }
    let returnValue = null;
    switch (actionType) {
      case 'click':
        returnValue = await element(by.xpath(value)).click();
        break;
      case 'isPresent':
        returnValue = await element(by.xpath(value)).isPresent();
        break;
      case 'getAttribute':
        returnValue = await element(by.xpath(value)).getAttribute(
          attributeValue,
        );
        break;
      case 'isSelected':
        returnValue = await element(by.xpath(value)).isSelected();
        break;
      default:
        returnValue = await element(by.xpath(value)).getText();
        break;
    }
    return returnValue;
  }
  async sendKeysXpath(value, sendKeys) {
    return await element(by.xpath(value)).sendKeys(sendKeys);
  }
  /**
   *
   * @param value       - css value
   * @param actionType  - protractor action type like to click() or getText() and more
   * @param sendKeys    - to send the values in the text box element for example to login
   */
  async css(value, actionType, sendKeys, attributeValue) {
    if (sendKeys && attributeValue === undefined) {
    }
    let returnValue = null;
    switch (actionType) {
      case 'click':
        returnValue = await element(by.css(value)).click();
        break;
      case 'sendKeys':
        returnValue = await element(by.css(value)).sendKeys(sendKeys);
        break;
      default:
        returnValue = await element(by.css(value)).getText();
        break;
    }
    return returnValue;
  }
  /**
   *
   * @param value          - id value
   * @param actionType     - protractor action type like to click() or getText() and more
   * @param sendKeysValue  - to send the values in the text box element for example to login
   */
  async id(value, actionType, sendKeysValue) {
    if (sendKeysValue === undefined) {
    }
    let returnValue = null;
    switch (actionType) {
      case 'click':
        returnValue = await element(by.id(value)).click();
        break;
      case 'sendKeys':
        returnValue = await element(by.id(value)).sendKeys(
          sendKeysValue,
        );
        break;
      case 'isPresent':
        returnValue = await element(by.xpath(value)).isPresent();
        break;
      default:
        returnValue = await element(by.id(value)).getText();
        break;
    }
    return returnValue;
  }
  /**
   *
   * @param value - css value
   * @param text  - css value text
   */
  async cssContainingText(value, text) {
    return await element(by.cssContainingText(value, text)).click();
  }
  /**
   *
   * @param value - xpath value
   */
  async elementAllXpath(actionType, value) {
    let returnValue = null;
    switch (actionType) {
      case 'count':
        returnValue = await element.all(by.xpath(value)).count();
        break;
    }

    return returnValue;
  }
  /**
   *
   * @param value          - xpath value
   * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
   * @param textContains   - using textContains value will find the value in the elment
   */
  async returnStringValue(value, attributeValue, textContains) {
    const getElmentValue = await element
      .all(by.xpath(value))
      .getAttribute(attributeValue);
    return getElmentValue
      .split(' ')
      .filter((string) => string.includes(textContains));
  }
  /**
   * @selectFromDropDown function will click on drop down and then will select a value from drop down
   * @param {*} element1 - element value to click drop down
   * @param {*} element2 - element value to select the value from drop down
   */
  async selectFromDropDown(element1, element2) {
    await element(by.id(element1)).click();
    return await element(
      by.css(`#${element1} [value= "${element2}"]`),
    ).click();
  }
  /**
   *@mouseHover function will hover on parent element and will select the child element under parent element
   * @param {*} selector       - xpath, id or css
   * @param {*} parentElement  - parent element to hover on
   * @param {*} childSelector  - selct the child element form drop down
   */
  async mouseHover(selector, parentElement, childSelector) {
    switch (selector) {
      case 'id':
        const mainSelector_id = await element(by.id(parentElement));
        const subSelector_id = await element(by.id(childSelector));
        await browser
          .actions()
          .mouseMove(mainSelector_id)
          .mouseMove(subSelector_id)
          .click()
          .perform();
        break;
      case 'xpath':
        const mainSelector_xpath = await element(
          by.xpath(parentElement),
        );
        const subSelector_xpath = await element(
          by.xpath(childSelector),
        );
        await browser
          .actions()
          .mouseMove(mainSelector_xpath)
          .mouseMove(subSelector_xpath)
          .click()
          .perform();
        break;

      case 'css':
        const mainSelector = await element(by.css(parentElement));
        const subSelector = await element(by.css(childSelector));
        await browser
          .actions()
          .mouseMove(mainSelector)
          .mouseMove(subSelector)
          .click()
          .perform();
        break;
      default:
        const mainSelectorOne_xpath = await element(
          by.xpath(parentElement),
        );
        await browser
          .actions()
          .mouseMove(mainSelectorOne_xpath)
          .perform();
        break;
    }
  }
  /**
   * @getCurrentURL function will return the page url
   */
  async getCurrentURL() {
    return await browser.getCurrentUrl();
  }
}
module.exports = new ElementsClass();
