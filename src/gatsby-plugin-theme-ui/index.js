const heading = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
}

const colors = {
  text: "#000",
  background: "#fff",
  primary: "#00f",
  secondary: "#00a",
  highlight: "#ededff",
  accent: "#c0f",
  gray: "#eee",
  lightgray: "#fafafa",
  midgray: "#777",
  modes: {
    dark: {
      text: "#fff",
      background: "#000",
      primary: "#0cf",
      secondary: "#f0e",
      gray: "#222",
      lightgray: "#111",
      highlight: "#001119",
    },
    cyan: {
      text: "#023",
      background: "#0ff",
      primary: "#03c",
      secondary: "#01a",
      gray: "#0cc",
      lightgray: "#0ee",
      highlight: "#0de",
    },
    gray: {
      text: "#eef",
      background: "#333336",
      primary: "#09f",
      secondary: "#0bf",
      gray: "#55555a",
      lightgray: "#444448",
      highlight: "#33444c",
    },
    book: {
      text: "#322",
      background: "#fff9f9",
      primary: "#c30",
      secondary: "#400",
      gray: "#e9e6e6",
      lightgray: "#f9f6f6",
    },
    magenta: {
      text: "#203",
      background: "#f3f",
      primary: "#208",
      secondary: "#106",
      gray: "#c0c",
      lightgray: "#e0e",
    },
  },
}

const breakpoints = ["576px", "768px", "992px", "1200px"]
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export default {
  colors,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: `-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  breakpoints,
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  radii: {
    small: 4,
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "primary",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
}
