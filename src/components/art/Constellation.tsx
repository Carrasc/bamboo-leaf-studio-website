type ConstellationProps = {
  className?: string;
};

const LINES = "M806.9,65.7 L788.5,47.9 L706.9,27.7 L701.1,40.5 L773.2,51.9 M1104.1,110.9 L1099.6,169.0 L1057.8,159.0 L977.7,184.2 L975.4,189.7 M965.2,299.6 L977.7,364.2 L986.2,362.6 L984.7,347.2 L1028.9,309.6 M855.0,298.4 L778.8,233.0 L832.9,168.6 L882.5,149.9 M440.3,348.1 L481.0,318.0 L512.5,332.4 M828.9,179.1 L890.2,136.7 L960.2,203.0 L951.9,164.2 L915.1,176.6 M267.6,223.5 L221.3,166.4 L144.2,183.0 L94.6,229.1 L87.5,236.1";

/**
 * The night band's sky. Linked asterisms over a scatter of loose field stars —
 * drawn, not simulated, so it costs one paint and never animates.
 */
export function Constellation({ className }: ConstellationProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none w-full ${className ?? ""}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g fill="var(--surface)" fillOpacity={0.28}>
        <circle cx="986.2" cy="63.9" r="1.03" /> <circle cx="470.2" cy="388.2" r="1.13" /> <circle cx="832.5" cy="151.0" r="0.67" /> <circle cx="816.9" cy="318.7" r="0.66" /> <circle cx="523.3" cy="136.0" r="0.80" /> <circle cx="1078.5" cy="364.0" r="0.97" /> <circle cx="761.6" cy="69.0" r="1.13" /> <circle cx="22.2" cy="279.4" r="1.12" /> <circle cx="1195.3" cy="243.6" r="0.84" /> <circle cx="367.6" cy="325.3" r="0.64" /> <circle cx="809.2" cy="365.8" r="1.13" /> <circle cx="1060.8" cy="264.5" r="0.90" /> <circle cx="806.0" cy="92.2" r="0.74" /> <circle cx="1196.7" cy="276.0" r="1.17" /> <circle cx="1094.4" cy="170.7" r="0.79" /> <circle cx="470.8" cy="374.9" r="0.87" /> <circle cx="340.9" cy="295.9" r="0.70" /> <circle cx="1067.0" cy="130.1" r="0.98" /> <circle cx="1006.6" cy="86.0" r="1.07" /> <circle cx="251.7" cy="132.2" r="1.17" /> <circle cx="1071.2" cy="228.1" r="0.95" /> <circle cx="1125.7" cy="27.4" r="0.69" /> <circle cx="58.5" cy="231.4" r="1.18" /> <circle cx="208.4" cy="335.8" r="1.02" /> <circle cx="466.3" cy="383.9" r="0.68" /> <circle cx="1101.0" cy="205.2" r="1.02" /> <circle cx="1014.3" cy="266.2" r="0.99" /> <circle cx="846.9" cy="398.8" r="0.78" /> <circle cx="813.6" cy="94.4" r="1.14" /> <circle cx="17.5" cy="287.2" r="0.78" /> <circle cx="1037.1" cy="279.6" r="0.75" /> <circle cx="873.4" cy="216.2" r="0.85" /> <circle cx="641.7" cy="391.3" r="0.67" /> <circle cx="740.6" cy="253.8" r="1.12" /> <circle cx="150.1" cy="66.1" r="1.11" /> <circle cx="468.6" cy="67.9" r="0.78" /> <circle cx="717.3" cy="61.2" r="0.75" /> <circle cx="366.5" cy="200.9" r="0.56" /> <circle cx="322.3" cy="330.3" r="0.74" /> <circle cx="44.4" cy="75.3" r="0.88" /> <circle cx="706.8" cy="139.3" r="1.02" /> <circle cx="1119.3" cy="239.0" r="0.65" /> <circle cx="39.7" cy="216.2" r="1.01" /> <circle cx="1088.0" cy="307.1" r="0.73" /> <circle cx="99.9" cy="237.6" r="1.05" /> <circle cx="697.3" cy="213.2" r="0.79" /> <circle cx="484.3" cy="352.8" r="0.51" /> <circle cx="1175.9" cy="347.1" r="0.52" /> <circle cx="1171.4" cy="329.0" r="0.78" /> <circle cx="598.6" cy="240.9" r="1.11" /> <circle cx="353.9" cy="269.0" r="1.10" /> <circle cx="109.2" cy="204.1" r="0.97" /> <circle cx="949.2" cy="27.5" r="0.96" /> <circle cx="631.7" cy="21.9" r="0.70" /> <circle cx="1190.1" cy="311.7" r="1.18" /> <circle cx="281.0" cy="181.5" r="0.57" /> <circle cx="659.5" cy="85.6" r="0.82" /> <circle cx="828.8" cy="166.6" r="0.51" /> <circle cx="1039.5" cy="256.8" r="0.98" /> <circle cx="360.0" cy="7.5" r="0.88" /> <circle cx="363.1" cy="149.6" r="0.70" /> <circle cx="400.3" cy="289.4" r="0.61" /> <circle cx="719.4" cy="344.9" r="0.84" /> <circle cx="504.2" cy="137.1" r="1.10" /> <circle cx="70.8" cy="118.2" r="0.55" /> <circle cx="838.4" cy="378.8" r="0.70" /> <circle cx="1185.5" cy="151.9" r="1.09" /> <circle cx="535.5" cy="186.7" r="1.07" /> <circle cx="838.3" cy="169.7" r="0.81" /> <circle cx="561.4" cy="376.3" r="1.07" /> <circle cx="296.6" cy="38.5" r="0.69" /> <circle cx="93.5" cy="11.0" r="1.00" /> <circle cx="874.2" cy="72.8" r="0.95" /> <circle cx="1034.2" cy="170.4" r="0.87" /> <circle cx="191.0" cy="143.5" r="0.57" /> <circle cx="354.0" cy="295.0" r="0.82" /> <circle cx="503.1" cy="240.7" r="0.88" /> <circle cx="388.5" cy="12.4" r="0.97" /> <circle cx="1116.3" cy="316.0" r="1.08" /> <circle cx="257.7" cy="26.5" r="1.19" /> <circle cx="526.9" cy="242.9" r="0.83" /> <circle cx="52.7" cy="248.4" r="0.95" /> <circle cx="342.5" cy="308.8" r="0.66" /> <circle cx="1056.9" cy="44.0" r="0.86" /> <circle cx="115.6" cy="207.6" r="1.01" /> <circle cx="126.3" cy="362.9" r="0.76" /> <circle cx="1102.2" cy="160.3" r="0.75" /> <circle cx="213.6" cy="244.0" r="0.59" /> <circle cx="207.2" cy="299.8" r="0.55" /> <circle cx="810.0" cy="293.9" r="1.18" />
      </g>
      <path
        d={LINES}
        className="ink-stroke"
        stroke="var(--thread)"
        strokeOpacity={0.42}
        strokeWidth={0.9}
      />
      <g fill="var(--thread)" fillOpacity={0.75}>
        <circle cx="806.9" cy="65.7" r="1.9" /> <circle cx="788.5" cy="47.9" r="1.9" /> <circle cx="706.9" cy="27.7" r="1.9" /> <circle cx="701.1" cy="40.5" r="1.9" /> <circle cx="773.2" cy="51.9" r="1.9" /> <circle cx="1104.1" cy="110.9" r="1.9" /> <circle cx="1099.6" cy="169.0" r="1.9" /> <circle cx="1057.8" cy="159.0" r="1.9" /> <circle cx="977.7" cy="184.2" r="1.9" /> <circle cx="975.4" cy="189.7" r="1.9" /> <circle cx="965.2" cy="299.6" r="1.9" /> <circle cx="977.7" cy="364.2" r="1.9" /> <circle cx="986.2" cy="362.6" r="1.9" /> <circle cx="984.7" cy="347.2" r="1.9" /> <circle cx="1028.9" cy="309.6" r="1.9" /> <circle cx="855.0" cy="298.4" r="1.9" /> <circle cx="778.8" cy="233.0" r="1.9" /> <circle cx="832.9" cy="168.6" r="1.9" /> <circle cx="882.5" cy="149.9" r="1.9" /> <circle cx="440.3" cy="348.1" r="1.9" /> <circle cx="481.0" cy="318.0" r="1.9" /> <circle cx="512.5" cy="332.4" r="1.9" /> <circle cx="828.9" cy="179.1" r="1.9" /> <circle cx="890.2" cy="136.7" r="1.9" /> <circle cx="960.2" cy="203.0" r="1.9" /> <circle cx="951.9" cy="164.2" r="1.9" /> <circle cx="915.1" cy="176.6" r="1.9" /> <circle cx="267.6" cy="223.5" r="1.9" /> <circle cx="221.3" cy="166.4" r="1.9" /> <circle cx="144.2" cy="183.0" r="1.9" /> <circle cx="94.6" cy="229.1" r="1.9" /> <circle cx="87.5" cy="236.1" r="1.9" />
      </g>
    </svg>
  );
}
