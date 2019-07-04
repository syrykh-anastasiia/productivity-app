const devDir = 'dev';
const publicDir = 'public';

module.exports = {
	publicDir,
	devDir,
	assetsDir: `${devDir}/assets`,
	imagesDir: {
		entry: `${devDir}/images`,
		output: `${publicDir}/images`
	},
	scssDir: {
		entry: `${devDir}/styles`,
		output: `${publicDir}/css`,
		mainFileName: 'main',
		mainFileOutput: publicDir
	},
    lessDir: {
        entry: `${devDir}/styles`,
        output: `${publicDir}/css`,
        mainFileName: 'main',
        mainFileOutput: publicDir
    },
	pugDir: {
		entry: devDir,
		output: publicDir
	},
	jsDir: {
		entry: `${devDir}/js`,
		output: `${publicDir}/js`
	},
	jsES6: {
		entry: `${devDir}/js/es6`,
		names: ['main']
	}
};
