import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

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
  font-size: 1.75rem;
  text-align: center;
  padding: 0 26px;
  color: white;
  font-family: BradleyHandITCTT-Bold;
  flex-wrap: wrap;
  @media only screen and (max-width: ${padWidth}) {
    font-size: 1.25rem;
    padding: 0 12px;
  }
`;

const SocialMediaImg = styled.img`
  cursor: "pointer";
  width: 1.5rem;
  @media only screen and (max-width: ${padWidth}) {
  width: 1.3rem;
  display: none;
}
`;

const IntroContainer = styled.div`
  display: flex;
  align-items:center;
  width: 90%;
  padding:12px 0;
  max-width: 1400px;
  justify-content: space-between;
  overflow: hidden;
  @media only screen and (max-width: ${padWidth}) {
  padding: 10px 0 16px;
  flex-direction: column;
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

function Intro() {
  return (
    <IntroContainer
      id="intro">
        <div style={{color:"white",fontSize:'3rem',display:'flex',alignItems:'center',
        fontFamily:'BradleyHandITCTT-Bold',letterSpacing:'2px'}}>
          <img
            style={{
              width: "2.2rem",
              height: "2.2rem",
              marginRight:'0.47rem',
            }}
            src="favicon.png"
          />TocaIsland</div>
        <MenuWrapper>
          <MenuItem elementId="about">About</MenuItem>
          <MenuItem elementId="gallery">Gallery</MenuItem>
          <MenuItem elementId="roadmap">Roadmap</MenuItem>
          <MenuItem elementId="faq">F.A.Q</MenuItem>
        </MenuWrapper>
       <div style={{display: 'flex', alignItems:'center'}}>
       <ConnectWallet showCollect={true} />
        <Tooltip title="Twitter">
        <a
          href= {SOCIAL_MEDIA_URL.TWITTER}
          target="_blank"
          rel="noreferrer">
          <SocialMediaImg
            style={{
              marginLeft:'1.8rem',
              marginRight: "0.8rem"
            }}
            src="/icons/twitter.png"
          />
        </a>
      </Tooltip>
      <Tooltip title="Discord">
        <a
          href= {SOCIAL_MEDIA_URL.DISCORD}
          target="_blank"
          rel="noreferrer">
          <SocialMediaImg
          style={{
            marginRight: "0.8rem"
          }}
            src="/icons/discord.png"/>
        </a>
      </Tooltip>
      <Tooltip title="Discord">
        <a
          href= {SOCIAL_MEDIA_URL.OPENSEA}
          target="_blank"
          rel="noreferrer">
          <SocialMediaImg
            src="/icons/opensea.png"/>
        </a>
      </Tooltip>
       </div>
    </IntroContainer>
  );
}

export default Intro;
