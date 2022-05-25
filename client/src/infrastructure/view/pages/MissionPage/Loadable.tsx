/**
 * Asynchronously loads the component for MissionList
 */

import { lazyLoad } from 'utils/loadable';

export const MainMissionList = lazyLoad(
  () => import('./index'),
  module => module.MainMissionList,
);
