import { extensions } from '@wix/astro/builders';

export const customelementwidgetCollaboratorsDryRun = extensions.customElement({
  id: '1034d21f-bc0c-46e6-ba18-545dd15adda7',
  name: 'Collaborators Dry Run',
  tagName: 'collaborators-dry-run',
  element: './extensions/site/widgets/custom-elements/collaborators-dry-run/widget.tsx',
  settings: './extensions/site/widgets/custom-elements/collaborators-dry-run/panel.tsx',
  installation: {
    autoAdd: true,
  },
  width: {
    defaultWidth: 480,
    allowStretch: true,
  },
  height: {
    defaultHeight: 400,
  },
  createdBy: {
    author: "CODE_GEN",
  },
});
