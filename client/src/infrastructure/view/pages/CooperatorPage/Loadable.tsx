/**
 * Asynchronously loads the component for MissionList
 */

import { lazyLoad } from 'utils/loadable';

export const Cooperators = lazyLoad(
  () => import('./Cooperators/index'),
  module => module.Cooperators,
);
