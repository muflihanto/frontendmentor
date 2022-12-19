import fs from "fs";
import path from "path";

export default function getPath() {
  const pagesDir = path.join(process.cwd(), "pages");
  const pageNames = fs.readdirSync(pagesDir);
  const excluded = ["index.js", "api", "test-component.js"];
  const filteredPages = pageNames.filter((page) => {
    return page[0] !== "_" && !excluded.includes(page);
  });
  const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  };
  const pageTitles = filteredPages.map((page) => {
    return titleCase(page.split("-").join(" ").slice(0, -3));
  });
  return {
    titles: pageTitles,
    paths: filteredPages.map((page) => {
      return page.slice(0, -3);
    }),
  };
}
