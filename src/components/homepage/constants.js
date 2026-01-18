// constants.js
import logo1 from "../../assets/logo_1.png";
import logo2 from "../../assets/logo_2.png";
import logo3 from "../../assets/logo_3.png";
import logo4 from "../../assets/logo_4.png";
import logo5 from "../../assets/logo_5.png";

export const DEFAULT_LOGOS = Object.freeze([logo1, logo2, logo3, logo4, logo5]);

export const duplicatedLogos = (logos, times = 3) =>
  Array.from({ length: times }, () => logos).flat();
