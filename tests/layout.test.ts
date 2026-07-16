import { describe, expect, it } from "vitest";
import { computeGraphLayout, ringRadiusForSize } from "../src/graph/layout";
import { sampleGraph } from "../src/graph/sampleData";

describe("graph layout", () => {
  it("centers the root node", () => {
    const layout = computeGraphLayout(sampleGraph, { width: 400, height: 600 });
    expect(layout.center.x).toBe(200);
    expect(layout.center.y).toBe(300);
  });

  it("clamps ring radius for small and large screens", () => {
    expect(ringRadiusForSize({ width: 200, height: 200 })).toBe(118);
    expect(ringRadiusForSize({ width: 1200, height: 1200 })).toBe(260);
  });

  it("drops edges that point at missing nodes", () => {
    const layout = computeGraphLayout(
      {
        ...sampleGraph,
        edges: [
          ...sampleGraph.edges,
          {
            id: "missing",
            fromNodeId: "initiative",
            toNodeId: "missing-node",
            label: "missing",
          },
        ],
      },
      { width: 400, height: 600 },
    );

    expect(layout.edges).toHaveLength(sampleGraph.edges.length);
  });
});

