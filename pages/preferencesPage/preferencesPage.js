'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class PreferencesPage {
  // async onPreferencePage() {
  //   return await protractor.xpath(
  //     '(.//*[@class= "StyledComponents__H2-sc-1thr061-1 kEPDYD"])[1]',
  //     'isPresent',
  //   );
  // }
  /**
   *@selectLifeStyleFoodOptoons fucntion will select the given food options
   * @param {*} value - value of the element
   */
  async selectLifeStyleFoodOptoons(value) {
    await waitFor.elementToBePresent(
      `(.//*[@class="Checkbox__Wrapper-sc-1n0k1jm-0 izYKCR"])[${value}]`,
    );
    await protractor.xpath(
      `(.//*[@class="Checkbox__Wrapper-sc-1n0k1jm-0 izYKCR"])[${value}]`,
      'click',
    );
  }
  /**
   * @choicesAreSaved function will check the given choice are saved or not
   * @param {*} value  - elemnt value to check the given options are slected
   * @param {*} value2  - uncheck the check box at the end of the test for re-running to avoid fail test
   */
  async choicesAreSaved(value, value2) {
    await waitFor.elementToBeClickable(
      `(.//*[@class="PreferencesView__PrefContainer-sc-187ksvt-3 eYLUlV"])[${value}]`,
    );
    const isChoiceSelected = await protractor.xpath(
      `(.//*[@class="PreferencesView__PrefContainer-sc-187ksvt-3 eYLUlV"])[${value}]`,
      'isPresent',
    );
    await this.selectLifeStyleFoodOptoons(value2);
    return isChoiceSelected;
  }
  /**
   * @saveChanges function will save the preferences
   * @param {*} value save button value
   */
  async saveChanges(value) {
    await waitFor.elementToBeClickable(
      `(.//*[@class="fdr-input btn-primary "])[${value}]`,
    );
    await protractor.xpath(
      `(.//*[@class="fdr-input btn-primary "])[${value}]`,
      'click',
    );
    return await waitFor.elementToBePresent(
      './/*[contains(text(),"Preferences saved")]',
    );
  }
  /**
   *@clickLogOut function is used for logout
   * @param {*} page - page name then accordingly this function will log out the user on the page
   */
  async clickLogOut(page) {
    await protractor.mouseHover(
      'oneElement',
      './/*[@data-cy="account-link-user-info"]',
      'noChildElement',
    );
    return await protractor.xpath(
      `(.//*[@href="/dashboard/${page}#logout"])[1]`,
      'click',
    );
  }
}
module.exports = new PreferencesPage();
