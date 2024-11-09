import { createSrcDoc } from "../../constants/presenter";
// eslint-disable-next-line react/prop-types
function IVizFrame({ data }) {
  // eslint-disable-next-line react/prop-types
  const safeURL = data.link;
  return (
    <iframe
      title="iViz Frame"
      src={createSrcDoc(safeURL)}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

export default IVizFrame;
