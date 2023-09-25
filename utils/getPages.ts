import fs from "fs";
import path from "path";

export default function getPath() {
  const pagesDir = path.join(process.cwd(), "pages");
  const pageNames = fs.readdirSync(pagesDir);
  const excluded = ["_app.js", "_document.js", "index.tsx", "api", "test-component.tsx", "jotai.tsx"];

  const filteredPages = pageNames.filter((page) => {
    return !excluded.includes(page);
  });

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  };

  const pages = filteredPages.map((page) => {
    return {
      title: titleCase(page.split("-").join(" ")).split(".")[0],
      path: page.split(".")[0],
    };
  });

  return {
    pages,
  };
}
