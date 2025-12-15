# Best Practices, Organization, and Selective Execution

## Organization and Best Practices
- **Screenplay Pattern:** All interactions and validations are encapsulated in reusable Tasks and Questions, making tests easy to maintain and extend.
- **Centralized selectors and messages:** Selectors and error messages are stored in constants files (`src/screenplay/utilities/Constants.ts` and `src/screenplay/ui/HomePage.ts`), avoiding hardcoded values.
- **Shared utilities:** Utility functions for normalization and array comparison are in `src/screenplay/utilities/utils.ts`.
- **Global hooks:** Cucumber hooks (`features/support/hooks.ts`) handle initialization, console error capture, and automatic screenshots on failures.
- **Global timeout:** The global step timeout is set in `features/support/timeout.js` using ES Modules.
- **Clear and separated scenarios:** Each Gherkin scenario validates a specific objective, following the challenge requirements and ensuring traceability.

## Flexible Mobile Device Execution

You can now specify the mobile device directly from the feature file for mobile scenarios.

Example:

```feature
Given the user opens the public homepage in mobile mode with device "iPhone X"
```

This allows you to easily change the emulated device (e.g., "iPhone 12", "iPhone 13 Pro Max") without modifying the code, just by changing the name in the feature.

If the device does not exist, "iPhone X" will be used by default.

**Note:** The step definition and Task already accept the device name as a parameter.

## Using Tags for Scenarios

- Each scenario has a unique tag (`@CP001`, `@CP002`, etc.) to facilitate selective execution and reporting.
- You can add more tags as needed, such as `@smoke`, `@regression`, etc.

### Example of tags in features

```feature
@CP001
Scenario: Homepage loads successfully
   Given the user opens the public homepage
   Then the main document should respond with status 200
   And there should be no console errors

@CP002
Scenario: Key elements are present on homepage
   ...
```

## Selective Execution by Tags

- To run only a specific scenario/tag:
   ```
   npm test -- --tags "@CP002"
   ```
- To run multiple tags:
   ```
   npm test -- --tags "@CP001 or @CP003"
   ```
- To run scenarios that have multiple tags:
   ```
   npm test -- --tags "@smoke and @CP001"
   ```

## Conditional Hooks by Tag

You can run special logic in hooks only for certain tags:

```typescript
import { Before } from "@cucumber/cucumber";

Before({ tags: "@CP001" }, async function () {
   // This only runs for scenarios with @CP001
});
```

## Additional Recommendations

- **Do not modify step definitions to support tags:** Tags are managed at the Cucumber level and do not require changes in steps.
- **Keep steps generic and reusable:** This way you can combine them in different scenarios and features.
- **Update tags and documentation if you add new scenarios.**
- **Always run tests with `npm test` and use tags to filter according to what you need to validate.**

# Smoke Test Creai (Playwright + Cucumber + Screenplay)

## Tools and Languages Used
- **Main language:** TypeScript
- **Automation framework:** Playwright
- **BDD:** Cucumber.js
- **Design pattern:** Screenplay Pattern
- **Reports:** Allure

## Required Dependencies
- Node.js 18+ (20+ recommended)
- npm (included with Node.js)
- Google Chrome or Chromium (Playwright installs it by default)
- Allure Commandline (`npm install -g allure-commandline` to open reports locally)

## Project Setup
1. Clone the repository and enter the project folder.
2. Install dependencies and browsers:
   ```bash
   npm install
   npx playwright install
   ```

3. (Optional) Install Allure globally to view reports:
   ```bash
   npm install -g allure-commandline
   ```

## Running the Tests
- To run all tests:
  ```bash
  npm test
  ```
- To run only scenarios with a specific tag:
  ```bash
  npm test -- --tags "@CP001"
  ```
- To run multiple tags:
  ```bash
  npm test -- --tags "@CP001 or @CP002"
  ```

## Generating and Viewing Reports
1. After running tests, generate the Allure report:
   ```bash
   npm run allure:generate
   ```
2. Open the report in your browser:
   ```bash
   npm run allure:open
   ```

## Project Structure
- `features/`: Gherkin feature files, step definitions, and support code.
- `src/screenplay/`: Screenplay Pattern implementation (Tasks, Questions, Abilities, UI, etc.).
- `package.json`: Project dependencies and scripts.
- `playwright.config.ts`: Playwright configuration.
- `tsconfig.json`: TypeScript configuration.

## Notes
- All selectors and error messages are centralized for maintainability.
- Mobile device emulation is flexible and can be set from the feature file.
- Use tags to organize, filter, and report on your scenarios.
- Follow the Screenplay Pattern for scalable, maintainable test code.
