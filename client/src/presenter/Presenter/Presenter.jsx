import { DockAnimation } from "./Dock";
import Slides from "./Slides";
import Toolbar from "./Toolbar";
function Presenter() {
  return (
    <div className="p-4">
      <Toolbar />
      <Slides />
      {/* <DockAnimation /> */}
    </div>
  );
}

export default Presenter;
