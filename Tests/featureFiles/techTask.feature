Feature: As a end user login on Feedr, add credits and save preferences

    Background: As a Cloud Canteen user I sign with my registered credintails
        Given I am on the home page at 'https://staging.feedr.co'
        When I click Sign in and enter my credentials 'qatestuser@feedr.co' and 'QaTest2020'
        Then I am shown the Feedr Cloud Canteen home page

    Scenario: As a Cloud Canteen user I add credits to the my acount then pay for credits to be added to my account
        Given that I have accessed the 'CC Credits' page
        When I select a credit bundle with '5 credits' by clicking 'Top Up Now'
        And the transaction of added '5' credits is recorded on the page

    Scenario: As a Cloud Canteen user select the choices and save under food requirements
        Given that I have accessed the 'Preferences' page
        When I select 'Allergic to Nuts' and 'Vegetarian' under 'food requirements' and click on save changes
        Then the updated 'Allergic to Nuts' and 'Vegetarian' 'requirements' choices are saved to my profile

    Scenario:  As a Cloud Canteen user select the choices and save under Lifestyle choices
        Given that I have accessed the 'Preferences' page
        When I select 'Salad Fan' and 'Hot Hot Hot' under 'Lifestyle choices' and click on save changes
        Then the updated 'Salad Fan' and 'Hot Hot Hot' 'lifestyle' choices are saved to my profile
