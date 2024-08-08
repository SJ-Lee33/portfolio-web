export const NAVIGATION_PATH = {
  home: '/',
  profile: '/profile',
  project: '/project',
  developer: '/project?type=development',
  designer: '/project?type=design',
  marketer: '/project?type=marketing',
}

export const MENU = [
  {
    title: 'Profile',
    value: NAVIGATION_PATH.profile,
  },
  {
    title: 'Project',
    value: NAVIGATION_PATH.project,
  },
  {
    title: 'Developer',
    value: NAVIGATION_PATH.developer,
  },
  {
    title: 'Designer',
    value: NAVIGATION_PATH.designer,
  },
  {
    title: 'Marketer',
    value: NAVIGATION_PATH.marketer,
  },
]
