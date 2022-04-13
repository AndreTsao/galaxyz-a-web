import styled from "styled-components";
import { padWidth } from "../widget/utils";

const ContainerWrapper = styled.div``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  //max-width: 1200px;
  padding: 0 3%;
  justify-content: center;
  @media only screen and (max-width: ${padWidth}) {
    padding: 30px 0;
  }
`;

function Container(props) {
  return (
    <ContainerWrapper style={props.style || {}} id={props.id}>
      <Content>{props.children}</Content>
    </ContainerWrapper>
  );
}

export default Container;
