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
  CONTRACT_STATUS,
  FREE_MINT_AMOUNT
} from "../widget/projectParam";
import { padWidth } from "../widget/utils";
import { style } from "@mui/system";



const ETHERSCAN_DOMAIN =
  process.env.NEXT_PUBLIC_CHAIN_ID === "1"
    ? "etherscan.io"
    : "rinkeby.etherscan.io";

const StyledMintButton = styled.div`
  display: inline-block;
  text-align: center;
  padding: 0.62rem 1rem;
  min-width: 10rem;
  border: 3px solid #000;
  font-family: 'Montserrat-SemiBoldItalic';
  font-size: 1.8rem;
  border-radius: 35px;
  color: #000;
  background: #dde4b6;
  @media only screen and (max-width: ${padWidth}) {
  font-size: 1.2rem;
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
          const progress = parseInt(await contract.totalSupply());//minted 
          let value = ethers.utils.parseEther(/////
            new BigNumber(props.wantMintAmount).multipliedBy(new BigNumber(CONTRACT_NFT_PER_PRICE)).toString()
          );
          console.log('FREE_MINT-1',props.wantMintAmount+progress)
          if ((props.wantMintAmount+progress) <= parseInt(FREE_MINT_AMOUNT)) {//freemint
            value = ethers.utils.parseEther('0');
            console.log('FREE_MINT-2',value.toString())
          }
          console.log('FREE_MINT-3',props.wantMintAmount,value.toString())
          //call contract to mint
          const tx = await contractWithSigner.mint(props.wantMintAmount, {
            value,
          });
          const response = await tx.wait();
          console.log('FREE_MINT-4',response)
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
      {" "}mint{minting ? "ing... " : " "}
    </StyledMintButton>
  );
}

function MintSection() {
  const [status, setStatus] = useState(CONTRACT_STATUS.OFF);//contract.status
  const [progress, setProgress] = useState(null);//已经mint的数量
  const [fullAddress, setFullAddress] = useState(null);
  const [numberMinted, setNumberMinted] = useState(0);//某地址已经minted的数量
  const [wantMintAmount, setWantMintAmount] = useState(10);//点击选择mint的数量

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
        The maximum is 10
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
        Mint
      </StyledMintButton>
    );
  }

  const MintboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //border: 4px dashed #000;
    padding: 4.35rem 3.75rem 3.12rem;
    margin-top: 8%;
    border-radius: 70px;
    background: #181E29;
    overflow: hidden;
    @media only screen and (max-width: ${padWidth}) {
    padding: 3.35rem 2.75rem 2.12rem;
    width: 90%;
    margin-top: 0;
  }`;

  const MintedDiv = styled.div`
    font-family: Montserrat-Italic;
    display: flex;
    align-items: center;
    color: #EDCD58;
    font-size: 1.38rem;
    @media only screen and (max-width: ${padWidth}) {
    font-size: 1rem;
   }`;

  const GetMaxSpan = styled.span`
    font-family: Montserrat-Italic;
    cursor: pointer;
    text-align: center;
    padding: 9px;
    font-size: 1.3rem;
    color: #f0f0f0;
    text-decoration: underline;
    font-family: Montserrat-SemiBoldItalic;
    /* :hover {
    font-family: Montserrat-SemiBoldItalic;
   } */
   @media only screen and (max-width: ${padWidth}) {
    font-size: 0.8rem;
   }
   `;

  const PlusImg = styled.img`
  cursor: pointer;
  width: 5.3rem;
  height: 5.3rem;
  padding: 0.5rem;
  will-change: transform;
  transition: all 0.2s ease;
  :hover {
    transform: scale(1.15);
  }
  @media only screen and (max-width: ${padWidth}) {
  width: 3.7rem;
  height: 3.7rem;
  padding: 0.4rem;
  :hover {
    transform: scale(1);
  }
  }
  `;

  const MintedNum = styled.div`
  font-family: Montserrat;
  font-weight: 1000;
  text-align: center;
  font-size: 6.5rem;
  min-width: 11rem;
  color: white;
  @media only screen and (max-width: ${padWidth}) {
  font-size: 4.2rem;
  min-width: 7.2rem;
   }
   `;

  const MintedTipsDiv = styled.div`
  font-family: Montserrat;
  text-align: center;
  font-size: 1rem;
  color: white;
  @media only screen and (max-width: ${padWidth}) {
  font-size: 0.7rem;
   }
   `;

  return (
    <MintboxContainer>
      <MintedDiv>
        {progress === null ? " ? " : progress} / {CONTRACT_NFT_TOTAL_AMOUNT}
      </MintedDiv>
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: '20px'
      }}>
        <GetMaxSpan style={{ color: "transparent" }}>
          {"Get Max"}
        </GetMaxSpan>
        <PlusImg
          src="/images/minus.png"
          onClick={() => {
            if (wantMintAmount <= 1) {
              setWantMintAmount(1)
              return;
            }
            setWantMintAmount(wantMintAmount - 1)
          }}
        />
        <MintedNum>
          {wantMintAmount}
        </MintedNum>

        <PlusImg
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
          onClick={() => {
            setWantMintAmount(CONTRACT_PERWALLET_MAX_MINT_AMOUNT - numberMinted)
          }}>
          {"Get Max"}
        </GetMaxSpan>
      </div>
      {mintButton}
      {/* {CONTRACT_NFT_PER_PRICE} ETH each. */}
      <MintedTipsDiv>
        <br />0.005 ETH each. Azuki's ERC721A to save Gas Fee.
        <br />1, Every TocaboNFT will get a piece of TocaIsland land for free!
        <br />2, Holder with more than 7 TocaboNFTs will be airdropped a TocaboTreeNFT
      </MintedTipsDiv>
    </MintboxContainer >
  );
}

const MintContainer = styled.div`
    display: flex;
    width: 100%;
    height: 880px;
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
