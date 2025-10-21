module.exports = {
    // this will check Typescript files
    '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

    // This will format and lint TS & TSX Files
    '**/*.(ts|tsx)': (filenames) => [
        //|js
        `npx prettier --write ${filenames
            .map((name) => `"${name}"`)
            .join(' ')}`,
        `npx eslint --fix --max-warnings=0 ${filenames
            .map((name) => `"${name}"`)
            .join(' ')}`,
    ],
//        `npx eslint src --resolve-plugins-relative-to . --config ./lint-staged-config/eslintb.json . --fix --max-warnings=0 ${filenames

    // this will Format MarkDown and JSON
    // '**/*.(md|json)': (filenames) =>
    // `yarn prettier --write ${filenames.join(' ')}`,
};
