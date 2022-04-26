import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";
import { Title } from "@mui/icons-material";
import { padWidth } from "../widget/utils";

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
        <img style={{ height: '50px', width: '50px' }} src={`/icons/${picture}.png`} />
        <div style={{ background: 'white', width: '1px', flex: 1 }} />
      </div>
      <div style={{ paddingLeft: '84px', paddingBottom: '45px' }}>
        <Typography variant="h4" style={{ color: 'green', paddingBottom: '15px', fontFamily: 'BradleyHandITCTT-Bold' }}>{title}</Typography>
        <Typography
          style={{ color: 'white' }}
          variant="body1">
          {isFinish ? (<del>{content}</del>) : content}
        </Typography>
      </div>
    </div>)
}

const RoadmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  overflow: hidden;
  @media only screen and (max-width: ${padWidth}) {
  padding: 3% 0;
  }
  `; 

function Roadmap() {
  return (
    <RoadmapContainer
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
      {getRoadmapItem(false, 'roadmap3', 'Q3 2022 TocaIsland Distribution', '1, Stake TocaboNFT and burn $TocaoWorms Token to increase the weight attribute of Tobabo; 2, Heavier Tocabo gains more territory in TocaIsland')}
      {getRoadmapItem(false, 'roadmap4', 'Q4 2022 Omnichain TocaIsland', '1, Binance Smart Chain,Polygon,Avalanche,Fantom; 2, Arbitrum,Solana...')}
    </RoadmapContainer>
  );
}

export default Roadmap;
