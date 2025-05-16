import FileExplorer from "./FileExplorer";
import type { FileNode } from "./FileExplorer";
import type { Dispatch, SetStateAction } from "react";
import Terminal from "./Terminal";

interface MiddlePanelProps {
  onSelectNode: Dispatch<SetStateAction<FileNode | null>>;
}

const MiddlePanel = ({ onSelectNode }: MiddlePanelProps) => {
  return (
    <div className="flex-1 border-l border-neutral-800">
      <div className="border-b border-dashed border-neutral-800 py-4 px-2">
        <div className="flex items-center text-sm font-pixel">
          <span className="text-gray-500">Home</span>
          <span className="mx-1">/</span>
          <span>cooper's files</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <FileExplorer onSelectNode={onSelectNode} />
        <Terminal />
      </div>
    </div>
  );
};

export default MiddlePanel;
