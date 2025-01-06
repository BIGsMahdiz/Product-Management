import { Avatar, Box, Grid2, Typography } from "@mui/material";

function Appbar() {
  return (
    <div>
      {" "}
      <Grid2 container spacing={0}>
        <Grid2
          size={{ xs: 12, sm: 7, md: 7, lg: 10 }}
          sx={{ position: "relative" }}
        >
          <input
            type="search"
            style={{
              width: "100%",
              height: "57px",
              borderRadius: "0 16px 16px 0",
              border: "1px solid #E4E4E4",
              padding: "12px 38px",
              outline: "none",
            }}
            placeholder="جستجوی کالا"
          />
          <img
            src="/images/search-normal.png"
            alt="Search"
            style={{ position: "absolute", top: "15px", right: "8px" }}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 5, md: 5, lg: 2 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffff",
            borderRadius: "16px 0 0 16px",
            padding: "3px 4px",
            border: "1px solid #E4E4E4",
            height: "57px",
          }}
        >
          <Avatar src="/images/eyes.gif" sx={{ ml: 2 }} />
          <Box component="div">
            <Typography variant="h6" component="h6">
              مهدی موسوی نژاد
            </Typography>
            <Typography variant="p" component="p">
              مدیر
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default Appbar;
