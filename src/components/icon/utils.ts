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

export function fixColor(color: string) {
  return color.indexOf("#") === 0 ? hex2rgb(color) : color;
}
