import { useEffect, useState } from "react";
import useSWR from "swr";

import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { PeopleAltOutlined } from "@mui/icons-material";

import { tesloApi } from "@/api";
import { IUser } from "@/interfaces";
import { AdminLayout } from "@/components/layouts";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) {
    return <></>;
  }

  const onRoleUpdated = async (userId: string, newRole: "admin" | "client") => {
    const previousUsers = [...users];
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      const body = {
        userId,
        newRole,
      };
      await tesloApi.put("/admin/users", body);
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 250 },
    {
      field: "role",
      headerName: "Rol",
      width: 150,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            sx={{ width: "300px" }}
            onChange={(event) => onRoleUpdated(row.id, event.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Cliente</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Usuarios"
      subTitle="Mantenimiento de Usuarios"
      icon={<PeopleAltOutlined />}
    >
      <Grid container className="fadeIn" mt={4}>
        <Grid item xs={12} sx={{ minHeight: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
