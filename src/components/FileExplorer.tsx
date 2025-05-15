import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export type FileNode =
  | {
      type: "folder";
      name: string;
      children: FileNode[];
    }
  | {
      type: "file";
      name: string;
    };

const files: FileNode[] = [
  {
    type: "folder",
    name: "my work",
    children: [
      {
        type: "folder",
        name: "about",
        children: [
          { type: "file", name: "about_me.pdf" },
          { type: "file", name: "experience.pdf" },
          { type: "file", name: "tools.pdf" },
        ],
      },
      { type: "folder", name: "projects", children: [] },
      { type: "folder", name: "images", children: [] },
    ],
  },
  { type: "folder", name: "spotify_playlists", children: [] },
];

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
    />
  </svg>
);

const OpenFolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.99 16.5 3.75 3.75m0 0 3.75-3.75m-3.75 3.75V3.75H4.49"
    />
  </svg>
);

interface TreeNodeProps {
  node: FileNode;
  level?: number;
  onSelect: (node: FileNode) => void;
  selectedNode: FileNode | null;
}

const TreeNode = ({
  node,
  level = 2,
  onSelect,
  selectedNode,
}: TreeNodeProps) => {
  const [open, setOpen] = useState(false);
  const isSelected =
    selectedNode?.name === node.name && selectedNode?.type === node.type;

  if (node.type === "folder") {
    return (
      <div>
        <div
          className={`flex items-center cursor-pointer pt-2 pl-${level * 4}
            }`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
            onSelect(node);
          }}
        >
          {open ? <OpenFolderIcon /> : <FolderIcon />}
          <span className="font-medium pl-4 font-pixel">{node.name}</span>
          {node.children && node.children.length > 0 && (
            <span className="ml-2 mt-3">{open ? <ArrowDownIcon /> : ""}</span>
          )}
        </div>
        {open && node.children && (
          <div className="ml-6">
            {node.children.map((child, idx) => (
              <TreeNode
                key={child.name + idx}
                node={child}
                level={level + 1}
                onSelect={onSelect}
                selectedNode={selectedNode}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`flex items-center pl-${
        level * 4
      } mt-2 cursor-pointer hover:text-gray-400 ease-in-out duration-200 ${
        isSelected ? "underline" : ""
      }`}
      onClick={() => onSelect(node)}
    >
      <FileIcon />
      <span className="font-pixel pl-4">{node.name}</span>
    </div>
  );
};

// This component isn't being used anymore as we've moved the display logic to RightPanel
// Keeping it commented in case you want to use some of this code elsewhere
/*
const FileDetails = ({ selectedNode }: { selectedNode: FileNode | null }) => {
  if (!selectedNode) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="font-pixel">Select a file or folder to view details</p>
      </div>
    );
  }

  if (selectedNode.type === "folder") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-pixel mb-4">Folder: {selectedNode.name}</h2>
        {selectedNode.children && (
          <div>
            <p className="font-pixel mb-2">Contains:</p>
            <ul className="list-disc pl-6">
              {selectedNode.children.map((child, idx) => (
                <li key={idx} className="font-pixel mb-1">
                  {child.name} ({child.type})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-pixel mb-4">File: {selectedNode.name}</h2>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="font-pixel">File preview would go here</p>
        {/* You could add specific file preview logic here based on extension */ /*}
        {selectedNode.name.endsWith(".pdf") && (
          <div className="mt-4 border border-gray-300 p-6 rounded">
            <p className="font-pixel text-center">PDF Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};
*/

interface FileExplorerProps {
  onSelectNode: Dispatch<SetStateAction<FileNode | null>>;
}

const FileExplorer = ({ onSelectNode }: FileExplorerProps) => {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  const handleSelectNode = (node: FileNode) => {
    setSelectedNode(node);
    onSelectNode(node);
  };

  return (
    <div className="p-4 pt-2">
      {files.map((item, idx) => (
        <TreeNode
          key={item.name + idx}
          node={item}
          onSelect={handleSelectNode}
          selectedNode={selectedNode}
        />
      ))}
    </div>
  );
};

export default FileExplorer;
