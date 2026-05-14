import { app } from '@wix/astro/builders';
import { dashboardpageShiftManager } from './extensions/dashboard/pages/shift-manager/extensions.ts';
import { dataExtension } from './extensions/data/extensions.ts';
import { customelementwidgetCollaboratorsDryRun } from './extensions/site/widgets/custom-elements/collaborators-dry-run/extensions.ts';

export default app()
  .use(dashboardpageShiftManager)
  .use(dataExtension)
  .use(customelementwidgetCollaboratorsDryRun);

