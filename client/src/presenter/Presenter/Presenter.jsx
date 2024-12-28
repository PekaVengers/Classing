// import { DockAnimation } from "./Dock";
import Slides from "./Slides";
import Toolbar from "./Toolbar";
function Presenter() {
  return (
    <div className="flex flex-col gap-x-2 gap-y-2 p-6 h-screen">
      <Toolbar />
      <Slides />
      {/* <DockAnimation /> */}
    </div>
  );
}

export default Presenter;
