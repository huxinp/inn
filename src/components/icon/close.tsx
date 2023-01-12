import { Icon as Icon2 } from "@tarojs/components";
import Icon from "./index";
import { fixColor } from "./utils";

function buildSVG(size = 20, color = "currentColor") {
  color = fixColor(color);
  return encodeURI(`
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="${size}px"
      height="${size}px"
    >
      <path
        d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048
          L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352
          c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872
          l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872
          C696.544 907.328 684.256 912 671.968 912z"
        fill="${color}"
      ></path>
    </svg>
  `);
}

export default function Close(props: {
  size?: number;
  color?: string;
  className?: string;
  onClick?(): void;
}) {
  return <Icon2 size="20" color="red" type="cancel" />;
  return <Icon {...props} getSVGStr={buildSVG} />;
}
