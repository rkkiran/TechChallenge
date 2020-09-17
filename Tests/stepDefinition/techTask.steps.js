'use strict';
const { Given, When, Then } = require('cucumber');
var expect = require('chai').expect;
var homePage = require('../../pages/homePage/homePgae');
var canteen = require('../../pages/canteenPages/canteenPage');
var ccCredit = require('../../pages/ccCreditsPage/ccCreditsPage');
var dashBoard = require('../../pages/dashBoardPages/dashBoardPage');
var preference = require('../../pages/preferencesPage/preferencesPage');

let transactionsRecordsBefore = null;
Given(/^I am on the home page at '(.*)'$/, async (url) => {
  await homePage.gotToHomePage(url);
  const onHomePage = await homePage.onHomePageOrNot();
  expect(onHomePage).to.equal(true);
});
Given(/^that I have accessed the '(.*)' page$/, async (page) => {
  if (page == 'CC Credits') {
    await canteen.clickOnDashBoard();
    await dashBoard.clickCCCredits();
  } else {
    await canteen.clickOnDashBoard();
    await dashBoard.clickPreferences();
  }
});
When(
  /^I click Sign in and enter my credentials '(.*)' and '(.*)'$/,
  async (email, password) => {
    await homePage.login(email, password);
  },
);
When(
  /^I select a credit bundle with '(.*)' by clicking '(.*)'$/,
  async (amount, text) => {
    const getCredits = await ccCredit.getCurrentCredits();
    transactionsRecordsBefore = await ccCredit.recordedTransactionsCount();
    await ccCredit.clickTopUpNow(text);
    const amountAdded = await ccCredit.selectCreditBundle(amount);
    await ccCredit.paymentByCard();
    const creditsConfirm = await ccCredit.creditConfirmation(
      getCredits,
      amountAdded,
    );
    const creditsTotal = await ccCredit.afterAddingCredits();
    expect(creditsConfirm).to.equal(parseInt(creditsTotal));
  },
);
When(
  /^I select '(.*)' and '(.*)' under '(.*)' and click on save changes$/,
  async (option1, option2, type) => {
    if (type === 'food requirements') {
      await preference.selectLifeStyleFoodOptoons(1);
      await preference.selectLifeStyleFoodOptoons(7);
      await preference.saveChanges(1);
    } else {
      await preference.selectLifeStyleFoodOptoons(9);
      await preference.selectLifeStyleFoodOptoons(10);
      await preference.saveChanges(2);
    }
  },
);
Then(/^I am shown the Feedr Cloud Canteen home page$/, async () => {
  const isUserOnCanteenPage = await canteen.onCanteenPage();
  expect(isUserOnCanteenPage[1]).to.equal('Test User');
  expect(isUserOnCanteenPage[0]).to.have.string(
    'https://staging.feedr.co/canteen',
  );
});
Then(
  /^the transaction of added '(.*)' credits is recorded on the page$/,
  async (creditAmount) => {
    const records = await ccCredit.recordedTransactionsCount();
    const dateIs = new Date().toUTCString().substr(5, 11);
    expect(transactionsRecordsBefore).to.not.equal(records[0]);
    expect(records[1]).to.equal(
      `${creditAmount} credit topup on ${dateIs}`,
    );
    await preference.clickLogOut('credits');
  },
);
Then(
  /^the updated '(.*)' and '(.*)' '(.*)' choices are saved to my profile$/,
  async (option1, option2, type) => {
    let isCheckBoxSelected1 = null;
    let isCheckBoxSelected2 = null;
    if (type === 'requirements') {
      isCheckBoxSelected1 = await preference.choicesAreSaved(1, 1);
      isCheckBoxSelected2 = await preference.choicesAreSaved(1, 7);
      await preference.saveChanges(1);
      await preference.clickLogOut('prefs');
    } else {
      isCheckBoxSelected1 = await preference.choicesAreSaved(1, 9);
      isCheckBoxSelected2 = await preference.choicesAreSaved(1, 10);
      await preference.saveChanges(2);
    }
    expect(isCheckBoxSelected1).to.equal(true);
    expect(isCheckBoxSelected2).to.equal(true);
  },
);
