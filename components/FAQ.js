import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { padWidth } from "../widget/utils";
import { CONTRACT_NFT_PER_PRICE, CONTRACT_NFT_TOTAL_AMOUNT } from "../widget/projectParam";

function getFAQItem(title, content) {
  return (
    <Accordion style={{ background: 'black', border: '1px solid white', borderRadius: '10px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
        <Typography variant="faqtitle" style={{ color: 'white'}}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" style={{ color: 'white' }}>
          {content}
        </Typography>
      </AccordionDetails>
    </Accordion>);
}

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  overflow: hidden;
  @media only screen and (max-width: ${padWidth}) {
  padding: 3% 0;
  }
  `; 

function FAQ() {
  return (
    <FAQContainer
      id="faq">
      <Typography
        style={{ textAlign: "center", marginTop: "5%", color: 'white',fontFamily:'BradleyHandITCTT-Bold'}}
        variant="h3"
        gutterBottom
        component="div">
        F.A.Qs
      </Typography>
      {getFAQItem('Minting',
        `1, The total supply of TocaboNFTs is ${CONTRACT_NFT_TOTAL_AMOUNT}. A maximum of 10 TocaboNFT can be minted per wallet. No pre-sale, only public sale. 
      2, The total supply of TocaboTreeNFT is 5666. The holder with more than 4 TocaboNFT will be airdropped a TocaboTreeNFT. `)}
      {getFAQItem('What about the secondary market (like OpenSea) royalty fee?',
        '1, 70% of TocaIsland land will be AirDropped to the holder who stake Tocabos and TocaoWorms Token. 2, The TocaIsland community congress will hold 22% of TocaIsland land. 3, 8% of TocaIsland land will be AirDropped to TocaIsland team.')}
      {getFAQItem('Who is team behind TocaIsland?',
        'We are a creative and passionate team from all over the world.')}
      {getFAQItem('Contrtact Adress',
        'TocaboNFT: 0x676676Cdd8BB03648Bb15D5E801C1F28B9E5a19f  TocaboTreeNFT: Coming soon...  $TocaWorm Token: Coming soon... TocaIsland Metaverse: Coming soon...')}
      {getFAQItem('What about the secondary market (like OpenSea) royalty fee?',
        '7% (note that the majority of royalties will be used for the prizepool of TocaIsland.')}
    </FAQContainer>
  );
}

export default FAQ;
