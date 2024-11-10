import { createVizDoc } from "../../constants/presenter";
// eslint-disable-next-line react/prop-types
function IVizFrame({ link }) {
  return <iframe src={createVizDoc(link)}></iframe>;
}
export default IVizFrame;
