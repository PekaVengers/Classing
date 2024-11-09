import { DockAnimation } from "./Dock";
import Slides from "./Slides";
import Toolbar from "./Toolbar";
function Presenter() {
  return (
    <div className="p-8">
      <Toolbar />
      <Slides />
      <DockAnimation />
    </div>
  );
}

export default Presenter;
