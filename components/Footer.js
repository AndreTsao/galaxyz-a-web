import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { SOCIAL_MEDIA_URL } from "../widget/projectParam";

const Content = styled.div`
  max-width: 840px;
  margin: 10px auto 20px auto;
  display: flex;
  align-items: center;
`;

function BottomPart() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'70px 0 20px'}}>
      <div>
      <Tooltip title="Twitter">
        <a
          href= {SOCIAL_MEDIA_URL.TWITTER}
          target="_blank"
          rel="noreferrer">
          <img
            style={{
              width: '44px',
              marginRight: "40px",
            }}
            src="/icons/twitter.png"
          />
        </a>
      </Tooltip>
      <Tooltip title="OpenSea">
        <a
          href= {SOCIAL_MEDIA_URL.OPENSEA}
          target="_blank"
          rel="noreferrer">
          <img
            style={{
              cursor: "pointer",
              width: '44px',
              marginRight: "40px",
            }}
            src="/icons/opensea.png"/>
        </a>
      </Tooltip>
      <Tooltip title="LooksRare">
        <a
          href= {SOCIAL_MEDIA_URL.LOOKSRARE}
          target="_blank"
          rel="noreferrer">
          <img
            style={{
              cursor: "pointer",
              width: '44px',
            }}
            src="/icons/discord.png"/>
        </a>
      </Tooltip>
      </div>
      <Typography style={{color: 'white', fontSize:'12px',paddingTop:'9px'}}>© 2022 TOCAISLAND. ALL RIGHTS RESERVED</Typography>
    </div>
  );
}

export default BottomPart;
