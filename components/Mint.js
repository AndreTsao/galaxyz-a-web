import { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Typography from "@mui/material/Typography";

import { get, subscribe } from "../widget/store";
import Container from "./Container";
import ConnectWallet, { connectWallet } from "./ConnectWallet";
import showMessage from "./showMessage";
import BigNumber from "bignumber.js";
import {
  CONTRACT_PERWALLET_MAX_MINT_AMOUNT,
  CONTRACT_NFT_TOTAL_AMOUNT,
  CONTRACT_NFT_PER_PRICE,
  CONTRACT_STATUS
} from "../widget/projectParam";
import { padWidth } from "../widget/utils";



const ETHERSCAN_DOMAIN =
  process.env.NEXT_PUBLIC_CHAIN_ID === "1"
    ? "etherscan.io"
    : "rinkeby.etherscan.io";

const GetMaxSpan = styled.div`
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;

const StyledMintButton = styled.div`
  display: inline-block;
  text-align: center;
  padding: 10px 15px;
  border: 4px solid #000;
  font-family: 'BradleyHandITCTT-Bold';
  font-size: 1.8rem;
  border-radius: 35px;
  color: #000;
  background: #dde4b6;
  @media only screen and (max-width: ${padWidth}) {
  font-size: 1.4rem;
  }
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
          const value = ethers.utils.parseEther(/////
            new BigNumber(props.wantMintAmount).multipliedBy(new BigNumber(CONTRACT_NFT_PER_PRICE)).toString()
          );
          //call contract to mint
          const tx = await contractWithSigner.mint(props.wantMintAmount, {
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
        background: "#F0CF22",
        ...props.style,
      }}
    >
      mint{props.wantMintAmount} 个{minting ? "ing..." : ""}
    </StyledMintButton>
  );
}

function MintSection() {
  const [status, setStatus] = useState(CONTRACT_STATUS.OFF);//contract.status
  const [progress, setProgress] = useState(null);//已经mint的数量
  const [fullAddress, setFullAddress] = useState(null);
  const [numberMinted, setNumberMinted] = useState(0);//某地址已经minted的数量
  const [wantMintAmount, setWantMintAmount] = useState(0);//点击选择mint的数量

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

  useEffect(() => {//？？？？
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
          wantMintAmount={wantMintAmount}
          style={{ marginRight: "20px" }}
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
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        You have reached the maximum mint number
      </StyledMintButton>
    );
  }
  console.log('mint---fullAddress', fullAddress)
  if (!fullAddress) {//没有连接钱包时卡住mint按钮
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

  const MintboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //border: 4px dashed #000;
    padding: 70px 60px 30px;
    border-radius: 70px;
    background: #181E29;
    overflow: hidden;
    @media only screen and (max-width: ${padWidth}) {
    width: 92%;
  }`;

  return (
    <MintboxContainer>
      <div style={{ display: "flex", alignItems: "center", color: 'white', fontSize: '18px' }}>
        {progress === null ? " ? " : progress} / {CONTRACT_NFT_TOTAL_AMOUNT}
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: '20px'
      }}>
        <span
          style={{ textAlign: "center", fontSize: '22px', padding: '11px', color: "transparent", fontFamily: 'BradleyHandITCTT-Bold' }}
        >
          {"Get Max"}
        </span>
        <img
          style={{
            cursor: "pointer",
            width: '60px',
            height: '60px'
          }}
          src="/images/minus.png"
          onClick={() => {
            if (wantMintAmount <= 0) {
              setWantMintAmount(0)
              return;
            }
            setWantMintAmount(wantMintAmount - 1)
          }}
        />
        <Typography
          style={{ textAlign: "center", fontSize: '100px', padding: '0 38px', color: "#fff" }}
          variant="h3"
          component="div"
        >
          {wantMintAmount}
        </Typography>

        <img
          style={{
            cursor: "pointer",
            width: '60px',
            height: '60px',
          }}
          src="/images/plus.png"
          onClick={() => {
            if (wantMintAmount >= CONTRACT_PERWALLET_MAX_MINT_AMOUNT - numberMinted) {
              setWantMintAmount(CONTRACT_PERWALLET_MAX_MINT_AMOUNT - numberMinted)
              return;
            }
            setWantMintAmount(wantMintAmount + 1)
          }}
        />
        <GetMaxSpan
          style={{
            fontSize: '22px',
            padding: '11px',
            fontFamily: 'BradleyHandITCTT-Bold',
            color: '#F0F0F0'
          }}
          onClick={() => {
            setWantMintAmount(CONTRACT_PERWALLET_MAX_MINT_AMOUNT - numberMinted)
          }}>
          {"Get Max"}
        </GetMaxSpan>
      </div>
      {mintButton}
      <div style={{ fontSize: '16px', textAlign: "center", color: "#fff" }}>
        <br />{CONTRACT_NFT_PER_PRICE} ETH each. A maximum of {CONTRACT_PERWALLET_MAX_MINT_AMOUNT} Tocabo NFTs can be minted per wallet.
        <br />1, Every TocaboNFT will get a piece of TocaIsland land for free!
        <br />2, Holder with more than 4 TocaboNFTs will be airdropped a TocaboTreeNFT
      </div>
    </MintboxContainer >
  );
}

const MintContainer = styled.div`
    display: flex;
    width: 100%;
    height: 920px;
    background-image: url(/images/home_background.png);
    background-size:cover;
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media only screen and (max-width: ${padWidth}) {
    height: auto;
    padding: 22px 0 18px;
  }`;

function Mint() {
  return (
    <MintContainer
      id="mint">
      <MintSection />
    </MintContainer>
  );
}

export default Mint;
