type TornEdgeProps = {
  /** CSS color the torn band is filled with — normally the section below it. */
  fill: string;
  /** 0–3. Different seeds so two consecutive tears never rhyme. */
  variant?: 0 | 1 | 2 | 3;
  /** Flip vertically, for a tear that hangs off the bottom of a section. */
  flip?: boolean;
  className?: string;
};

// Deterministic ragged edges — generated once, then frozen, so the page looks
// identical on every render and between server and client.
const EDGES = [
  "M0,37.1 L32.3,37.4 L57.3,32.3 L83.1,31.5 L97.1,43.6 L110.0,46.7 L136.4,40.1 L148.7,27.8 L166.1,29.5 L187.8,44.2 L213.8,38.0 L235.9,34.0 L269.8,44.1 L288.7,33.1 L302.3,42.8 L332.9,36.0 L363.6,29.0 L395.6,37.5 L416.3,30.3 L445.5,21.9 L478.7,31.4 L492.9,30.1 L508.8,39.1 L525.0,42.2 L551.2,31.1 L567.8,33.9 L597.5,34.5 L614.1,36.1 L640.3,30.8 L657.0,33.6 L676.2,24.5 L701.0,33.4 L721.2,37.2 L743.8,39.3 L759.9,31.8 L789.8,33.5 L818.1,45.9 L851.0,44.9 L872.3,13.2 L889.5,41.7 L919.7,39.7 L935.5,30.9 L959.8,44.3 L978.0,45.5 L990.4,33.8 L1003.7,32.2 L1028.3,31.4 L1059.9,46.6 L1087.1,39.5 L1099.9,29.3 L1127.3,31.6 L1149.9,42.1 L1183.9,30.4 L1200,45.2 L1200,60 L0,60 Z",
  "M0,38.9 L30.6,34.2 L50.2,36.5 L64.4,37.0 L84.1,47.0 L109.5,36.6 L131.3,32.1 L152.3,43.3 L168.6,41.1 L191.9,33.0 L221.2,38.3 L249.8,39.6 L270.6,40.1 L284.8,45.9 L299.8,31.7 L313.3,36.2 L339.8,37.4 L366.3,34.8 L393.6,46.4 L426.9,32.7 L460.3,29.4 L492.3,31.4 L524.5,46.3 L552.4,42.7 L564.6,40.3 L597.4,27.7 L619.3,22.4 L642.3,20.8 L655.1,43.1 L671.5,40.4 L688.9,35.0 L717.6,40.2 L742.2,34.7 L771.5,30.0 L789.9,45.0 L816.8,36.8 L839.8,45.1 L860.3,31.7 L882.7,40.6 L901.8,45.9 L923.6,33.0 L955.9,32.1 L982.2,17.3 L995.4,38.9 L1017.6,22.9 L1036.6,31.1 L1061.9,30.7 L1094.2,29.2 L1124.2,33.1 L1150.2,33.5 L1170.9,34.4 L1199.0,42.7 L1200,33.6 L1200,60 L0,60 Z",
  "M0,35.3 L22.0,35.2 L42.6,29.7 L55.1,30.8 L88.4,37.7 L120.6,45.2 L137.6,38.4 L170.7,29.6 L197.8,39.8 L226.6,33.3 L258.7,29.6 L278.7,35.9 L296.3,40.7 L328.6,44.2 L357.0,42.9 L383.9,34.2 L401.1,39.0 L424.8,29.7 L454.0,33.7 L483.6,39.9 L500.1,37.7 L533.8,39.0 L567.4,38.8 L581.2,33.8 L605.3,43.1 L637.5,29.6 L663.6,38.3 L686.0,41.7 L704.9,29.4 L724.6,46.9 L751.8,32.2 L766.6,31.5 L786.2,36.1 L798.2,22.0 L811.1,32.3 L833.9,43.1 L857.5,29.5 L887.9,45.6 L919.0,44.8 L932.3,21.7 L956.4,33.3 L980.1,38.9 L1005.8,33.4 L1030.0,46.2 L1049.8,34.5 L1072.6,31.5 L1087.1,37.3 L1117.2,36.8 L1146.0,30.2 L1175.3,26.6 L1200,32.0 L1200,60 L0,60 Z",
  "M0,34.0 L24.4,37.3 L47.1,38.3 L61.6,33.6 L74.1,35.3 L98.3,36.8 L130.9,39.2 L162.2,44.4 L191.7,44.9 L208.7,32.9 L226.7,18.1 L243.9,32.1 L257.8,25.4 L272.7,31.6 L301.5,37.8 L318.8,44.4 L339.9,43.5 L353.2,29.2 L372.7,37.8 L405.0,43.6 L423.6,35.9 L444.6,37.8 L458.7,45.8 L482.5,27.9 L495.5,31.0 L511.8,41.5 L533.0,41.2 L558.6,39.6 L574.0,46.9 L588.9,33.3 L622.5,46.8 L642.9,29.9 L667.4,33.9 L689.8,31.4 L712.2,32.1 L732.2,28.1 L745.7,39.7 L775.1,40.4 L800.9,34.8 L821.4,37.2 L833.4,32.6 L848.1,35.7 L870.7,42.9 L882.8,37.0 L905.4,35.5 L925.4,45.8 L941.6,40.5 L966.6,41.3 L995.0,39.8 L1023.7,39.9 L1040.7,30.7 L1063.5,35.7 L1094.5,44.5 L1109.4,32.8 L1139.6,32.7 L1152.4,36.0 L1173.1,44.4 L1188.4,36.9 L1200,41.4 L1200,60 L0,60 Z"
] as const;

/**
 * A torn-paper transition between two color bands. Positions itself above the
 * section it belongs to and bleeds upward over the section before it — drop it
 * in as the section's first child, no wrapper needed.
 *
 * The 1px overlap is load-bearing: the edge's height is a `vw` value, so its
 * bottom routinely lands on a half-pixel and one row of the section behind
 * bleeds through as a hairline seam. Overlapping by a pixel covers it.
 */
export function TornEdge({ fill, variant = 0, flip, className }: TornEdgeProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(26px,3.5vw,58px)] translate-y-[calc(-100%+1px)] ${
        flip ? "rotate-180" : ""
      } ${className ?? ""}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path d={EDGES[variant]} fill={fill} />
      </svg>
    </div>
  );
}
