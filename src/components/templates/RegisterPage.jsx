import { Box, Container, Grid2, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { inputRegister } from "@/constants/inputs";
import { useMutation } from "@tanstack/react-query";
import { useRegister } from "@/services/mutations";
import { useState } from "react";

const schema = yup.object({
  userName: yup.string().required("نام کاربری اجباری است"),
  password: yup
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("رمز عبور اجباری است"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "رمز عبور و تایید آن باید یکسان باشند")
    .required("تکرار رمز عبور اجباری است"),
});

function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({ mutationFn: (data) => useRegister(data) });

  const onSubmit = (data) => {
    mutate(
      { username: data.userName, password: data.password },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/login");
        },
        onError: (error) => console.log(error),
      }
    );
  };

  return (
    <Container maxWidth="sm">
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 10 }}>
          <Typography
            component="h4"
            variant="h4"
            sx={{
              color: "#282828",
              fontSize: "31px",
              fontWeight: "700",
              marginTop: 10,
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            بوت کمپ بوتواستارت
          </Typography>
          <Box
            component="div"
            sx={{
              backgroundColor: "#ffff",
              border: "1px",
              p: 3,
              mt: 7,
              borderRadius: "40px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box component="div" mt={5}>
              <img src="/images/Union.png" alt="Botostart" />
            </Box>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#282828",
                fontSize: "24px",
                fontWeight: "500",
                lineHeight: "37.5px",
                textAlign: "center",
                mb: 10,
              }}
            >
              فرم ثبت نام
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="registerFormCs">
              {inputRegister.map((input, index) => {
                return (
                  <div key={index}>
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      {...register(input.name)}
                    />
                    {errors[input.name] && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "16px",
                          marginTop: "5px",
                        }}
                      >
                        {errors[input.name].message}
                      </p>
                    )}
                  </div>
                );
              })}
              <button>ثبت نام</button>
            </form>
            <Typography
              component="p"
              variant="p"
              sx={{
                mt: 2,
                color: "#3A8BED",
                direction: "rtl",
                textAlign: "center",
              }}
            >
              <Link to="/login">حساب کاربری دارید؟</Link>
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default RegisterPage;
