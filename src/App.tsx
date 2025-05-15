import { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import Footer from "./components/Footer";
import MiddlePanel from "./components/MiddlePanel";
import RightPanel from "./components/RightPanel";
import type { FileNode } from "./components/FileExplorer";

function App() {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 min-h-0">
        <LeftPanel />
        <MiddlePanel onSelectNode={setSelectedNode} />
        <RightPanel selectedNode={selectedNode} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
