import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select } from "antd";

import AddRole from "@/components/pages/role/AddRole";
import { getRoles, delRoles, getRolesByGroup } from "@/services/role";
import { getGroups } from "@/services/group";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import { updateGroupRole } from "@/services/grouprole";

export default function BasicTable() {
  const [groups, setGroups] = React.useState([]);
  const [group, setGroup] = React.useState();
  const [roles, setRoles] = React.useState([]);

  const fetch = async () => {
    const [groups] = await Promise.all([getGroups()]);
    setGroups(groups.data);

    rolesGroupCheck(groups?.data[0]?.id);
  };
  const rolesGroupCheck = async (value) => {
    const [roles, rolesGroup] = await Promise.all([
      getRoles(),
      getRolesByGroup(value),
    ]);
    const newRoles = [...roles?.data];
    newRoles.map((role, index) => {
      const check = rolesGroup?.data.some(
        (roleGroup) => roleGroup.id === role.id
      );
      if (check) {
        newRoles[index] = { ...role, checked: true };
      } else {
        newRoles[index] = { ...role, checked: false };
      }
    });
    setGroup(value);
    setRoles(newRoles);
  };

  React.useEffect(() => {
    fetch();
  }, []);
  const handleChange = async (value) => {
    await rolesGroupCheck(value);
  };
  const handleDelete = async (id) => {
    const res = await delRoles(id);
    if (res) {
      toast.success(res.message);
      fetch();
    }
  };
  const onChange = (e, index) => {
    console.log(e.target.value);
    const newRoles = [...roles];
    newRoles[index] = { ...roles[index], checked: e.target.checked };
    updateGroupRole({
      groupId: group,
      roles: newRoles[index],
    });
    setRoles(newRoles);
  };
  return (
    <div className="container mx-auto pt-5">
      <div className="py-4 flex flex-row space-x-1">
        <Select
          value={group}
          style={{ width: 120 }}
          onChange={handleChange}
          options={groups.map((group) => ({
            value: group.id,
            label: group.name,
          }))}
        />
        <AddRole rerender={fetch} />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>URL</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles?.map((role, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox
                        value={role.id}
                        checked={role.checked}
                        onChange={(e) => onChange(e, index)}
                      />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {role.URL}
                    </TableCell>
                    <TableCell align="right">{role.description}</TableCell>
                    <TableCell align="right">
                      <div>
                        <IconButton
                          onClick={() => handleDelete(role.id)}
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small">
                          Edit
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
