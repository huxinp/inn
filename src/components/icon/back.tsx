import { Text } from "@tarojs/components";

function hex2rgb(hex: string) {
  var rgb: number[] = [];

  hex = hex.substr(1);

  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  hex.replace(/../g, function(color) {
    rgb.push(parseInt(color, 0x10));
    return color;
  });

  return "rgb(" + rgb.join(",") + ")";
}

function fixColor(color: string) {
  return color.indexOf("#") === 0 ? hex2rgb(color) : color;
}

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

export default function Back(props: {
  size?: number;
  color?: string;
  className?: string;
  onClick?(): void;
}) {
  return (
    <Text
      className={props.className}
      onClick={props.onClick}
      style={{
        display: "inline-block",
        width: props.size || 20,
        height: props.size || 20,
        background: `
          url("data:image/svg+xml;utf8,${buildSVG(
            props.size,
            props.color
          )}") no-repeat center
        `
      }}
    />
  );
}
