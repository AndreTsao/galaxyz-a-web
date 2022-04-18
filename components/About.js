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
        style={{ textAlign: "center", marginTop: "5%", color:'white',background:'green'}}
        variant="h3"
        gutterBottom
        component="div">
        ABOUT
      </Typography>
        <Typography
          style={{marginBottom: 20, color:'white',background:'blue'}}
          variant="body1"
          gutterBottom>
        It’s 2570! The human race has ended and the advanced Tigers have taken over the world. The Tiger Clan is the city of 10,000 Tigers that are ruling the world. Do you want to be a part of the ruling city?

        Become a part of TTC with our 10,000 unique NFTs. These are not just any NFT living on Ethereum blockchain but this NFT will give you VIP access and free objects in the most anticipated and exciting digital race in the history of Metaverse.

        Our privileged TTC family will enjoy member-only benefits, membership cards, TTC tokens (to be launched soon), and other perks. So, take a leap from the world of web3 to the Metaverse and join The Tiger Clan (TTC). Check out our website/roadmap now!
        </Typography>
    </Container>
  );
}

export default About;
