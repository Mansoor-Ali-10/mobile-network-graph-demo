import { describe, expect, it } from "vitest";
import { hitTestGraphNode } from "../src/graph/hitTesting";
import { computeGraphLayout } from "../src/graph/layout";
import { sampleGraph } from "../src/graph/sampleData";

describe("hit testing", () => {
  it("finds the center node under a translated camera", () => {
    const layout = computeGraphLayout(sampleGraph, { width: 400, height: 600 });
    const hit = hitTestGraphNode(
      layout,
      { x: 430, y: 650 },
      { translateX: 30, translateY: 50, scale: 2 },
    );

    expect(hit?.id).toBe("initiative");
  });

  it("returns null when no node is nearby", () => {
    const layout = computeGraphLayout(sampleGraph, { width: 400, height: 600 });
    const hit = hitTestGraphNode(
      layout,
      { x: 4, y: 4 },
      { translateX: 0, translateY: 0, scale: 1 },
    );

    expect(hit).toBeNull();
  });
});

