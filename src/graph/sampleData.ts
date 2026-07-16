import type { NetworkGraph } from "./types";

export const sampleGraph: NetworkGraph = {
  center: {
    id: "initiative",
    kind: "center",
    label: "Launch Plan",
    detail: "Q3 release",
    visual: { stroke: "#2563eb", fill: "#dbeafe" },
  },
  nodes: [
    {
      id: "design",
      kind: "satellite",
      label: "Design",
      detail: "Final review",
      visual: { stroke: "#7c3aed", fill: "#ede9fe" },
    },
    {
      id: "engineering",
      kind: "satellite",
      label: "Engineering",
      detail: "API polish",
      visual: { stroke: "#059669", fill: "#d1fae5" },
    },
    {
      id: "ops",
      kind: "satellite",
      label: "Operations",
      detail: "Runbook ready",
      visual: { stroke: "#d97706", fill: "#fef3c7" },
    },
    {
      id: "risks",
      kind: "group",
      label: "Risks",
      detail: "2 open",
      visual: { stroke: "#dc2626", fill: "#fee2e2" },
    },
  ],
  edges: [
    {
      id: "initiative-design",
      fromNodeId: "initiative",
      toNodeId: "design",
      label: "needs signoff",
      emphasized: true,
    },
    {
      id: "initiative-engineering",
      fromNodeId: "initiative",
      toNodeId: "engineering",
      label: "depends on",
    },
    {
      id: "initiative-ops",
      fromNodeId: "initiative",
      toNodeId: "ops",
      label: "handoff",
    },
    {
      id: "initiative-risks",
      fromNodeId: "initiative",
      toNodeId: "risks",
      label: "watch",
    },
  ],
};

