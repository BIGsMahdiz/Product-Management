import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProducts, deleteProducts } from "@/services/mutations";
import { useState } from "react";

const styleOfModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  height: 340,
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default function DeleteItemModal({ open, handleClose, id, setId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteProducts(data),
  });

  const deleteProductHandler = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-products"] });
      },
    });
    setId();
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={styleOfModal}>
            <img src="/images/Close.png" alt="Close" style={{}} />
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h5"
              textAlign="center"
              mt={5}
            >
              آیا از حذف این محصول مطمئنید؟
            </Typography>
            <form
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "50px",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    margin: "0 5px",
                    fontSize: "1.1rem",
                    backgroundColor: "#F43F5E",
                  }}
                  onClick={deleteProductHandler}
                >
                  حذف
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ margin: "0 5px", fontSize: "1.1rem" }}
                  onClick={handleClose}
                >
                  انصراف
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
