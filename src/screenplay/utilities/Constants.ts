export const CUSTOM_DEVICE_NAME = 'iPhone X';
export const ERROR_CONSOLE_ERRORS = (errors: string[]) => `Errors detected :\n${errors.join("\n")}`;
export const ERROR_MENU_OPTION_SELECTOR = (option: string) => `Menu option selector not found: ${option}`;
export const ERROR_CARD_TITLES_MISMATCH = (expected: string[], visible: string[]) =>
  `Expected and visible card titles do not match.\nExpected: ${JSON.stringify(expected)}\nVisible: ${JSON.stringify(visible)}`;
export const ERROR_NO_CARD_TITLES = "No card titles found in the DOM. Check the selector or page state.";
export const HOMEPAGE_URL = "https://www.creai.mx/";
export const ERROR_ACTOR_NOT_INITIALIZED = "Actor is not initialized. Make sure the Before hook is working correctly.";
export const REGEX_HOME_URL = /www\.creai\.mx/;
export const ERROR_ABILITY_NOT_FOUND = (actorName: string, key: string) => `Actor ${actorName} does not have the ability: ${key}`;
export const ACTOR = "QA";
export const BROWSE_THE_WEB = "BrowseTheWeb";
export const DOCUMENT = "document";
export const DOMAIN_MAIN_URL = "creai.mx";
export const DOCUMENT_LOADED = "domcontentloaded";