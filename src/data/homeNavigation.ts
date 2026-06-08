interface HomeNavigationItem {
  title: string
  path: string
  detailKey: string
  children?: {
    title: string
    titleKey?: string
    path: string
  }[]
}

export const homeNavigation: HomeNavigationItem[] = [
  {
    title: 'Research',
    path: '/research/introduction',
    detailKey: 'home.navigation.research',
    children: [
      {
        title: 'MycoDx Introduction',
        titleKey: 'researchNavigation.introduction',
        path: '/research/introduction',
      },
      {
        title: 'Research Areas',
        titleKey: 'researchNavigation.areas',
        path: '/research/areas',
      },
    ],
  },
  {
    title: 'People',
    path: '/members',
    detailKey: 'home.navigation.people',
  },
  {
    title: 'Publication',
    path: '/publication',
    detailKey: 'home.navigation.publication',
    children: [
      { title: 'Paper', path: '/publication#paper' },
      { title: 'Patent', path: '/publication#patent' },
    ],
  },
  {
    title: 'Equipment',
    path: '/product',
    detailKey: 'home.navigation.equipment',
  },
  {
    title: 'Gallery',
    path: '/gallery',
    detailKey: 'home.navigation.gallery',
  },
  {
    title: 'News',
    path: '/news',
    detailKey: 'home.navigation.news',
  },
  {
    title: 'Contact Us',
    path: '#contact',
    detailKey: 'home.navigation.contact',
  },
] as const
