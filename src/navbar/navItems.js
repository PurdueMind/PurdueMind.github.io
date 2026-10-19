// Single source of truth for the site's navigation, shared by the desktop
// navbar, the mobile menu and the footer sitemap. Hashes must match the
// `id`s on the target pages' section headers.
export const STOREFRONT_URL = 'https://www.TooCOOLPurdue.com/TooCOOLPurdueWL/vECItemCatalogOrganizationItems/OrganizationItemsGallery.aspx?Organization=5346';

const NAV_ITEMS = [
  {
    label: 'Home',
    to: '/',
    children: [
      { label: 'Calendar', to: { pathname: '/', hash: '#calendarBreak' } },
    ],
  },
  {
    label: 'People',
    to: '/People',
    children: [
      { label: 'Executive Board', to: { pathname: '/People', hash: '#officersBreak' } },
      { label: 'Team Leads', to: { pathname: '/People', hash: '#peopleMiddleDiv' } },
      { label: 'Advisors', to: { pathname: '/People', hash: '#peopleBottomDiv' } },
    ],
  },
  {
    label: 'Projects',
    to: '/Projects',
    children: [
      { label: 'DVT', to: '/Projects/DVT' },
      { label: 'CTS', to: '/Projects/CTS' },
      { label: 'Tremor Glove', to: '/Projects/TremorGlove' },
      { label: 'MEND', to: '/Projects/MEND' },
    ],
  },
  {
    label: 'Learning',
    to: '/Learning',
    children: [
      { label: 'Onboarding', to: { pathname: '/Learning', hash: '#onboardingBreak' } },
      { label: 'Workshops', to: { pathname: '/Learning', hash: '#workshopsBreak' } },
    ],
  },
  {
    label: 'Contact',
    to: '/Contact',
  },
];

export default NAV_ITEMS;
