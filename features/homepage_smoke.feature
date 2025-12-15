Feature: Smoke Test - Public Creai Homepage


  @CP001
  Scenario: Homepage loads successfully
    Given the user opens the public homepage
    Then the main document should respond with status 200
    And there should be no console errors

  @CP002
  Scenario: Key elements are present on homepage
    Given the user opens the public homepage
    Then the logo should be visible
    And a visible contact CTA should exist
    And the main menu should have the options:
      | Services        |
      | Success stories |
      | About us        |
      | Knowledge hub   |
    And the homepage cards section should display the following titles:
      | Transforming customer support with a bespoke AI Logistics Agent                |
      | Streamlining operations and maximizing revenue with an AI Travel Agent         |
      | Accelerating growth through seamless integration and strategic AI innovation   |

  @CP003
  Scenario: Navigation - Success stories menu
    Given the user opens the public homepage
    When the user clicks on the "Success stories" menu option
    Then the cards section should display the following titles:
      | Transforming customer support with a bespoke AI Logistics Agent                |
      | Streamlining operations and maximizing revenue with an AI Travel Agent         |
      | Accelerating growth through seamless integration and strategic AI innovation   |

  @CP004
  Scenario: Mobile viewport - key elements visible
    Given the user opens the public homepage in mobile mode with device "iPhone X"
     When the user opens the mobile menu
     Then the main menu should have the options:
      | Services        |
      | Success stories |
      | About us        |
      | Knowledge hub   |
