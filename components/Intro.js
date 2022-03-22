import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

import Container from "./Container";
import ConnectWallet from "./ConnectWallet";
import { padWidth } from "../utils";

const SOCIAL_MEDIA_URL = {
  'OPENSEA': 'https://opensea.io/collection/gclx',
  'LOOKSRARE': 'https://looksrare.org/zh_hans/collections/0xBf66f2d9630A033022602c3279b04b4a37399927',
  'TWITTER': 'https://twitter.com/gclxnft',
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: ${padWidth}) {
    flex-direction: column;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${padWidth}) {
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MenuItemText = styled.span`
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;

function MenuItem(props) {
  const elementId = props.elementId;
  return (
    <MenuItemText
      style={{ padding: "10px 20px" }}
      onClick={() => {
        if (elementId) {
          const ele = document.getElementById(elementId);
          ele.scrollIntoView({ behavior: "smooth" });
        }
        props.onClick && props.onClick();
      }}
    >
      {props.children}
    </MenuItemText>
  );
}

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 60px;
`;


function Intro() {
  return (
    <Container
      style={{
        background: "#dae7f8",
      }}
      id="intro"
    >
      <Head>
        <h1>Botty NFT</h1>
        <MenuWrapper>
          <MenuItem elementId="intro">Home</MenuItem>
          <MenuItem elementId="gallery">About</MenuItem>
          <MenuItem elementId="faq">F.A.Q</MenuItem>
        </MenuWrapper>
        <Tooltip title="OpenSea">
          <a
            href= {SOCIAL_MEDIA_URL.OPENSEA}
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{
                cursor: "pointer",
                width: 40,
                marginRight: "40px",
              }}
              src="/icons/opensea.svg"
            />
          </a>
        </Tooltip>
        <Tooltip title="LooksRare">
          <a
            href= {SOCIAL_MEDIA_URL.LOOKSRARE}
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{
                cursor: "pointer",
                width: 40,
                marginRight: "40px",
              }}
              src="/icons/looksrare.png"
            />
          </a>
        </Tooltip>
        <Tooltip title="Twitter">
          <a
            href= {SOCIAL_MEDIA_URL.TWITTER}
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{
                width: 40,
              }}
              src="/icons/twitter.svg"
            />
          </a>
        </Tooltip>
        <ConnectWallet showCollect={true} />
      </Head>
    </Container>
  );
}

export default Intro;
