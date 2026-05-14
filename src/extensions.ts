import { app } from '@wix/astro/builders';
import { dashboardpageShiftManager } from './extensions/dashboard/pages/shift-manager/extensions.ts';
import { dataExtension } from './extensions/data/extensions.ts';

export default app()
  .use(dashboardpageShiftManager)
  .use(dataExtension);

