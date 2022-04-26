import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import { padWidth } from "../widget/utils";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  overflow: hidden;
  @media only screen and (max-width: ${padWidth}) {
  padding: 3% 0;
  }
  `; 


function About() {
  return (
    <AboutContainer
      id="about">
      <Typography
        style={{ textAlign: "center", marginTop: "7%", color: 'white',fontFamily:'BradleyHandITCTT-Bold'}}
        variant="h3"
        gutterBottom
        component="div">
        ABOUT
      </Typography>
      <Typography
        style={{ marginBottom: '20px', color: 'white' }}
        variant="body1"
        gutterBottom>
        TocaIsland is an Omnichain  Metaverse island living on the Ethereum blockchain. 
        The ecosystem in TocaIsland is mainly composed of TocaboNFT(Bigmouth bird)🐧, TocaTreeNFT🌴 and $TocaWorm Token🪱.
        A Tocabo will get a piece of TocaIsland  land for free!The stronger a Tocabo,the more territory it has in TocaIsland.
        TocaTree produce $TocaWorm Token.The more $TocaWorm a Tocabo eats, the stronger it will become.
        TocaboNFT is an exclusive NFT collection of 5555 toucans NFT.
        TocaTreeNFT is an exclusive NFT collection of 5555 many kinds of trees NFT.
        The total supply of $TocaWorm Token is 1,000,000,000.
        TocaIsland covers 50,000 acres.
      </Typography>
    </AboutContainer>
  );
}

export default About;


