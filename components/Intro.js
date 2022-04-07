import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

import Container from "./Container";
import ConnectWallet from "./ConnectWallet";
import { padWidth } from "../widget/utils";
import { SOCIAL_MEDIA_URL } from "../widget/projectParam";

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
      style={{ padding: "10px 20px",color:"white"}}
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
      id="intro"
    >
      <Head>
        <h1 style={{color:"white"}}>Botty NFT</h1>
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
              src="/icons/opensea.png"
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
              src="/icons/twitter.png"
            />
          </a>
        </Tooltip>
        <ConnectWallet showCollect={true} />
      </Head>
    </Container>
  );
}

export default Intro;
