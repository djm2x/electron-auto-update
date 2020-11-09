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
    // targets: builder.Platform.WINDOWS.createTarget(),
    publish: 'always',
    config: {
      
      buildVersion: '1.0.0',
      appId: 'com.djm2x.electron-express-typeorm-angular',
      productName: 'electron-express-typeorm-angular',
      copyright: `Copyright © ${new Date().getFullYear()} dj m2x`,
      artifactName: `${PRODUCT_NAME}-${VERSION}.${ext}`,
      compression: 'maximum',
      npmRebuild: true,
      asar: false,
      // nsisWeb: {
      //   appPackageUrl : `${URL_DOWNLOAD}/download/${PRODUCT_NAME}.${ext}`,
      //   artifactName: `${PRODUCT_NAME}.${ext}`,
      //   // artifactName: `${PRODUCT_NAME} Web Setup ${VERSION}.${ext}`,
      //   allowElevation: true,
      //   allowToChangeInstallationDirectory: true,
      //   oneClick: false,
      // },
      directories: {
        output: BUILD_FOLDER,
        // buildResources: `./`,
        app: './' // location of package json
      },
      asarUnpack: [
        // '**/programs/server/assets/app/*'
      ],
      publish: [{
        provider: 'github',
        repo: 'electron-auto-update',
        token: personalAccessTokens.token,
        owner: 'djm2x',
        private: false,
      }],
      files: [
        './node_modules/@*',
        '!./build*',
        '!./angular*',
        './main.js',
        './dist/**/*'
      ],
      // extraResources: [
      //   {
      //     from: "node_modules/regedit/vbs",
      //     to: "regedit/vbs",
      //     filter: [
      //       "**/*"
      //     ]
      //   }
      // ],
      nsis: {
        oneClick: true,
        perMachine: true
      },
      win: {
        // icon: '${__dirname}/favicon.ico',
        
        target: [
          {
            target: 'nsis',
            // target: 'portable',
            // target: 'nsis-web',
            // arch: [
            //   'ia32',
            //   // 'x64'
            // ],
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
    // console.log('>>>>>>>>>>>>>>>>>>>>>> BuilderAPi begin trace message')
    // console.log(e.stack)
    // console.log('<<<<<<<<<<<<<<<<<<<<<< BuilderAPi end trace')
  }
}

//
main();