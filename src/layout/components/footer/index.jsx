import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => (
  <Box
    sx={{
      width: "100%",
      padding: "16px",
      textAlign: "right",
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: ".5rem",
    }}
  >
    <Box sx={{ display: "flex", gap: 1.9, minWidth: 292 }}>
      <Link href="#">
        <Typography color="primary">پشتیبانی</Typography>
      </Link>
      <Link href="#" >
        <Typography color="primary">مستندات</Typography>
      </Link>
      <Link href="#">
        <Typography color="primary">شرایط استفاده</Typography>
      </Link>
      <Link href="#">
        <Typography color="primary">قوانین</Typography>
      </Link>
    </Box>

    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        "@media (min-width: 846px)": { mr: "auto" },
        "@media (max-width: 710px)": { mr: "auto" },
        "@media (max-width: 545px)": { mr: "0" },
        display: "block",
        textAlign: "center",
      }}
    >
      © طراحی و توسعه توسط دایا تدبیر یسر
    </Typography>
  </Box>
);

export default Footer;
