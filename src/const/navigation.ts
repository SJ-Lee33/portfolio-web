export const NAVIGATION_PATH = {
  home: '/',
  profile: '/profile',
  project: '/project',
  development: '/project?projectType=development',
  design: '/project?projectType=design',
  marketing: '/project?projectType=marketing',
  study: '/study',
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
    value: NAVIGATION_PATH.development,
  },
  {
    title: 'DESIGNER',
    value: NAVIGATION_PATH.design,
  },
  {
    title: 'MARKETER',
    value: NAVIGATION_PATH.marketing,
  },
  {
    title: 'STUDY',
    value: NAVIGATION_PATH.study,
  },
]
