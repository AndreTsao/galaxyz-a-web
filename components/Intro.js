import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

import Container from "./Container";
import ConnectWallet from "./ConnectWallet";
import { padWidth } from "../widget/utils";
import { CONTRACT_NFT_OFFICIAL_NAME, SOCIAL_MEDIA_URL } from "../widget/projectParam";

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
  padding: 0 68px;
  @media only screen and (max-width: ${padWidth}) {
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
    padding:0 0;
  }
`;

const MenuItemText = styled.span`
  cursor: pointer;
  font-size:28px;
  text-align: center;
  padding: 0 24px;
  color: white;
  font-family: BradleyHandITCTT-Bold;
  flex-wrap: wrap;
  :hover {
    font-weight: bold;
  }
  @media only screen and (max-width: ${padWidth}) {
    font-size: 20px;
    padding: 0 12px;
  }
`;

function MenuItem(props) {
  const elementId = props.elementId;
  return (
    <MenuItemText
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

const IntroContainer = styled.div`
  display: flex;
  align-items:center;
  width: 90%;
  padding:'0 10px';
  max-width: 1400px;
  justify-content: space-between;
  overflow: hidden;
  @media only screen and (max-width: ${padWidth}) {
  padding: 10px 0;
  flex-direction: column;
  }
  `;

function Intro() {
  return (
    <IntroContainer
      id="intro">
        <h1 style={{color:"white",fontSize:'42px',display:'flex',alignItems:'center',fontFamily:'BradleyHandITCTT-Bold'}}>
          <img
            style={{
              width: "39px",
              height: "39px",
              marginRight:'7px',
            }}
            src="favicon.png"
          />TocaIsland</h1>
        <MenuWrapper>
          <MenuItem elementId="intro">Home</MenuItem>
          <MenuItem elementId="about">About</MenuItem>
          <MenuItem elementId="roadmap">Roadmap</MenuItem>
          <MenuItem elementId="faq">F.A.Q</MenuItem>
        </MenuWrapper>
        <ConnectWallet showCollect={true} />
    </IntroContainer>
  );
}

export default Intro;
