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
  @media only screen and (max-width: ${padWidth}) {
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MenuItemText = styled.span`
  cursor: pointer;
  font-size:21px;
  :hover {
    font-weight: bold;
  }
`;

function MenuItem(props) {
  const elementId = props.elementId;
  return (
    <MenuItemText
      style={{ padding: "10px 20px",color:"white",fontSize:'40px'}}
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
    <div
      id="intro"
      style={{display:"flex",alignItems:'center',width:'1200px',height:'86px',background:'blue',justifyContent:'space-between',padding:'0 10px'}}>
        <h1 style={{color:"white",fontSize:'50px',display:'flex',alignItems:'center'}}>
          <img
            style={{
              width: "43px",
              height: "43px",
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
    </div>
  );
}

export default Intro;
