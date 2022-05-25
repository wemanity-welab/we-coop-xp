/**
 * Asynchronously loads the component for Missions
 */

import { lazyLoad } from 'utils/loadable';

export const Missions = lazyLoad(
  () => import('./index'),
  module => module.Missions,
);
