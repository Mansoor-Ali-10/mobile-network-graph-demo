import { GRAPH_CONFIG } from "./config";
import type { Camera, GraphLayout, LayoutNode, Point } from "./types";

export function screenPointToGraphPoint(point: Point, camera: Camera): Point {
  return {
    x: (point.x - camera.translateX) / camera.scale,
    y: (point.y - camera.translateY) / camera.scale,
  };
}

export function graphPointToScreenPoint(point: Point, camera: Camera): Point {
  return {
    x: point.x * camera.scale + camera.translateX,
    y: point.y * camera.scale + camera.translateY,
  };
}

export function hitTestGraphNode(
  layout: GraphLayout,
  screenPoint: Point,
  camera: Camera,
): LayoutNode | null {
  const graphPoint = screenPointToGraphPoint(screenPoint, camera);
  const candidates = [...layout.nodes, layout.center].reverse();
  return candidates.find((node) =>
    distance(graphPoint, node) <= node.radius + GRAPH_CONFIG.hitSlop
  ) ?? null;
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

