export type CardVariant =
  | "Supervisor"
  | "Team Builder"
  | "Karma"
  | "Calculator";

export const cards = {
  Supervisor: {
    p: "Monitors activity to identify project roadblocks",
    cardStyle:
      "before:bg-four-card-primary-cyan grid-area lg:row-start-2 lg:col-start-1 lg:place-self-center",
  },
  "Team Builder": {
    p: "Scans our talent network to create the optimal team for your project",
    cardStyle:
      "before:bg-four-card-primary-red grid-area lg:row-start-1 lg:col-start-2 lg:place-self-end ",
  },
  Karma: {
    p: "Regularly evaluates our talent to ensure quality",
    cardStyle:
      "before:bg-four-card-primary-orange grid-area lg:row-start-3 lg:col-start-2",
  },
  Calculator: {
    p: "Uses data from past projects to provide better delivery estimates",
    cardStyle:
      "before:bg-four-card-primary-blue grid-area lg:row-start-2 lg:col-start-3 lg:place-self-center",
  },
} as const satisfies Record<CardVariant, { p: string; cardStyle: string }>;
