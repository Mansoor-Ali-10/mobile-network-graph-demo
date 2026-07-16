export type NodeKind = "center" | "satellite" | "group";

export type NodeVisual = {
  stroke: string;
  fill: string;
};

export type NetworkNode = {
  id: string;
  kind: NodeKind;
  label: string;
  detail?: string;
  visual: NodeVisual;
};

export type NetworkEdge = {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label: string;
  emphasized?: boolean;
};

export type NetworkGraph = {
  center: NetworkNode;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
};

export type Point = {
  x: number;
  y: number;
};

export type Camera = {
  translateX: number;
  translateY: number;
  scale: number;
};

export type LayoutNode = NetworkNode & Point & {
  radius: number;
};

export type LayoutEdge = NetworkEdge & {
  from: Point;
  to: Point;
  control1: Point;
  control2: Point;
};

export type GraphLayout = {
  center: LayoutNode;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};

