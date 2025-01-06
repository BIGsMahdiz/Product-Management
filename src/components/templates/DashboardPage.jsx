import { Box, Button, Container, Typography } from "@mui/material";

import Appbar from "../modules/Appbar";
import TableItems from "../modules/TableItems";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/queries";
import { useEffect, useState } from "react";
import AddItemModal from "../modules/AddItemModal";
import DeleteItemModal from "../modules/DeleteItemModal";

function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
  });

  const [displayed, setDisplayed] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  useEffect(() => {
    setDisplayed(data?.data.data);
  }, [data]);

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Appbar />
      <Box
        component="div"
        mt={10}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <img src="/images/setting-3.png" alt="Manage" />
          <Typography variant="h4" component="h4" mr={1}>
            مدیریت کالا
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{ fontWeight: "700" }}
          onClick={handleOpen}
        >
          افزودن محصول
        </Button>
      </Box>
      <TableItems products={displayed} />
      <AddItemModal open={open} handleClose={handleClose} />
    </Container>
  );
}

export default DashboardPage;
