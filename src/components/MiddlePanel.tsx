import FileExplorer from "./FileExplorer";
import type { FileNode } from "./FileExplorer";
import type { Dispatch, SetStateAction } from "react";
import Terminal from "./Terminal";

interface MiddlePanelProps {
  onSelectNode: Dispatch<SetStateAction<FileNode | null>>;
}

const MiddlePanel = ({ onSelectNode }: MiddlePanelProps) => {
  return (
    <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l border-neutral-800 flex flex-col panel-height">
      <div className="border-b border-dashed border-neutral-800 py-4 px-2">
        <div className="flex items-center text-sm font-pixel">
          <span className="text-gray-500">Home</span>
          <span className="mx-1">/</span>
          <span className="text-sky-400">cooper's files</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div
          className="flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#333 #1e1e1e",
          }}
        >
          <FileExplorer onSelectNode={onSelectNode} />
        </div>
      </div>
      <div className="flex-1 border-t border-neutral-800">
        <Terminal />
      </div>
    </div>
  );
};

export default MiddlePanel;
