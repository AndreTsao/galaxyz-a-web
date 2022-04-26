import { padWidth } from "../widget/utils";

const mediaStyle = `@media only screen and (max-width: ${padWidth}) {padding: 30px 0}`


function Container(props) {
  return (
    <div 
    style={{mediaStyle,display:"flex",flexDirection:'column',maxWidth:'1200px'}} 
    {...props}>
    </div>
  );
}
export default Container;
