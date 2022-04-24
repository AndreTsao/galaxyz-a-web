import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import { padWidth } from "../widget/utils";

// const Content = styled.div`
//   max-width: 840px;
//   margin: 5% auto 5% auto;
//   strong {
//     color: red;
//   }
// `;


function About() {
  return (
    <Container
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
        Tocabo is an exclusive NFT collection of 5555 toucans NFT living on the Ethereum blockchain.
        Become a part of TTC with our 10,000 unique NFTs. These are not just any NFT living on Ethereum blockchain but this NFT will give you VIP access and free objects in the most anticipated and exciting digital race in the history of Metaverse.
        Our privileged TTC family will enjoy member-only benefits, membership cards, TTC tokens (to be launched soon), and other perks. So, take a leap from the world of web3 to the Metaverse and join The Tiger Clan (TTC). Check out our website/roadmap now!
      </Typography>
    </Container>
  );
}

export default About;


