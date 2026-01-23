// constants.js
import logo1 from "../../assets/logos.png";
import logo2 from "../../assets/gcp.png";
import logo3 from "../../assets/AI.jpeg";
import logo4 from "../../assets/TVS.svg";
import logo5 from "../../assets/MAJ_Logo_for_Web.png";
import logo6 from "../../assets/tt.png";
import logo7 from "../../assets/value.png";
import logo8 from "../../assets/tre.jpeg";
import logo9 from "../../assets/toast.png";
import logo10 from "../../assets/HS.svg";
import logo11 from "../../assets/PS.png";
import logo12 from "../../assets/RR.svg";
import logo13 from "../../assets/MR.svg";
export const DEFAULT_LOGOS = Object.freeze([
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
]);

export const duplicatedLogos = (logos, times = 3) =>
  Array.from({ length: times }, () => logos).flat();
