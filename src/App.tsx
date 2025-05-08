import LeftPanel from "./components/LeftPanel";
import Footer from "./components/Footer";
import MiddlePanel from "./components/MiddlePanel";
import RightPanel from "./components/RightPanel";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 min-h-0">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
}

export default App;
