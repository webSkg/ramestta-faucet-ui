import { Box, Button, Typography } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Link from "next/link";
const index = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        background: "white",
      }}
    >
      <Typography sx={{ minWidth: 100 }} fontSize={18} fontWeight={800}>
        © 2023{"  "}
        <a
          href="https://www.ramestta.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ramestta.com
        </a>{" "}
        | All rights reserved{" "}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <Typography sx={{ minWidth: 100 }}>Cookie Policy</Typography>
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <Typography sx={{ minWidth: 100 }}>Terms of Use</Typography>
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <Typography sx={{ minWidth: 100 }}>Privacy Policy</Typography>
        </Link>{" "}
        <Link
          href="/"
          style={{ textDecoration: "none", color: "white" }}
        ></Link>
      </Box>
    </div>
  );
};
export default index;
