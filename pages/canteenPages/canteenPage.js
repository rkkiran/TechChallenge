'use strict';
var waitFor = require('../../helpers/helper');
var protractor = require('../../ProtractorElements/elementClass');

class Canteen {
  /**
   * @onCanteenPage function will check user is on canteen page or not
   */
  async onCanteenPage() {
    await waitFor.elementToBePresent(
      './/*[@data-cy="account-link-user-info"]',
    );
    const currentURL = await protractor.getCurrentURL();
    const userName = await protractor.xpath(
      './/*[@data-cy="account-link-user-info"]',
      'getText',
    );
    return [currentURL, userName];
  }
  /**
   * @clickOnDashBoard function will click on dash board
   */
  async clickOnDashBoard() {
    await protractor.mouseHover(
      'oneElement',
      './/*[@data-cy="account-link-user-info"]',
      'noChildElement',
    );
    await protractor.xpath('(.//*[@href="/dashboard"])[1]', 'click');
    return await waitFor.elementToBePresent(
      '//div[@class="TabScene__Tabs-sc-11qnxs6-2 kXQYXU"]',
    );
  }
}
module.exports = new Canteen();
