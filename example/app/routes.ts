import {
  index,
  route,
  type RouteConfig,
  type RouteConfigEntry,
} from '@react-router/dev/routes';

const homeRoute: RouteConfigEntry = index('routes/home.tsx', {
  id: '/',
});

const newRoute: RouteConfigEntry = route('fr', 'routes/home.tsx');

export default [homeRoute, newRoute] satisfies RouteConfig;
