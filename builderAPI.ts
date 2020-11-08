import * as builder from 'electron-builder';
import * as fse from 'fs-extra';
import personalAccessTokens from './personal-access-tokens.json';

const PRODUCT_NAME = 'demo';
const VERSION = '1.0.0';
const ext = 'exe';
const BUILD_FOLDER = `build-${VERSION}`;
const URL_DOWNLOAD = 'https://gestion-materiels.herokuapp.com';


async function main() {
  const opt: builder.CliOptions = {
    targets: builder.Platform.WINDOWS.createTarget(),
    config: {
      directories: {
        output: BUILD_FOLDER,
        // buildResources: `./`,
        // app: './'
      },
      asarUnpack: [
        // '**/programs/server/assets/app/*'
      ],
      buildVersion: '1.0.0',
      appId: 'com.djm2x.electron-express-typeorm-angular',
      productName: 'electron-express-typeorm-angular',
      copyright: `Copyright © ${new Date().getFullYear()} dj m2x`,
      npmRebuild: true,
      
      // nsisWeb: {
      //   appPackageUrl : `${URL_DOWNLOAD}/download/${PRODUCT_NAME}.${ext}`,
      //   artifactName: `${PRODUCT_NAME}.${ext}`,
      //   // artifactName: `${PRODUCT_NAME} Web Setup ${VERSION}.${ext}`,
      //   allowElevation: true,
      //   allowToChangeInstallationDirectory: true,
      //   oneClick: false,
      // },
      win: {
        artifactName: `${PRODUCT_NAME}-${VERSION}.${ext}`,
        asar: false,
        // icon: `${__dirname}/angular/src/assets/icon.png`,
        compression: 'maximum',
        publish: {
          icon: './favicon.ico',
          provider: 'github',
          repo: 'https://github.com/djm2x/electron-auto-update.git',
          token: personalAccessTokens.token,
          owner: 'dj m2x'
        },
        files: [
          './node_modules/@*',
          '!./build*',
          '!./angular*',
          './main.js',
          './dist/**/*'
        ],
        target: [
          {
            target: 'portable',
            // target: 'nsis-web',
            arch: [
              'ia32',
              // 'x64'
            ],
          }
        ],
      },
    },
  };

  try {
    if (fse.existsSync(`${__dirname}/${BUILD_FOLDER}`)) {
      // fs.unlinkSync(`${__dirname}/${BUILD_FOLDER}`)
      fse.removeSync(`${__dirname}/${BUILD_FOLDER}`)
      console.log(`${__dirname}/${BUILD_FOLDER} a ete supprimer avec success`);
    }
    
    const r = await builder.build(opt)
    console.log('Build OK!', r);

  } catch (error) {
    const e: Error = error;
    console.log(e.name)
    console.log('>>>>>>>>>>>>>>>>>>>>>> BuilderAPi begin trace message')
    console.log(e.message)
    console.log('<<<<<<<<<<<<<<<<<<<<<< BuilderAPi end trace')
    console.log('>>>>>>>>>>>>>>>>>>>>>> BuilderAPi begin trace message')
    console.log(e.stack)
    console.log('<<<<<<<<<<<<<<<<<<<<<< BuilderAPi end trace')
  }
}

//
main();