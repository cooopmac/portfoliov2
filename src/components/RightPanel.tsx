import type { FileNode } from "./FileExplorer";
import ReactMarkdown from "react-markdown";
import { GlowingEffect } from "./ui/glowing-effect";
import rehypeRaw from "rehype-raw";

interface RightPanelProps {
  selectedNode?: FileNode | null;
}

const RightPanel = ({ selectedNode }: RightPanelProps) => {
  if (!selectedNode) {
    return (
      <div className="w-full md:flex-1 border-l border-neutral-800 flex items-center justify-center p-6 bg-gradient-to-br from-neutral-950 to-neutral-900">
        <div className="text-center max-w-md p-8 rounded-lg border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm relative">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👨‍💻</span>
          </div>
          <p className="text-neutral-300 font-pixel text-lg mb-2">
            Select a file to explore
          </p>
          <p className="text-neutral-500 text-sm">
            Browse my projects, skills, and experience
          </p>
        </div>
      </div>
    );
  }

  if (selectedNode.type === "folder") {
    return (
      <div className="w-full md:flex-1 border-l border-neutral-800 flex items-center justify-center p-6 bg-gradient-to-br from-neutral-950 to-neutral-900">
        <div className="text-center max-w-md p-6 rounded-lg border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm relative">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📁</span>
          </div>
          <p className="text-neutral-300 font-pixel text-lg mb-2">
            {selectedNode.name}
          </p>
          <p className="text-neutral-500 text-sm">
            This folder contains {selectedNode.children.length} items
          </p>
        </div>
      </div>
    );
  }

  const getFileIcon = (filename: string) => {
    if (filename.includes("experience")) return "💼";
    if (filename.includes("education")) return "🎓";
    if (filename.includes("skills")) return "🛠️";
    if (filename.includes("about")) return "👨‍💻";
    if (filename.includes("contact")) return "📱";
    if (
      filename.includes("project") ||
      filename.includes("auto") ||
      filename.includes("compiler")
    )
      return "🚀";
    if (filename.includes("tech") || filename.includes("stack")) return "⚙️";
    if (filename.includes("learning")) return "📚";
    return "📄";
  };

  return (
    <div className="w-full md:flex-1 border-l border-neutral-800 flex flex-col h-full bg-gradient-to-br from-neutral-950 to-neutral-900 p-6">
      <div className="border-b border-neutral-800 py-4 px-6 backdrop-blur-sm bg-neutral-900/30">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-neutral-800 flex items-center justify-center mr-3">
            <span>{getFileIcon(selectedNode.name)}</span>
          </div>
          <h2 className="text-xl font-pixel bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            {selectedNode.name}
          </h2>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto"
        style={{
          height: "calc(100vh - 8rem)",
          scrollbarWidth: "thin",
          scrollbarColor: "#333 #1e1e1e",
        }}
      >
        <div className="p-6">
          {selectedNode.content ? (
            <div className="markdown-container p-6 rounded-lg border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm relative">
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.05}
                borderWidth={2}
              />
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-2xl font-bold mb-6 pb-2 border-b border-neutral-800 font-pixel bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-xl font-semibold mb-4 mt-8 pl-3 border-l-4 border-sky-600 text-white"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-lg font-medium mb-3 mt-6 text-neutral-200"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className="mb-4 text-neutral-300 leading-relaxed"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-5 mb-6 text-neutral-300 space-y-1"
                        {...props}
                      />
                    ),
                    li: ({ node, children, ...props }) => (
                      <li
                        className="mb-2 pl-1 backdrop-blur-sm hover:bg-neutral-800/10 p-1 rounded transition-colors duration-200"
                        {...props}
                      >
                        {children}
                      </li>
                    ),
                    strong: ({ node, ...props }) => (
                      <strong
                        className="font-semibold text-sky-400"
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <em
                        className="text-neutral-400 not-italic bg-neutral-800/30 px-2 py-0.5 rounded"
                        {...props}
                      />
                    ),
                    img: ({ node, ...props }) => (
                      <div className="my-6">
                        <img
                          className="rounded-lg border border-neutral-700 shadow-lg max-w-full w-auto mx-auto"
                          {...props}
                          alt={props.alt || "Project image"}
                        />
                      </div>
                    ),
                  }}
                  rehypePlugins={[rehypeRaw]}
                >
                  {selectedNode.content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8 rounded-lg border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm relative">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <p className="text-neutral-500 font-pixel text-sm">
                  No content available
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
