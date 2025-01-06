import { Box, Container, Grid2, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { inputLogin } from "@/constants/inputs";
import { useMutation } from "@tanstack/react-query";
import { useLogin } from "@/services/mutations";
import { setCookie } from "@/utils/cookie";

const schema = yup.object({
  userName: yup.string().required("نام کاربری اجباری است"),
  password: yup
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("رمز عبور اجباری است"),
});

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({ mutationFn: (data) => useLogin(data) });

  const onSubmit = (data) => {
    console.log(data);
    mutate(
      { username: data.userName, password: data.password },
      {
        onSuccess: (data) => {
          console.log(data);
          setCookie(data?.data.token);
          navigate("/dashboard");
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
              فرم ورود
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="registerFormCs">
              {inputLogin.map((input, index) => {
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
              <button>ورود</button>
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
              <Link to="/register">ایجاد حساب کاربری!</Link>
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default LoginPage;
