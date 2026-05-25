import { extensions } from "@wix/astro/builders";

export const dataExtension = extensions.genericExtension({
  compId: "db8b8c0c-f6f3-4bb2-98c3-3e6486a357bf",
  compName: "data-extension",
  compType: "DATA_COMPONENT",
  compData: {
    dataComponent: {
      collections: [
        {
          schemaUrl: "https://www.wix.com/",
          idSuffix: "employee-shifts",
          displayName: "Employee Shifts",
          displayField: "employeeName",
          fields: [
            {
              key: "employeeName",
              displayName: "Employee Name",
              type: "TEXT",
              required: true,
            },
            {
              key: "date",
              displayName: "Date",
              type: "TEXT",
              required: true,
            },
            {
              key: "hours",
              displayName: "Hours",
              type: "NUMBER",
              required: true,
            },
          ],
          dataPermissions: {
            itemRead: "CMS_EDITOR",
            itemInsert: "CMS_EDITOR",
            itemUpdate: "CMS_EDITOR",
            itemRemove: "CMS_EDITOR",
          },
        },
      ],
    },
  },
  createdBy: "CODE_GEN",
});
