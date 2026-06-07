// types/admin.ts

export interface AdminRole {
  id: string;
  displayName: string;
  roleName: string;
}

export interface AdminUser {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  role: AdminRole;
}

import { fetchAdmins } from "../api/admin";
import DataTable from "../components/datatable/datatable";
import { ColumnDef } from "../components/datatable/table-types";

export default function AdminUsersPage() {
  const columns: ColumnDef<AdminUser>[] = [
    {
      key: "userId",
      header: "User ID",
      sortable: true,
    },
    {
      key: "firstName",
      header: "First Name",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      render: (row) => row.role.displayName,
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <div>
      <DataTable<AdminUser> columns={columns} fetcher={fetchAdmins} />
    </div>
  );
}
