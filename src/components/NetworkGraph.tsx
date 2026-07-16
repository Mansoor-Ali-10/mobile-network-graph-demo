import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";
import { computeGraphLayout } from "../graph/layout";
import type { NetworkGraph as NetworkGraphData } from "../graph/types";

type Props = {
  graph: NetworkGraphData;
  width: number;
  height: number;
};

export function NetworkGraph({ graph, width, height }: Props) {
  const layout = computeGraphLayout(graph, { width, height });
  const nodes = [layout.center, ...layout.nodes];

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {layout.edges.map((edge) => (
          <Path
            key={edge.id}
            d={`M ${edge.from.x} ${edge.from.y} C ${edge.control1.x} ${edge.control1.y}, ${edge.control2.x} ${edge.control2.y}, ${edge.to.x} ${edge.to.y}`}
            stroke={edge.emphasized ? "#111827" : "#9ca3af"}
            strokeWidth={edge.emphasized ? 2.5 : 1.5}
            fill="none"
          />
        ))}
        {nodes.map((node) => (
          <React.Fragment key={node.id}>
            <Circle
              cx={node.x}
              cy={node.y}
              r={node.radius}
              stroke={node.visual.stroke}
              strokeWidth={2}
              fill={node.visual.fill}
            />
            <SvgText
              x={node.x}
              y={node.y + 4}
              fontSize={node.kind === "center" ? 13 : 11}
              fontWeight={node.kind === "center" ? "700" : "600"}
              textAnchor="middle"
              fill="#111827"
            >
              {node.label}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}

