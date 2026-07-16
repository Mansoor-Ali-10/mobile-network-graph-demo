# Mobile Network Graph Demo

A small React Native graph-layout demo for portfolio review.

The code demonstrates:

- deterministic radial graph layout
- curved edge geometry
- camera-aware hit testing
- a lightweight React Native component boundary
- focused unit tests for pure graph behavior

The sample data is fictional and domain-neutral. It represents a generic project
network, not a real product schema or private dataset.

## Run

```bash
npm install
npm test
```

To embed the component in an Expo app, render `NetworkGraph` with the sample data
from `src/graph/sampleData.ts`.

