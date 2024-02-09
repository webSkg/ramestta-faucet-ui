import { Box, Button, Typography } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
const index = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
      }}
      bgcolor={"white"}
      padding={2}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* <AllInclusiveIcon /> */}
        <img src="/logo.svg" height={40} />{" "}
        <Typography sx={{ minWidth: 100 }} fontSize={18} fontWeight={800}>
          Ramestta Faucet
        </Typography>
      </Link>
      <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <Typography sx={{ minWidth: 100 }}>Other Faucets</Typography>
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <Typography sx={{ minWidth: 100 }}>Build on Ramestta</Typography>
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <Typography sx={{ minWidth: 100 }}>Report issue</Typography>
        </Link>{" "}
        <Link href="/" style={{ textDecoration: "none", color: "white" }}>
          <ConnectButton showBalance={false} />
        </Link>
      </Box>
    </Box>
  );
};
export default index;
