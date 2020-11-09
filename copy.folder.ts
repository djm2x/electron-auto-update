import * as fse from 'fs-extra'

const srcDir = `public`;
const destDir = `dist/${srcDir}`;

async function main() {
    try {
        await fse.copy(srcDir, destDir);

        console.log(`${srcDir} folder copied to ${destDir}`);
    } catch (e) {
        console.log(e);
    }
}

// calls
main();