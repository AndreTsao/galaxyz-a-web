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
    <Content>
      <Tooltip title="OpenSea">
        <a
          href= {SOCIAL_MEDIA_URL.OPENSEA}
          target="_blank"
          rel="noreferrer">
          <img
            style={{
              cursor: "pointer",
              width: 40,
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
              width: 40,
              marginRight: "40px",
            }}
            src="/icons/looksrare.png"/>
        </a>
      </Tooltip>
      <Tooltip title="Twitter">
        <a
          href= {SOCIAL_MEDIA_URL.TWITTER}
          target="_blank"
          rel="noreferrer">
          <img
            style={{
              width: 40,
            }}
            src="/icons/twitter.png"
          />
        </a>
      </Tooltip>
    </Content>
  );
}

export default BottomPart;
