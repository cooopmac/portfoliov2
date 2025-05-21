import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

// Import all images
import codingImg from "../assets/coding.png";
import traveltrek1Img from "../assets/traveltrek1.png";
import traveltrek3Img from "../assets/traveltrek3.png";
import autovisionImg from "../assets/autovison888.png";

export type FileNode =
  | {
      type: "folder";
      name: string;
      children: FileNode[];
    }
  | {
      type: "file";
      name: string;
      content?: string;
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
          {
            type: "file",
            name: "about_me.md",
            content: `# Cooper MacGregor\n\n![Coding](${codingImg})\n\nFull-stack developer passionate about building clean, efficient applications. Currently completing my B.S in Computer Science with a Minor in Business at the University of Guelph.\n\nI'm a problem solver at heart with a knack for creating intuitive, high-performance software solutions that make a real impact. From AI-powered tools to full-stack platforms, I enjoy tackling complex challenges with clean code.`,
          },
          {
            type: "file",
            name: "experience.md",
            content:
              "# Work Experience\n\n## SolutionsLRP - Freelance Software Developer\n*May 2024 - April 2025*\n\n- Built and deployed a full-stack claims system used by **140+ auto garages across Canada**, handling **hundreds of monthly submissions** with real-time file uploads and automated admin notifications\n- Engineered secure, role-based workflows using **Next.js, Supabase Auth** and **PostgreSQL**, enabling shops to self-register, submit claims, and track statuses, while providing admins with full financial insights\n- Delivered **100% independently**: architected system, designed schema, implemented frontend/backend, and launched to production — now in active use across the automotive repair industry\n\n## University of Guelph - Department of Computer Science\n*January 2023 - April 2023*\n\n### Scrum Master\n- Led a team of 6 students to create GeoJobSearch, a web scraping app to find jobs from every job board",
          },
          {
            type: "file",
            name: "education.md",
            content:
              "# Education\n\n## University of Guelph\n*September 2021 - April 2025*\n\n**B.S in Computer Science, Minor in Business**\n\n### Relevant Coursework:\n- Data Structures\n- Operating Systems\n- Algorithms\n- Game Development\n- Artificial Intelligence\n- Software Engineering\n- Mobile Development\n\n### Honours:\n- Dean's List",
          },
          {
            type: "file",
            name: "skills.md",
            content:
              "# Technical Skills\n\n## Languages\n- C, C#, Java, Python\n- JavaScript, TypeScript\n- Dart, SQL\n\n## Frameworks & Libraries\n- React, Node.js\n- Flutter, Next.js\n- Springboot\n\n## Tools\n- Docker, Kubernetes\n- Git, PostgreSQL\n- Unity\n\n## Methodologies\n- Agile\n- Test-Driven Development\n- CI/CD",
          },
        ],
      },
      {
        type: "folder",
        name: "projects",
        children: [
          {
            type: "file",
            name: "traveltrek.md",
            content: `# TravelTrek\n*February 2025*\n\n**Flutter, Supabase, Geolocator**\n\n<div style="display: flex; justify-content: space-between; gap: 16px; flex-wrap: nowrap; margin-bottom: 20px;">\n  <img src="${traveltrek1Img}" alt="TravelTrek App - Earth View" style="width: 49%; border-radius: 8px; border: 1px solid #333;" />\n  <img src="${traveltrek3Img}" alt="TravelTrek App - User Profile" style="width: 49%; border-radius: 8px; border: 1px solid #333;" />\n</div>\n\n- Engineered a cross-platform mobile application using **Flutter**, integrating a real-time interactive 3D Earth visualization for dynamic travel path and destination mapping, collaborating within a team of 3\n- Implemented a robust backend solution leveraging **Supabase** for secure user authentication, profile management, and scalable data storage, demonstrating proficiency in modern backend-as-a-service integration\n- Developed and integrated precise location services for automatic travel distance calculation and real-time user positioning on the globe, showcasing expertise in mobile sensor data processing and geospatial APIs`,
          },
          {
            type: "file",
            name: "autovision.md",
            content: `# AutoVision\n*February 2025*\n\n**React, Supabase, OpenAI Vision, Stripe**\n\n![AutoVision Project](${autovisionImg})\n\n- Built a vision-powered web app that analyzes uploaded car images using **OpenAI Vision AI**, detects vehicle modifications, and suggests compatible aftermarket parts in real-time\n- Integrated Supabase (Auth, PostgreSQL, Edge Functions) for secure user management and subscription tracking; implemented **Stripe Checkout** with full subscription lifecycle handling via serverless webhooks\n- Designed a modern frontend using **React + TypeScript + Tailwind**, achieving responsive design, smooth animations (Framer Motion), and dynamic state management with React Context and custom hooks`,
          },
          {
            type: "file",
            name: "soul_keeper.md",
            content: `# Soul Keeper\n*March 2024*\n\n**Unity, C#, 3D Game Development**\n\n<div style="margin-bottom: 20px;">\n  <img src="${soulkeeper2Img}" alt="Soul Keeper Combat" style="width: 100%; border-radius: 8px; border: 1px solid #333;" />\n</div>\n\n- Developed a 3D action game where players collect souls from defeated enemies to upgrade abilities, featuring a complete combat system with projectile attacks and special abilities\n- Implemented a robust progression system with four upgradable stats (Attack, Speed, Dexterity, Wisdom) that meaningfully impact gameplay, alongside three distinct enemy types with unique AI behaviors\n- Created immersive gameplay with custom particle effects, 3D physics interactions, and a modular codebase design that allows for easy expansion of game features`,
          },
          {
            type: "file",
            name: "c_compiler.md",
            content:
              "# C- Language Compiler\n*January 2025*\n\n**Java, JFlex, CUP**\n\n- Led and collaborated with a fellow classmate to build a complete compiler for the C- language (C subset), implementing all phases: **lexical analysis (JFlex), syntax parsing (CUP), semantic analysis, and code generation** targeting the TM virtual machine\n- Designed and constructed a robust **AST and symbol table architecture**, supporting scoped variable/function resolution, type checking, and detailed multi-error reporting across nested control structures and recursive functions\n- Generated optimized **TM assembly code** with support for function calls, stack frames, arithmetic/logical ops, and I/O — producing fully runnable programs for a simulated register-based VM with custom memory and control flow handling",
          },
          {
            type: "file",
            name: "portfolio.md",
            content:
              "# Portfolio Website\n*May 2024*\n\n**React, TypeScript, Tailwind CSS**\n\n- Designed and built this interactive, terminal-inspired portfolio website to showcase my projects and skills\n- Implemented custom components including a functional terminal with commands, file explorer navigation, and responsive design\n- Utilized modern React patterns with TypeScript for type safety and Tailwind CSS for styling",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "contact",
    children: [
      {
        type: "file",
        name: "contact_info.md",
        content:
          "# Contact Information\n\n- Email: cooper.macgregor14@gmail.com\n- Phone: (705) 443-7166\n- LinkedIn: linkedin.com/in/cooper-macgregor\n- GitHub: github.com/cooopmac",
      },
    ],
  },
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
  onSelect: (node: FileNode | null) => void;
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

  // Add hover animation for folders
  if (node.type === "folder") {
    return (
      <div>
        <div
          className={`flex items-center cursor-pointer py-1 pl-${
            level * 4
          } hover:bg-neutral-800/40 rounded transition-colors duration-200 group`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <div className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200">
            {open ? <OpenFolderIcon /> : <FolderIcon />}
          </div>
          <span className="font-medium pl-4 font-pixel text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
            {node.name}
          </span>
          {node.children && node.children.length > 0 && (
            <span className="ml-2 mt-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
              {open ? <ArrowDownIcon /> : ""}
            </span>
          )}
          <span className="ml-auto mr-2 text-xs text-neutral-600 group-hover:text-neutral-500">
            {node.children.length} item{node.children.length !== 1 ? "s" : ""}
          </span>
        </div>
        {open && node.children && (
          <div className="ml-4 border-l border-neutral-800/50 pl-2 my-1">
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

  // File icon selection
  const getFileIcon = () => {
    if (node.name.includes("experience")) return "💼";
    if (node.name.includes("education")) return "🎓";
    if (node.name.includes("skills")) return "🛠️";
    if (node.name.includes("about")) return "👨‍💻";
    if (node.name.includes("contact")) return "📱";
    if (
      node.name.includes("project") ||
      node.name.includes("auto") ||
      node.name.includes("compiler")
    )
      return "🚀";
    if (node.name.includes("tech") || node.name.includes("stack")) return "⚙️";
    if (node.name.includes("learning")) return "📚";
    return "📄";
  };

  // File node rendering
  return (
    <div
      className={`flex items-center pl-${
        level * 4
      } mt-2 cursor-pointer hover:bg-neutral-800/40 rounded px-2 py-1 transition-all duration-200 ${
        isSelected
          ? "bg-neutral-800/60 text-sky-400 border-l-2 border-sky-500"
          : ""
      } group`}
      onClick={() => onSelect(node)}
    >
      <span className="text-sm mr-2 opacity-80 group-hover:opacity-100">
        {getFileIcon()}
      </span>
      <span className="font-pixel pl-2 group-hover:text-neutral-200 transition-colors duration-200">
        {node.name}
      </span>
    </div>
  );
};

interface FileExplorerProps {
  onSelectNode: Dispatch<SetStateAction<FileNode | null>>;
}

const FileExplorer = ({ onSelectNode }: FileExplorerProps) => {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  const handleSelectNode = (node: FileNode | null) => {
    setSelectedNode(node);
    onSelectNode(node);
  };

  return (
    <div className="p-4 pb-4">
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
