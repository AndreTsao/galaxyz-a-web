import { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Typography from "@mui/material/Typography";

import { get, subscribe } from "../store";
import Container from "./Container";
import ConnectWallet, { connectWallet } from "./ConnectWallet";
import showMessage from "./showMessage";


const CONTRACT_PERWALLET_MAX_MINT_AMOUNT= 10;
const CONTRACT_NFT_TOTAL_AMOUNT= 1000;
const CONTRACT_STATUS = {
  'OFF': '0',
  'ON': '1',
  'SOLD_OUT': '2',
}

const ETHERSCAN_DOMAIN =
  process.env.NEXT_PUBLIC_CHAIN_ID === "1"
    ? "etherscan.io"
    : "rinkeby.etherscan.io";

const Content = styled.div`
  max-width: 840px;
  margin: 0 auto 5% auto;
  strong {
    color: red;
  }
`;

const StyledMintButton = styled.div`
  display: inline-block;
  width: 180px;
  text-align: center;
  padding: 10px 10px;
  border: 4px solid #000;
  border-radius: 20px;
  color: #000;
  background: #dde4b6;
  cursor: ${(props) => {
    return props.minting || props.disabled ? "not-allowed" : "pointer";
  }};
  opacity: ${(props) => {
    return props.minting || props.disabled ? 0.6 : 1;
  }};
`;

function MintButton(props) {
  const [minting, setMinting] = useState(false);

  return (
    <StyledMintButton
      disabled={!!props.disabled}
      minting={minting}
      onClick={async () => {
        if (minting || props.disabled) {
          return;
        }
        setMinting(true);
        try {
          const { signer, contract } = await connectWallet();
          const contractWithSigner = contract.connect(signer);
          const value = ethers.utils.parseEther(
            props.mintAmount === 1 ? "0.01" : "0.02"
          );
          //call contract to mint
          const tx = await contractWithSigner.mint(props.mintAmount, {
            value,
          });
          const response = await tx.wait();
          showMessage({
            type: "success",
            title: "NFTs were minted successfully",
            body: (
              <div>
                <a
                  href={`https://${ETHERSCAN_DOMAIN}/tx/${response.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click to view transaction details
                </a>{" "}
                or go to{" "}
                <a
                  href="https://opensea.io/account"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenSea
                </a>
                。
              </div>
            ),
          });
        } catch (err) {
          showMessage({
            type: "error",
            title: "NFTs were minted failed",
            body: err.message,
          });
        }
        props.onMinted && props.onMinted();
        setMinting(false);
      }}
      style={{
        background: "#dde4b6",
        ...props.style,
      }}
    >
      mint{props.mintAmount} 个{minting ? "ing..." : ""}
    </StyledMintButton>
  );
}

function MintSection() {
  const [status, setStatus] = useState(CONTRACT_STATUS.OFF);//contract.status
  const [progress, setProgress] = useState(null);//已经mint的数量
  const [fullAddress, setFullAddress] = useState(null);
  const [numberMinted, setNumberMinted] = useState(0);//某地址已经minted的数量

  async function updateStatus() {//更新status和已经mint的数量  这是mint逻辑的第一个控制条件
    const { contract } = await connectWallet();
    const status = await contract.status();//
    const progress = parseInt(await contract.totalSupply());
    setStatus(status.toString());
    setProgress(progress);
    // 在 mint 事件的时候更新数据
    contract.on("Minted", async (event) => {
      const status = await contract.status();
      const progress = parseInt(await contract.totalSupply());//已经mint的数量
      setStatus(status.toString());
      setProgress(progress);
    });
  }

  useEffect(() => {
    (async () => {
      const fullAddressInStore = get("fullAddress") || null;//从持久化存储中获取
      if (fullAddressInStore) {
        const { contract } = await connectWallet();
        const numberMinted = await contract.numberMinted(fullAddressInStore);
        setNumberMinted(parseInt(numberMinted));
        setFullAddress(fullAddressInStore);
      }
      subscribe("fullAddress", async () => {
        const fullAddressInStore = get("fullAddress") || null;
        setFullAddress(fullAddressInStore);
        if (fullAddressInStore) {
          const { contract } = await connectWallet();
          const numberMinted = await contract.numberMinted(fullAddressInStore);
          setNumberMinted(parseInt(numberMinted));
          updateStatus();
        }
      });
    })();
  }, []);

  useEffect(() => {
    try {
      const fullAddressInStore = get("fullAddress") || null;
      if (fullAddressInStore) {
        updateStatus();
      }
    } catch (err) {
      showMessage({
        type: "error",
        title: "Failed to get contract status",
        body: err.message,
      });
    }
  }, []);

  async function refreshStatus() {
    const { contract } = await connectWallet();
    const numberMinted = await contract.numberMinted(fullAddress);
    setNumberMinted(parseInt(numberMinted));
  }

  let mintButton = (
    <StyledMintButton
      style={{
        background: "#eee",
        color: "#999",
        cursor: "not-allowed",
      }}
    >
      Not yet started
    </StyledMintButton>
  );

  if (status === CONTRACT_STATUS.ON) {
    mintButton = (
      <div
        style={{
          display: "flex",
        }}
      >
        <MintButton
          onMinted={refreshStatus}
          mintAmount={1}
          style={{ marginRight: "20px" }}
        />
        <Typography
          style={{ textAlign: "center"}}
          variant="h3"
          component="div"
        >
          {numberMinted}
        </Typography>
        <MintButton
          onMinted={refreshStatus}
          mintAmount={2}
          disabled={numberMinted === 1}
        />
      </div>
    );
  }

  if (progress >= CONTRACT_NFT_TOTAL_AMOUNT || status === CONTRACT_STATUS.SOLD_OUT) {
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        Sold Out
      </StyledMintButton>
    );
  }

  if (numberMinted >= CONTRACT_PERWALLET_MAX_MINT_AMOUNT) {
    console.log('log---444')
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        铸造已达上限
      </StyledMintButton>
    );
  }

  if (!fullAddress) {
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        Connect Wallet
      </StyledMintButton>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: 120, display: "flex", alignItems: "center" }}>
        Your wallet: <ConnectWallet />{" "}
        {fullAddress && (
          <span style={{ marginLeft: 10 }}>
            can mint {CONTRACT_PERWALLET_MAX_MINT_AMOUNT - numberMinted} Botties
          </span>
        )}
      </div>
      {mintButton}
      <div style={{ marginTop: 120, fontSize: 25, textAlign: "center" }}>
        Minted：{progress === null ? "Please connect wallet" : progress} / {CONTRACT_NFT_TOTAL_AMOUNT}，价格
        0.002 ETH 一个，每个钱包最多 10 个.
        <br />
        Go
      </div>
    </div>
  );
}

function Mint() {
  return (
    <Container
      style={{
        background: "#175C5B",
        color: "#fff",
      }}
      id="mint"
    >
      <Typography
        style={{ textAlign: "center", marginTop: "5%" }}
        variant="h3"
        gutterBottom
        component="div"
      >
        B o t t y
      </Typography>

      <Content>
        <Typography
          style={{
            marginTop: "5%",
            textAlign: "center",
          }}
          variant="body1"
          gutterBottom
        >
          Nice to mint you !
        </Typography>
        <div
          style={{
            marginTop: 60,
            border: "4px dashed #000",
            padding: "40px",
            borderRadius: 20,
          }}
        >
          <MintSection />
        </div>
      </Content>
    </Container>
  );
}

export default Mint;
