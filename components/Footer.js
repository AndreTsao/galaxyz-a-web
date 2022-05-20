import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import { SOCIAL_MEDIA_URL } from "../widget/projectParam";
import { padWidth } from "../widget/utils";


const FootertipsDiv = styled.div`
  font-size:0.75rem;
  padding-top: 1.6rem;
  color: white;
  @media only screen and (max-width: ${padWidth}) {
  font-size:0.5rem;
  padding-top: 0.55rem;
  }
  `;

const SocialMediaImg = styled.img`
  cursor: "pointer";
  width: 2.75rem;
  @media only screen and (max-width: ${padWidth}) {
  width: 1.8rem;
}
`;
const FooterContainersDiv = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5.5rem;
  @media only screen and (max-width: ${padWidth}) {
  padding-top: 2.8rem;
  }
  `;

function BottomPart() {
  return (
    <FooterContainersDiv>
      <div>
      <Tooltip title="Twitter">
        <a
          href= {SOCIAL_MEDIA_URL.TWITTER}
          target="_blank"
          rel="noreferrer">
          <SocialMediaImg
            style={{
              marginRight: "40px",
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
            src="/icons/discord.png"/>
        </a>
      </Tooltip>
      <Tooltip title="OpenSea">
        <a
          href= {SOCIAL_MEDIA_URL.OPENSEA}
          target="_blank"
          rel="noreferrer">
          <SocialMediaImg
            style={{
              marginLeft: "40px",
            }}
            src="/icons/opensea.png"/>
        </a>
      </Tooltip>
      </div>
      <FootertipsDiv>© 2022 TOCAISLAND. ALL RIGHTS RESERVED</FootertipsDiv>
    </FooterContainersDiv>
  );
}

export default BottomPart;
