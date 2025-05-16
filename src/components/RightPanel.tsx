import type { FileNode } from "./FileExplorer";

interface RightPanelProps {
  selectedNode?: FileNode | null;
}

const RightPanel = ({ selectedNode }: RightPanelProps) => {
  if (!selectedNode) {
    return (
      <div className="flex-1 border-l border-neutral-800 flex items-center justify-center p-6">
        <p className="text-neutral-500 font-pixel text-sm">
          Select a file to view
        </p>
      </div>
    );
  }

  if (selectedNode.type === "folder") {
    return (
      <div className="flex-1 border-l border-neutral-800 flex items-center justify-center p-6">
        <p className="text-neutral-500 font-pixel text-sm">
          Select a file to view
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 border-l border-neutral-800 p-6">
      <h2 className="text-xl font-pixel mb-4">File: {selectedNode.name}</h2>
      <div className="mt-4 p-4 rounded">
        <p className="font-pixel">File preview would go here</p>
        {selectedNode.name.endsWith(".pdf") && (
          <div className="mt-4 border border-neutral-300 p-6 rounded">
            <p className="font-pixel text-center">PDF Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
