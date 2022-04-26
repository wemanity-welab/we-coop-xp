/**
 * Asynchronously loads the component for MissionList
 */

import { lazyLoad } from 'utils/loadable';

export const MissionList = lazyLoad(
  () => import('./index'),
  module => module.MissionList,
);
