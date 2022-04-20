import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CONTRACT_NFT_PER_PRICE, CONTRACT_NFT_TOTAL_AMOUNT } from "../widget/projectParam";

function getFAQItem(title,content){
  return(
  <Accordion style={{background:'black',border:'1px solid white',borderRadius:'6px'}}>
   <AccordionSummary expandIcon={<ExpandMoreIcon style={{color:'white'}}/>}>
    <Typography style={{color:'white'}}>{title}</Typography>
   </AccordionSummary>
   <AccordionDetails>
    <Typography variant="body2" style={{color:'white'}}>
      {content}
    </Typography>
   </AccordionDetails>
  </Accordion>);
}

function FAQ() {
  return (
    <Container
      id="faq">
      <Typography
        style={{ textAlign: "center", marginTop: "5%",color:'white'}}
        variant="h3"
        gutterBottom
        component="div">
        FAQs
      </Typography>
      {getFAQItem('Minting',
      `1,The total supply of TocaboNFTs is ${CONTRACT_NFT_TOTAL_AMOUNT}.\n A maximum of 10 Tocabo NFTs can be minted per wallet. The minting price is ${CONTRACT_NFT_PER_PRICE} ETH. No pre-sale, only public sale. 
      2, The total supply of TocaboTreeNFTs is 2833. We will AirDrop all of TocaboTreeNFTs for the Tocabo holder who have at least 2 TocaboNFTs. 
      3, 70% of TocaIsland land will be AirDropped to the holder who stake Tocabos and TocaoWorms Token.`)}
      {getFAQItem('Who is team behind TocaIsland?',
      '没啥卵用，就是个头像。购买之后您将拥有对您持有 NFT的无限使用权，对，就是那个')}
      {getFAQItem('Contrtact Adress',
      'TocaboNFTs:xxxxxxxxx  TocaboTreeNFTs: Coming soon...  TocaboTreeNFTs: Coming soon...  $TocaWorm: Coming soon... TocaIsland Metaverse: Coming soon...')}
      {getFAQItem('What about the secondary market (like OpenSea) royalty fee?',
      '7% (note that the majority of royalties will be used for the prizepool of TocaIsland).')}
      {getFAQItem('What about the secondary market (like OpenSea) royalty fee?',
      '7% (note that the majority of royalties will be used for the prizepool of TocaIsland).')}
    </Container>
  );
}

export default FAQ;
