import styled from "styled-components";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { padWidth } from "../widget/utils";

const GalleryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //justify-content: space-between;
  overflow: hidden;
`;
const GalleryItem = styled.div`
  width: 190px;
  margin: 5px;
  will-change: transform;
  transition: all 0.2s ease;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  :hover {
    transform: scale(1.15);
  }
  @media only screen and (max-width: ${padWidth}) {
  width: 28%;
  margin: 4px;
  :hover {
    transform: scale(1);
  }

  }
`;

const arts = [
  "/images/demo_01.png",
  "/images/demo_02.png",
  "/images/demo_03.png",
  "/images/demo_04.png",
  "/images/demo_05.png",
  "/images/demo_06.png",
  "/images/demo_07.png",
  "/images/demo_08.png",
  "/images/demo_09.png",
  "/images/demo_10.png",
  "/images/demo_11.png",
  "/images/demo_12.png",
];

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  overflow: hidden;
  @media only screen and (max-width: ${padWidth}) {
  padding: 3% 0;
  }
  `; 

function Gallery() {
  return (
    <GalleryContainer
    id="gallery"
    >
      <Typography
        style={{ textAlign: "center", marginTop: "7%", color: 'white',fontFamily:'BradleyHandITCTT-Bold'}}
        variant="h3"
        gutterBottom
        component="div">
        GALLERY
      </Typography>
      <GalleryList>
        {arts.map((art, idx) => {
          return (
            <GalleryItem key={idx}>
              <img src={art} alt="TocaboNFT" />
            </GalleryItem>
          );
        })}
      </GalleryList>
    </GalleryContainer>
  );
}

export default Gallery;
