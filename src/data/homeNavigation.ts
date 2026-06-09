interface HomeNavigationItem {
  titleKey: string
  path: string
}

export const homeNavigation: HomeNavigationItem[] = [
  {
    titleKey: 'header.navigation.about',
    path: '/about',
  },
  {
    titleKey: 'header.navigation.product',
    path: '/product',
  },
  {
    titleKey: 'header.navigation.gallery',
    path: '/gallery',
  },
  {
    titleKey: 'header.navigation.news',
    path: '/news',
  },
  {
    titleKey: 'header.navigation.contact',
    path: '/#contact',
  },
] as const
