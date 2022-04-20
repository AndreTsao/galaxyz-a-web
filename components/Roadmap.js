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

function getRoadmapItem(isFinish,title,content){
  return (
  <div style={{display:"flex",flexDirection:'row',background:'green'}}>
   <div style={{display:'flex',flexDirection:"column",alignItems:'center'}}>
  <div style={{background:'white',width:'2px',flex:1}}/>
  <div style={{background:'white',width:'2px',flex:1}}/>
   </div>
   <div style={{padding:'30px 0'}}>
   <Typography variant="h4" style={{color:'white'}}>{title}</Typography>
   <Typography
    style={{color:'white'}}
    variant="body1">
    {isFinish?(<del>{content}</del>):content}
  </Typography>
   </div>
  </div>)
}

function Roadmap() {
  return (
    <Container
      id="roadmap">
      <Typography
        style={{ textAlign: "center", marginTop: "5%", color:'white'}}
        variant="h3"
        gutterBottom
        component="div">
        ROADMAP
      </Typography>
      {getRoadmapItem(true,'2022 Q1 TocaboNFT','开发Tocado合约,website')}
      {getRoadmapItem(false,'2022 Q2 TocaTree $TocaoWorms','分发Toca Island的树木，每2只Tocabos被空投一颗树，质押树产生虫子($TocaoWorms Token)')}
      {getRoadmapItem(false,'2022 Q3 Tocabo Gains weight','鸟吃虫之后体重增加。体重越重的获得越多的TocaIsland的土地')}
      {getRoadmapItem(false,'2022 Q4 TocaIsland Zone Distribution','构建TocaIsland，分发土地')}
    </Container>
  );
}

export default Roadmap;
