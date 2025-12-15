export class HomePage {
  public static readonly mainMenu = '.navbar11_menu-links';
  public static readonly navbarMenu = '.navbar11_menu.w-nav-menu';
  public static readonly navbarMenuButton = '.navbar11_menu-button.w-nav-button';
  public static readonly menuLinksSelector = '> .navbar11_menu-links';
  public static readonly contactCta = 'a:has-text("Contact")';
  public static readonly logo = '.navbar11_logo';
  public static readonly cookieAcceptButton = '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll';
  public static readonly mainMenuOptions = [
    'Services',
    'Success stories',
    'About us',
    'Knowledge hub'
  ];
  public static readonly cardsSection = 'main > div:nth-child(3)';
  public static readonly cardTitle = '.swiper_slide_content-left p.text-size-large';
  public static readonly blogCardTitle = '.blog_card-right p.text-size-xlarge';
  public static readonly mobileDropdownToggle = '> .navbar11_menu-links > .navbar11_dropdown-toggle';
  public static readonly ariaExpanded = 'aria-expanded';
  public static readonly openDropdownList = '.navbar11_dropdown-list.w--nav-dropdown-list-open';
  public static readonly dropdownToggleSelector = '> .navbar11_dropdown-toggle';
  public static readonly dropdownLabelSelector = '> .navbar11_dropdown-toggle .navbar11_link > div';
  public static readonly otherMenuOptionsSelector = '> a.navbar11_link.w-inline-block > div:first-child';
  public static readonly menuOptionsSelector = '.navbar11_link, .navbar11_dropdown-toggle';
  public static readonly expectedCardTitles = [
    'Transforming customer support with a bespoke AI Logistics Agent',
    'Streamlining entry management with AI for faster, safer operations',
    'Streamlining operations and maximizing revenue with an AI Travel Agent',
    'Accelerating growth through seamless integration and strategic AI innovation'
  ];
}
