import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import { Title } from "@mui/icons-material";

const Content = styled.div`
  max-width: 840px;
  margin: 5% auto 5% auto;
  strong {
    color: red;
  }
`;

function getRoadmapItem(isFinish, picture, title, content) {
  return (
    <div style={{ display: "flex", flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
        <img style={{ height: '70px', width: '70px' }} src={`/icons/${picture}.png`} />
        <div style={{ background: 'white', width: '1px', flex: 1 }} />
      </div>
      <div style={{ paddingLeft: '84px', paddingBottom: '45px' }}>
        <Typography variant="h4" style={{ color: 'white', paddingBottom: '15px' ,fontFamily:'BradleyHandITCTT-Bold'}}>{title}</Typography>
        <Typography
          style={{ color: 'white' }}
          variant="body1">
          {isFinish ? (<del>{content}</del>) : content}
        </Typography>
      </div>
    </div>)
}

function Roadmap() {
  return (
    <Container
      id="roadmap">
      <Typography
        style={{ textAlign: "center", marginTop: "7%", color: 'white', fontFamily: 'BradleyHandITCTT-Bold' }}
        variant="h3"
        gutterBottom
        component="div">
        ROADMAP
      </Typography>
      {getRoadmapItem(true, 'roadmap1', 'Q1 2022 Team Recruitment', '1, Recruit creative and passionate team members; 2, Research NFT Market; 3, Project approval')}
      {getRoadmapItem(false, 'roadmap2', 'Q2 2022 TocaboNFT TocaTreeNFT $TocaoWorms', '1, TocaboNFT Minting; 2, Airdrop TocaTreeNFT to the TocaboNFT holder; 3, Stake TocaTreeNFT to produce $TocaoWorms Token')}
      {getRoadmapItem(false, 'roadmap3', 'Q3 2022 TocaIsland Distribution', '鸟吃虫之后体重增加。体重越重的获得越多的TocaIsland的土地')}
      {getRoadmapItem(false, 'roadmap4', 'Q4 2022 Omnichain TocaIsland', '构建TocaIsland，分发土地')}
    </Container>
  );
}

export default Roadmap;
