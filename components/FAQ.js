import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function getFAQItem(title,content){
  return(
  <Accordion style={{background:'black',border:'1px solid white',borderRadius:'5px'}}>
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
      {getFAQItem('什么是 NFT？如何购买本项目的 NFT？',
      '朋友您还需要多多学习，暂时不适合参与本项目，您可以右键保存您喜欢的图片当头像，别买了。')}
      {getFAQItem('这个项目有什么用？',
      '没啥卵用，就是个头像。购买之后您将拥有对您持有 NFT的无限使用权，对，就是那个')}
      {getFAQItem('项目方是否会保留或者持有稀有作品？',
      '不会。这将会是 FairLaunch（就是公平发射的意思）。项目成员没有任何保留，将参与公售，不会利用任何内幕进行交易，严格遵循良心铸造人的行为准则。')}
      {getFAQItem('为什么 OpenSea 上面设置 10% 的版税？这么高？',
      '能捞多少算多少。')}
    </Container>
  );
}

export default FAQ;
