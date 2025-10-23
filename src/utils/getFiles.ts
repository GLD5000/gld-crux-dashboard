import fs from "fs";
import path from "path";

export function getTsxFileList(directory: string): string[] {
  // console.log('directory:', directory);
  const files = fs.readdirSync(directory);
  // console.log('files:', files);
  const tsxFiles = files.filter((file) => path.extname(file) === ".tsx");

  return tsxFiles;
}
export async function importFile(directory: string, fileName: string) {
  const file = await import(path.join(directory, fileName));
  return file;
}

// function importAllTsxFiles(directory: string): Promise<any>[] {
//     // console.log('directory:', directory);
//     const files = fs.readdirSync(directory);
//     // console.log('files:', files);
//     const tsxFiles = files.filter((file) => path.extname(file) === '.tsx');

//     return tsxFiles.map((file) => import(path.join(directory, file)));
// }

// export async function loadComponents(
//     newPath: string = 'hero-banners\\individual-banners'
// ) {
//     const componentsDirectory = __dirname.replace(
//         'utilities',
//         `components\\prod\\${newPath}`
//     );
//     // console.log('__dirname:', __dirname);
//     // console.log('componentsDirectory:', componentsDirectory);
//     const components = await Promise.all(
//         importAllTsxFiles(componentsDirectory)
//     );

//     // Now `components` is an array of all imported modules
//     // console.log(components);
//     return components;
// }

export function getDirectoryComponents(newPath: string[]): string {
  return path.join(
    __dirname.replace("utils", "components"),
    "prod",
    ...newPath,
  );
}

export function getDirectoryTsxList(componentsDirectory: string) {
  const componentList = getTsxFileList(componentsDirectory);
  return componentList;
}
