import { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import Footer from "./components/Footer";
import MiddlePanel from "./components/MiddlePanel";
import RightPanel from "./components/RightPanel";
import type { FileNode } from "./components/FileExplorer";

function App() {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto">
        <LeftPanel />
        <MiddlePanel onSelectNode={setSelectedNode} />
        <RightPanel selectedNode={selectedNode} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
