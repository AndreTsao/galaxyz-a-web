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
  <Typography
    style={{color:'white',padding:'30px 0'}}
    variant="body1">
    <strong>{title}</strong>{" "}
    {isFinish?(<del>{content}</del>):content}
  </Typography>
  </div>)
}

function Roadmap() {
  return (
    <Container
      id="roadmap"
    >
      <Typography
        style={{ textAlign: "center", marginTop: "5%", color:'white'}}
        variant="h3"
        gutterBottom
        component="div"
      >
        ROADMAP
      </Typography>

      {getRoadmapItem(true,'2022 Q1','我们这就是一个卖 JPG 的项目，所以我们的Q1发展目标就是把所有图片全部卖掉。')}
      {getRoadmapItem(false,'2022 Q2','我们保证不会做【国产良心verse】等等元宇宙概念项目或者链游。我们没想法、没时间也没技术，当然，也没钱。')}
      {getRoadmapItem(false,'2022 Q3','我们应该不会做二次创作、周边、衣服、租商业街开店等。')}
      {getRoadmapItem(false,'2022 Q4','我们大概在这个时间或者之前卷钱跑路，所有未MINT完成的NFT将会被全部锁定在合约当中，同时我们将放弃合约的控制权，交给社区管理！')}
        
    </Container>
  );
}

export default Roadmap;
