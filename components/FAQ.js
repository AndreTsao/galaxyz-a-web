import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Content = styled.div`
  max-width: 840px;
  margin: 5% auto 10% auto;
  strong {
    color: red;
  }
`;

function FAQ() {
  return (
    <Container
      style={{
        background: "#B4ABE0",
      }}
      id="faq"
    >
      <Typography
        style={{ textAlign: "center", marginTop: "5%" }}
        variant="h3"
        gutterBottom
        component="div"
      >
        问与答
      </Typography>

      <Content style={{ padding: "5px" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>什么是 NFT？如何购买本项目的 NFT？</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              朋友您还需要多多学习，暂时不适合参与本项目，您可以右键保存您喜欢的图片当头像，别买了。
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>这个项目有什么用？</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              没啥卵用，就是个头像。购买之后您将拥有对您持有 NFT
              的无限使用权，对，就是那个{" "}
              <a
                href="https://creativecommons.org/share-your-work/public-domain/cc0/"
                target="_blank"
                rel="noreferrer"
              >
                CC0
              </a>
              。
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>供应量以及价格和铸造规则？</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              全宇宙（包括元宇宙）限量 <strong>1000</strong> 个。每个售价{" "}
              <strong>0.002</strong> ETH。每个钱包地址可以铸造最多{" "}
              <strong>2</strong> 个。每个人每天最多 <strong>2</strong> 个钱包。
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>如何实现每个人每天最多铸造 2 个钱包的限制？</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              技术上我们是搞不定的，所以只能通过道德绑架的方式。
              <strong>今天，我们都是良心铸造人！</strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>项目方是否会保留或者持有稀有作品？</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              不会。这将会是 Fair
              Launch（就是公平发射的意思）。项目成员没有任何保留，将参与公售，不会利用任何内幕进行交易，严格遵循良心铸造人的行为准则。
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              为什么 OpenSea 上面设置 10% 的版税？这么高？
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">能捞多少算多少。</Typography>
          </AccordionDetails>
        </Accordion>
      </Content>
    </Container>
  );
}

export default FAQ;
