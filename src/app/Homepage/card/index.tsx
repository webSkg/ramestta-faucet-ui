"use client";
import { Divider, InputBase, Paper, TextField } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material/index";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "next/link";

import { sendTransaction } from "viem/wallet";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http, parseEther } from "viem";
import { RamaTestnet } from "@/app/providers";
import { privateKey } from "@/config";
const Cardz = () => {
  const [rama, setRama] = React.useState("");
  const [inputAddress, setInputAddress] = React.useState<
    `0x${string}` | undefined
  >();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hash, setHash] = React.useState<`0x${string}` | "">();
  const [alreadyClaimMsg, setAlreadyClaimMsg] = React.useState("");
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount({
    onDisconnect: () => {
      setInputAddress(undefined);
    },
    onConnect: (data) => {
      setInputAddress(data?.address);
    },
  });
  const faucetAccount = privateKeyToAccount(
    privateKey
  );

  function setCookie(cname: any, cvalue: any, exdays: any) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname: any) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const walletClient = createWalletClient({
    account: faucetAccount,
    chain: RamaTestnet,
    transport: http("https://testnet.ramestta.com"),
  });

  const sendEther = async (inputAddress: any) => {
    if (!getCookie("faucet")) {
      setIsLoading(true);
      const hash = await sendTransaction(walletClient, {
        account: faucetAccount,
        to: inputAddress,
        value: parseEther("1"),
      });
      setIsLoading(false);
      setHash(hash);
      setCookie("faucet", true, 1);
    } else {
      setAlreadyClaimMsg("In a Day, Only 1 Test Rama allowed");
      setHash("");
    }
  };

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" component="div">
          Get Test Tokens
          <Box position="absolute" right={0} top={0}>
            <img height={100} src="/smolCoin.png" />
          </Box>
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          This faucet transfers Test Tokens and Gas Tokens on Ramascan PoS and
          chain (Ramestta Testnet). Confirm details before submitting
        </Typography>
        <Typography variant="h6" component="div">
          Network
        </Typography>
        <Button variant="contained" disableElevation fullWidth>
          RAMESTTA
        </Button>
        <Typography variant="h6" component="div">
          Select Token
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">RAMESTTA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rama}
            label="RAMESTTA"
            onChange={(e) => {
              setRama(e.target.value);
            }}
          >
            <MenuItem value={"RAMA"}>RAMA</MenuItem>
            <MenuItem value={"TEST-RAMA"}>TEST-RAMA</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" component="div" marginTop={2}>
          Wallet Address
        </Typography>
        <Box
          sx={{
            width: 600,
            maxWidth: "100%",
            display: "flex",
          }}
        >
          <TextField
            onChange={(e) => setInputAddress(e.target.value as any)}
            fullWidth
            value={inputAddress ?? address}
          />
          <Button variant="contained">Paste</Button>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          {!address ? (
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={openConnectModal}
            >
              Connect Wallet to Get Tokens
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                disableElevation
                fullWidth
                onClick={async () => {
                  try {
                    await sendEther?.(inputAddress);
                  } catch (error) {}
                }}
                disabled={isLoading}
              >
                Claim
              </Button>
              {hash ? <p>hash: {hash}</p> : <p>{alreadyClaimMsg}</p>}
            </>
          )}
        </Box>
      </CardContent>
    </React.Fragment>
  );
};

export default function OutlinedCard() {
  return (
    <Box sx={{ maxWidth: 600 }} p={4} mx={"auto"}>
      <Card className="glass" variant="outlined">
        <Cardz />
      </Card>

      <Card
        className="glass"
        variant="outlined"
        sx={{ marginTop: 10, padding: 2 }}
      >
        <Typography variant="h6" component="div">
          How can I get bulk Test Tokens?{" "}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={2}>
          The Ramestta Faucet only dispenses a small number of test tokens every
          day. To request in bulk, please complete{" "}
          <Link href="/">this form.</Link>
        </Typography>
      </Card>
    </Box>
  );
}
