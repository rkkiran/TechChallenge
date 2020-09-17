'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class DashBoardPage {
  /**
   * @clickCCCredits function will click on cc credits link on dashboard page
   */
  async clickCCCredits() {
    await protractor.xpath(
      './/*[@href="/dashboard/credits"]',
      'click',
    );
  }
  /**
   * @clickPreferences function will click on Preferences link on dashboard page
   */
  async clickPreferences() {
    await protractor.xpath('.//*[@href="/dashboard/prefs"]', 'click');
  }
}
module.exports = new DashBoardPage();
