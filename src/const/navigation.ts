export const NAVIGATION_PATH = {
  home: '/',
  profile: '/profile',
  project: '/project',
  engineering: '/project?projectType=engineering',
  design: '/project?projectType=design',
  planning: '/project?projectType=planning',
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
    title: 'ENGINEERING',
    value: NAVIGATION_PATH.engineering,
  },
  {
    title: 'DESIGN & BRARNDING',
    value: NAVIGATION_PATH.design,
  },
  {
    title: 'PLANNING',
    value: NAVIGATION_PATH.planning,
  },
  {
    title: 'STUDY',
    value: NAVIGATION_PATH.study,
  },
]
