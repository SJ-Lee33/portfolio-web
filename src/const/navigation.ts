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
    title: 'PROFILE',
    value: NAVIGATION_PATH.profile,
  },
  {
    title: 'PROJECT',
    value: NAVIGATION_PATH.project,
  },
  {
    title: 'DEVELOPER',
    value: NAVIGATION_PATH.developer,
  },
  {
    title: 'DESIGNER',
    value: NAVIGATION_PATH.designer,
  },
  {
    title: 'MARKETER',
    value: NAVIGATION_PATH.marketer,
  },
]
