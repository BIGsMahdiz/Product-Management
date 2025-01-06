import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProducts } from "@/services/mutations";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const styleOfModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  height: 448,
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
};

const stylesOfInput = {
  height: "25px",
  padding: "10px",
  backgroundColor: "#F2F2F2",
  border: "0",
  borderRadius: "8px",
  outline: "none",
  marginBottom: "12px",
  fontSize: "1rem",
};

export default function EditItemModal({
  open2,
  handleClose2,
  editStage,
  setEditStage,
}) {
  const queryClient = useQueryClient();
  const [productsInfo, setProductsInfo] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    setProductsInfo(editStage);
  }, [editStage]);

  const { mutate } = useMutation({
    mutationFn: (data) => editProducts(data.id, data),
  });

  const changeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setProductsInfo((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const closeHandler = () => {
    setProductsInfo({
      name: "",
      quantity: "",
      price: "",
    });

    handleClose2();
  };

  const editProductHandler = () => {
    setProductsInfo((prev) => ({ ...prev, id: editStage.id }));
    toast.success(`محصول ${productsInfo.name} با موفقیت تغییر یافت!`);
    mutate(productsInfo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-products"] });
      },
    });

    setProductsInfo({
      name: "",
      quantity: "",
      price: "",
    });

    handleClose2();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={styleOfModal}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h5"
              textAlign="center"
            >
              ویرایش اطلاعات
            </Typography>
            <form
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <label
                for="name"
                style={{ fontSize: "1.2rem", marginBottom: "7px" }}
              >
                نام کالا
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={productsInfo?.name}
                placeholder="نام کالا"
                onChange={changeHandler}
                style={stylesOfInput}
              />
              <label
                for="quantity"
                style={{ fontSize: "1.2rem", marginBottom: "7px" }}
              >
                تعداد موجودی
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productsInfo?.quantity}
                placeholder="تعداد"
                onChange={changeHandler}
                style={stylesOfInput}
              />
              <label
                for="price"
                style={{ fontSize: "1.2rem", marginBottom: "7px" }}
              >
                قیمت
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productsInfo?.price}
                placeholder="قیمت"
                onChange={changeHandler}
                style={stylesOfInput}
              />
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ margin: "0 5px", fontSize: "1.1rem" }}
                  onClick={editProductHandler}
                >
                  ثبت اطلاعات جدید
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ margin: "0 5px", fontSize: "1.1rem" }}
                  onClick={closeHandler}
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
