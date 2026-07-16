# Mobile Network Graph Demo

A small React Native demo for drawing and interacting with a network graph.

It uses fictional project data to show how a mobile app can place connected
items around a center point, draw curved links between them, and detect which
item a user taps.

The code includes:

- a predictable circular layout for connected items
- curved lines between related nodes
- tap detection that still works when the graph is moved or zoomed
- a small React Native component using `react-native-svg`
- unit tests for the layout and tap behavior

The sample data is fictional and domain-neutral. It represents a generic project
network, not a real product schema or private dataset.

## Run

```bash
npm install
npm test
```

To embed the component in an Expo app, render `NetworkGraph` with the sample data
from `src/graph/sampleData.ts`.
