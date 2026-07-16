import { GRAPH_CONFIG } from "./config";
import type {
  GraphLayout,
  LayoutEdge,
  LayoutNode,
  NetworkEdge,
  NetworkGraph,
  NetworkNode,
  Point,
} from "./types";

export type LayoutSize = {
  width: number;
  height: number;
};

export function computeGraphLayout(
  graph: NetworkGraph,
  size: LayoutSize,
): GraphLayout {
  const centerPoint = { x: size.width / 2, y: size.height / 2 };
  const center: LayoutNode = {
    ...graph.center,
    ...centerPoint,
    radius: centerRadiusForSize(size),
  };
  const nodes = positionNodes(graph.nodes, centerPoint, ringRadiusForSize(size));
  const nodeById = new Map<string, LayoutNode>([
    [center.id, center],
    ...nodes.map((node) => [node.id, node] as const),
  ]);

  const edges = graph.edges
    .map((edge) => {
      const from = nodeById.get(edge.fromNodeId);
      const to = nodeById.get(edge.toNodeId);
      return from && to ? buildEdge(edge, from, to) : null;
    })
    .filter((edge): edge is LayoutEdge => edge !== null);

  return {
    center,
    nodes,
    edges,
    bounds: boundsForNodes([center, ...nodes]),
  };
}

export function ringRadiusForSize(size: LayoutSize): number {
  const minDimension = Math.min(size.width, size.height);
  return clamp(
    minDimension * GRAPH_CONFIG.ringRadiusRatio,
    GRAPH_CONFIG.minRingRadius,
    GRAPH_CONFIG.maxRingRadius,
  );
}

function centerRadiusForSize(size: LayoutSize): number {
  return Math.min(size.width, size.height) >= 700
    ? GRAPH_CONFIG.tabletCenterRadius
    : GRAPH_CONFIG.phoneCenterRadius;
}

function positionNodes(
  nodes: NetworkNode[],
  center: Point,
  ringRadius: number,
): LayoutNode[] {
  if (nodes.length === 0) return [];
  const angleStep = (Math.PI * 2) / nodes.length;

  return nodes.map((node, index) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const radius = node.kind === "group"
      ? GRAPH_CONFIG.groupRadius
      : GRAPH_CONFIG.satelliteRadius;

    return {
      ...node,
      x: center.x + Math.cos(angle) * ringRadius,
      y: center.y + Math.sin(angle) * ringRadius,
      radius,
    };
  });
}

function buildEdge(
  edge: NetworkEdge,
  from: LayoutNode,
  to: LayoutNode,
): LayoutEdge {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const normal = normalize({ x: -dy, y: dx });
  const curve = Math.min(44, Math.hypot(dx, dy) * 0.18);

  return {
    ...edge,
    from: { x: from.x, y: from.y },
    to: { x: to.x, y: to.y },
    control1: {
      x: (from.x + mid.x) / 2 + normal.x * curve,
      y: (from.y + mid.y) / 2 + normal.y * curve,
    },
    control2: {
      x: (mid.x + to.x) / 2 + normal.x * curve,
      y: (mid.y + to.y) / 2 + normal.y * curve,
    },
  };
}

function normalize(point: Point): Point {
  const length = Math.hypot(point.x, point.y);
  if (length === 0) return { x: 0, y: 0 };
  return { x: point.x / length, y: point.y / length };
}

function boundsForNodes(nodes: LayoutNode[]): GraphLayout["bounds"] {
  return nodes.reduce(
    (bounds, node) => ({
      minX: Math.min(bounds.minX, node.x - node.radius),
      maxX: Math.max(bounds.maxX, node.x + node.radius),
      minY: Math.min(bounds.minY, node.y - node.radius),
      maxY: Math.max(bounds.maxY, node.y + node.radius),
    }),
    {
      minX: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
    },
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

