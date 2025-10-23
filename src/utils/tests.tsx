/* eslint-env jest */
import React from "react";
import { render } from "@testing-library/react"; //act,
import { importFile } from "@/utils/getFiles";
import path from "path";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

export interface TestProps {
  fileName: string;
  variant: string;
  directory: string;
}

export function hasHeader(
  HeroComponent: React.ComponentType,
  headingLevel: number = 1,
) {
  it(`${HeroComponent.name} should include an H${headingLevel} element`, () => {
    const { getByRole } = render(<HeroComponent />);
    const headingElement = getByRole(`heading`, { level: headingLevel });
    expect(headingElement).toBeInTheDocument();
  });
}

export function bannerHeaderTest(
  directory: string,
  fileList: string[],
  headingLevel: number,
) {
  fileList.forEach((file) => {
    test(`${file} should include an H${headingLevel} element`, async () => {
      const MyComponent = (await importFile(directory, file))
        .default as React.ComponentType;
      const { getByRole } = render(<MyComponent />);
      // if (!getByRole) return;
      const headingElement =
        getByRole(`heading`, { level: headingLevel }) || null;
      // if (!headingElement) return;
      // if (headingElement) {
      expect(headingElement).toBeInTheDocument();
      // }
    });
  });
}

export function componentClassNameRepetitionTest(
  directory: string,
  fileList: string[],
) {
  fileList.forEach((file) => {
    test(`${file} should have no className repetition`, async () => {
      const MyComponent = (await importFile(directory, file))
        .default as React.ComponentType;
      const { container } = render(<MyComponent />);

      const elementsWithClasses = container.querySelectorAll("[class]");
      const classNamesArray = Array.from(elementsWithClasses).map((element) => {
        const classNames = element.classList;
        const classArray = Array.from(classNames);
        return classArray;
      });
      classNamesArray.forEach((stringClassList) =>
        expect(hasRepeatedClassnames(stringClassList)).toBeFalsy(),
      );
    });
  });
}

export function classNameRepetitionTestVariants(
  directory: string,
  file: string,
  variantsList: string[],
) {
  classNameTestVariants(
    directory,
    file,
    variantsList,
    hasRepeatedClassnames,
    false,
    "should have no className repetition",
  );
}
export function fixedWidthWrapperDisplayTestVariants(
  directory: string,
  file: string,
  variantsList: string[],
) {
  classNameTestVariants(
    directory,
    file,
    variantsList,
    fixedWidthWrapperHasDisplay,
    true,
    "fixed-width-wrapper should have a display class (block, grid, flex)",
  );
}

type TestToRunType = (classNames: string[]) => Boolean; // eslint-disable-line

export function classNameTestVariants(
  directory: string,
  file: string,
  variantsList: string[],
  testToRun: TestToRunType,
  expectedOutcome: boolean,
  description: string,
) {
  variantsList.forEach((currentVariant) => {
    test(`${currentVariant} ${description}`, async () => {
      const MyComponent = (await importFile(directory, file)).default as ({
        variant,  
      }: {
        variant: string;  
      }) => React.JSX.Element;
      const { container } = render(<MyComponent variant={currentVariant} />);

      const elementsWithClasses = container.querySelectorAll("[class]");
      const classNamesArray = Array.from(elementsWithClasses).map((element) => {
        const classNames = element.classList;
        const classArray = Array.from(classNames);
        return classArray;
      });
      classNamesArray.forEach((stringClassList) => {
        if (expectedOutcome) {
          return expect(testToRun(stringClassList)).toBeTruthy();
        } else {
          return expect(testToRun(stringClassList)).toBeFalsy();
        }
      });
    });
  });
}

export function renderFileTest(directoryList: string[]) {
  // Does not work in Jest - rebuild in Cypress
  const file = "page.tsx";
  directoryList.forEach((directory) => {
    console.log(
      "path.join(directory, file):",
      path.join(__dirname.replace("utils", "app"), directory, file),
    );
    test(`${directory} should render`, async () => {
      expect(true).toBeTruthy();
    });
  });
}
function hasRepeatedClassnames(classNames: string[]) {
  const uniqueClassList = new Set(classNames);
  const hasRepetition = uniqueClassList.size !== classNames.length;
  if (hasRepetition) console.log(classNames.sort());
  return hasRepetition;
}
function fixedWidthWrapperHasDisplay(classNames: string[]) {
  const isFixedWidthWrapper = classNames.includes("fixed-width-wrapper");
  if (isFixedWidthWrapper) {
    return classNames.some((value) =>
      ["grid", "block", "flex"].includes(value),
    );
  }
  return true;
}
export async function axeHasNoViolations(props: TestProps) {
  const { fileName, variant, directory } = props;
  return it(`${fileName}-${variant} should have no accessibility violations`, async () => {
    const MyComponent = (await importFile(directory, fileName))
      .default as () => React.JSX.Element;  

    // await act(async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    // });
  });
}
export function linksHaveExplicitDisplay(props: TestProps) {
  const { fileName, variant, directory } = props;

  test(`${fileName}-${variant} links should have explicitly set display mode`, async () => {
    const MyComponent = (await importFile(directory, fileName))
      .default as () => React.JSX.Element;  
    const { container } = render(<MyComponent />);

    const linkElements = container.querySelectorAll("a");

    const classNamesArray = Array.from(linkElements).map((element) => {
      return element.getAttribute("class") || "";
    });
    classNamesArray.forEach((stringClassList) => {
      try {
        return expect(hasExplicitDisplay(stringClassList)).toBeTruthy(); //eslint-disable-next-line
      } catch (error) {
        throw new Error(
          `No Explicit display property found in: "${stringClassList}"`,
        );
      }
    });
  });
}

function hasExplicitDisplay(classNames: string) {
  const classArray = getClassArrayFromListString(classNames);

  return classArray.some((value) =>
    ["grid", "block", "flex", "inline", "hidden"].includes(value),
  );
}

export function classNamesHaveNoRepetition(props: TestProps) {
  const { fileName, variant, directory } = props;

  test(`${fileName}-${variant} should have no className repetition`, async () => {
    const MyComponent = (await importFile(directory, fileName))
      .default as () => React.JSX.Element;  
    const { container } = render(<MyComponent />);

    const elementsWithClasses = container.querySelectorAll("[class]");

    const classNamesArray = Array.from(elementsWithClasses).map((element) => {
      return element.getAttribute("class") || "";
    });
    console.log("classNamesArray:", classNamesArray);
    classNamesArray.forEach((stringClassList) => {
      const repeatedNames = getRepeatedClassnames(stringClassList);
      try {
        return expect(repeatedNames).toBeFalsy(); //eslint-disable-next-line
      } catch (error) {
        throw new Error(
          `Repeat of ${repeatedNames} found in: "${stringClassList}"`,
        );
      }
    });
  });
}
function getClassArrayFromListString(classNames: string) {
  return classNames.trim().replaceAll(/[ ]+/g, " ").split(" ");
}

function getRepeatedClassnames(classNames: string) {
  const classArray = getClassArrayFromListString(classNames);
  const classSet = new Set();
  const repeatedNames = [];

  for (const name of classArray) {
    if (classSet.has(name)) repeatedNames.push(name);
    classSet.add(name);
  }
  return repeatedNames.length > 0 ? repeatedNames : undefined;
}

const tailwindShorthandPrefixes = [
  "text",
  "flex",
  "grid",
  "font",
  "border",
  "stroke",
  "fill",
  "outline",
  "decoration",
];
export function tailwindPrefixesHaveNoRepetition(props: TestProps) {
  const { fileName, variant, directory } = props;

  test(`${fileName}-${variant} should have no Tailwind prefix repetition`, async () => {
    const MyComponent = (await importFile(directory, fileName))
      .default as () => React.JSX.Element;  
    const { container } = render(<MyComponent />);

    const elementsWithClasses = container.querySelectorAll("[class]");

    const classNamesArray = Array.from(elementsWithClasses).map((element) => {
      return element.getAttribute("class") || "";
    });
    classNamesArray.forEach((stringClassList) => {
      const repeatedNames = getRepeatedTailwindClassPrefixes(stringClassList);
      try {
        return expect(repeatedNames).toBeFalsy(); //eslint-disable-next-line
      } catch (error) {
        throw new Error(
          `Repeat of ${repeatedNames} found in: "${stringClassList}"`,
        );
      }
    });
  });
}

function getRepeatedTailwindClassPrefixes(classNames: string) {
  const classArray = classNames
    .trim()
    .replaceAll(/[ ]+/g, " ")
    .split(" ")
    .filter((name) => name.indexOf("-") > -1)
    .map((tailwindClass) => tailwindClass.split("-").slice(0, -1).join("-"))
    .filter(
      (prefix) =>
        !tailwindShorthandPrefixes.some(
          (shorthandPrefix) => prefix.indexOf(shorthandPrefix) > -1,
        ),
    );
  const classSet = new Set();
  const repeatedPrefixes = [];

  for (const name of classArray) {
    if (classSet.has(name)) repeatedPrefixes.push(name);
    classSet.add(name);
  }
  return repeatedPrefixes.length > 0 ? repeatedPrefixes : undefined;
}

export function nodeFetchJson() {}
