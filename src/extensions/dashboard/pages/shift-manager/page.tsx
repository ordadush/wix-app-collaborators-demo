import { dashboard } from "@wix/dashboard";
import { items } from "@wix/data";
import {
  Box,
  Button,
  Card,
  Cell,
  EmptyState,
  FormField,
  Input,
  Layout,
  Page,
  Table,
  TableToolbar,
  WixDesignSystemProvider,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { Add } from "@wix/wix-ui-icons-common";
import { useEffect, useState } from "react";

const COLLECTION_ID = "@orda266/my-appvkg45g/employee-shifts";

interface Shift {
  _id: string;
  employeeName: string;
  date: string;
  hours: number;
}

interface ShiftForm {
  employeeName: string;
  date: string;
  hours: string;
}

const EMPTY_FORM: ShiftForm = { employeeName: "", date: "", hours: "" };

export default function ShiftManagerPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ShiftForm>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  const loadShifts = async () => {
    setLoading(true);
    try {
      const result = await items
        .query(COLLECTION_ID)
        .descending("date")
        .limit(300)
        .find();
      setShifts(
        result.items.map((item) => ({
          _id: item["_id"] as string,
          employeeName: item["employeeName"] as string,
          date: item["date"] as string,
          hours: item["hours"] as number,
        }))
      );
    } catch (e) {
      console.error("Failed to load shifts", e);
      dashboard.showToast({ message: "Failed to load shifts", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShifts();
  }, []);

  const handleSave = async () => {
    if (!form.employeeName.trim() || !form.date || !form.hours) {
      dashboard.showToast({
        message: "Please fill in all fields",
        type: "warning",
      });
      return;
    }
    const hours = parseFloat(form.hours);
    if (isNaN(hours) || hours <= 0) {
      dashboard.showToast({
        message: "Hours must be a positive number",
        type: "warning",
      });
      return;
    }
    setSaving(true);
    try {
      await items.insert(COLLECTION_ID, {
        employeeName: form.employeeName.trim(),
        date: form.date,
        hours,
      });
      dashboard.showToast({ message: "Shift added successfully", type: "success" });
      setForm(EMPTY_FORM);
      setShowForm(false);
      await loadShifts();
    } catch (e) {
      console.error("Failed to add shift", e);
      dashboard.showToast({ message: "Failed to add shift", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: "Employee Name",
      render: (row: Shift) => row.employeeName,
      width: "30%",
    },
    {
      title: "Date",
      render: (row: Shift) => row.date,
      width: "40%",
    },
    {
      title: "Hours",
      render: (row: Shift) => row.hours,
      width: "40%",
    },
  ];

  return (
    <WixDesignSystemProvider>
      <Page height="100vh">
        <Page.Header
          title="Shift Managerhghg"
          subtitle="Manage employee shiftshgfhgfh"
          actionsBar={
            <Button
              prefixIcon={<Add />}
              onClick={() => setShowForm((v) => !v)}
            >
              Add Shift
            </Button>
          }
        />
        <Page.Content>
          <Layout>
            <Cell span={12}>
              {showForm && (
                <Box marginBottom="SP4">
                  <Card>
                    <Card.Header title="New Shift" />
                    <Card.Content>
                      <Box direction="vertical" gap="SP3">
                        <FormField label="Employee Name" required>
                          <Input
                            placeholder="Enter employee name"
                            value={form.employeeName}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                employeeName: e.target.value,
                              }))
                            }
                          />
                        </FormField>
                        <FormField label="Date" required>
                          <Input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, date: e.target.value }))
                            }
                          />
                        </FormField>
                        <FormField label="Hours" required>
                          <Input
                            type="number"
                            placeholder="e.g. 8"
                            value={form.hours}
                            min={0}
                            step={0.5}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, hours: e.target.value }))
                            }
                          />
                        </FormField>
                        <Box direction="horizontal" gap="SP2">
                          <Button onClick={handleSave} disabled={saving}>
                            {saving ? "Saving..." : "Save Shift"}
                          </Button>
                          <Button
                            priority="secondary"
                            onClick={() => {
                              setShowForm(false);
                              setForm(EMPTY_FORM);
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Card.Content>
                  </Card>
                </Box>
              )}
              <Card hideOverflow>
                <Table
                  data={loading ? [] : shifts}
                  columns={columns}
                  showLastRowDivider
                >
                  <TableToolbar>
                    <TableToolbar.ItemGroup position="start">
                      <TableToolbar.Item>
                        <TableToolbar.Title>Employee Shifts</TableToolbar.Title>
                      </TableToolbar.Item>
                    </TableToolbar.ItemGroup>
                  </TableToolbar>
                  <Table.Titlebar />
                  {!loading && shifts.length === 0 ? (
                    <EmptyState
                      skin="section"
                      title="No shifts yet"
                      subtitle="Add your first shift using the button above."
                    />
                  ) : (
                    <Table.Content />
                  )}
                </Table>
              </Card>
            </Cell>
          </Layout>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
}
