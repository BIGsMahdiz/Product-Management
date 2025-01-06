import { sp } from "@/utils/replaceNumber";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import EditItemModal from "./EditItemModal";

function TableItems({ products }) {
  const [id, setId] = useState();
  const [editStage, setEditStage] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const saveIdForDelete = (id) => {
    setId(id);
    handleOpen();
  };

  const saveDataForEdit = (data) => {
    setEditStage(data);
    handleOpen2();
  };

  if (!products) return <h3>Loading...</h3>;

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: "#F2F2F2",
            height: "70px",
          }}
        >
          <TableRow>
            <TableCell
              align="right"
              sx={{ fontWeight: "500", fontSize: "1.2rem" }}
            >
              نام کالا
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "500", fontSize: "1.2rem" }}
            >
              موجودی
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "500", fontSize: "1.2rem" }}
            >
              قیمت
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "500", fontSize: "1.2rem" }}
            >
              شناسه کالا
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "500", fontSize: "1.2rem" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((items) => (
            <TableRow
              key={items.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {items.name}
              </TableCell>
              <TableCell align="right">{sp(items.quantity)}</TableCell>
              <TableCell align="right">{sp(items.price)} هزار تومان</TableCell>
              <TableCell align="right">{items.id}</TableCell>
              <TableCell align="right">
                <img
                  src="/images/edit.png"
                  alt="Edit"
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                  onClick={() => saveDataForEdit(items)}
                />
                <img
                  src="/images/trash.png"
                  alt="Delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => saveIdForDelete(items.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteItemModal
        open={open}
        handleClose={handleClose}
        id={id}
        setId={setId}
      />
      <EditItemModal
        open2={open2}
        handleClose2={handleClose2}
        editStage={editStage}
        setEditStage={setEditStage}
      />
    </TableContainer>
  );
}

export default TableItems;
