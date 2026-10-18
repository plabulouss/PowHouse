const preview = document.querySelector(".adjust");

if (!(preview instanceof HTMLElement)) {
  throw new Error("Typography preview is missing from try.html.");
}

const controls = [
  { id: "font-size", property: "fontSize", output: ".value.font" },
  { id: "leading-size", property: "lineHeight", output: ".value.leading" },
  { id: "kerning-size", property: "letterSpacing", output: ".value.kerning" },
];

for (const { id, property, output: outputSelector } of controls) {
  const input = document.getElementById(id);
  const output = document.querySelector(outputSelector);

  if (!(input instanceof HTMLInputElement) || input.type !== "range") {
    throw new Error(`Range input #${id} is missing from try.html.`);
  }
  if (!(output instanceof HTMLElement)) {
    throw new Error(`Value display ${outputSelector} is missing from try.html.`);
  }

  const update = () => {
    preview.style[property] = `${input.value}px`;
    output.textContent = `${input.value} px`;
  };

  input.addEventListener("input", update);
  update();
}

const fontFamily = document.getElementById("font-family");
if (!(fontFamily instanceof HTMLSelectElement)) {
  throw new Error("Typeface dropdown is missing from try.html.");
}

fontFamily.addEventListener("change", () => {
  preview.style.fontWeight = fontFamily.value;
});
