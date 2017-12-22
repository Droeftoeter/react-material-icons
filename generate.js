const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const Mustache = require('mustache');

/**
 * Utility function to convert name to PascalCase
 * Will also replace leading numbers by their name, because var-names cannot start with a number.
 *
 * @returns {string}
 */
String.prototype.toPascalCase = function() {
    const mapping = [
        'Zero',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
    ];

    const str = /[0-9]+/.test(this.charAt(0)) ? mapping[ Number(this.charAt(0)) ] + this.slice(1) : this;
    return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

};

// Paths
const paths = {
    src:              path.resolve(__dirname, 'src'),
    iconTemplate:     path.resolve(__dirname, 'icon.mustache'),
    categoryTemplate: path.resolve(__dirname, 'category.mustache'),
    packageTemplate:  path.resolve(__dirname, 'package.mustache'),
    icons:            path.resolve(__dirname, 'material-design-icons'),
};

// Expressions
const expr = {
    fileName:     /([a-z0-9]+)\/svg\/production\/ic_([a-z0-9_]+)_48px.svg/i,
    fileContents: /<svg.+>(.+)<\/svg>/i,
};

// Mustache templates
const iconTemplate = fs.readFileSync(paths.iconTemplate, 'utf8');
const categoryTemplate = fs.readFileSync(paths.categoryTemplate, 'utf8');
const packageTemplate = fs.readFileSync(paths.packageTemplate, 'utf8');

const categories = {};

// Turns a SVG into a React component
function createIconComponent(file) {
    // Extract both the category and the icon's name.
    const match = file.match(expr.fileName);

    if (match === null) {
        throw new Error(`Failed to match category and/or icon name for ${ file }`);
    }

    if (match[ 1 ] && match[ 2 ]) {
        const category = match[ 1 ].toPascalCase();
        const iconName = match[ 2 ].toPascalCase();
        const fileName = `${ category.toLowerCase() }/${ iconName }.js`;

        console.log(`Generating ${ fileName }...`);

        const contentMatch = fs.readFileSync(path.resolve(paths.icons, file), 'utf8').match(expr.fileContents);

        if (contentMatch === null) {
            throw new Error(`Failed to match SVG contents for ${ file }`);
        }

        if (contentMatch[ 1 ]) {
            if (!(category.toLowerCase() in categories)) {
                categories[ category.toLowerCase() ] = [];
            }

            categories[ category.toLowerCase() ].push(iconName);

            // Write from template
            fs.outputFileSync(
                path.resolve(paths.src, fileName),
                Mustache.render(iconTemplate, {
                    svgData: contentMatch[ 1 ],
                }),
            );
        }
    }
}

console.log('Collecting icon SVGs...');

// Creates a component from template for each icon.
glob('**/production/ic_*_48px.svg', {
    cwd: paths.icons,
}, (error, files) => {
    console.log('Generating icon components...');
    files.forEach(createIconComponent);

    console.log('Generating category indexes and subpackages...');
    Object.keys(categories).forEach(category => {
        const fileName = `${ category.toLowerCase() }/index.js`;
        console.log(`Generating ${ fileName }...`);

        fs.outputFileSync(
            path.resolve(paths.src, fileName),
            Mustache.render(categoryTemplate, {
                icons: categories[ category ],
            }),
        );

        const packageName = `${ category.toLowerCase() }/package.json`;
        console.log(`Generating ${ packageName }...`);

        fs.outputFileSync(
            path.resolve(__dirname, packageName),
            Mustache.render(packageTemplate, {
                category: category.toLowerCase(),
            }),
        );
    });

    console.log('Generating index...');
    fs.outputFileSync(
        path.resolve(paths.src, 'index.js'),
        Mustache.render(categoryTemplate, {
            icons: Object.keys(categories),
        }),
    );

    console.log('Done!');
});
