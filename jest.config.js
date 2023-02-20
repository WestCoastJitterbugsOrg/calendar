// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');
const wpPreset = require('@wordpress/jest-preset-default/jest-preset');

/** @type {import('jest').Config} */
module.exports = {
	...wpPreset,
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/test/__mocks__/fileMock.ts',
		'\\.(css|scss|pcss)$': '<rootDir>/test/__mocks__/styleMock.ts',
		...wpPreset.moduleNameMapper,
		...(compilerOptions.paths
			? pathsToModuleNameMapper(compilerOptions.paths, {
					prefix: '<rootDir>/',
			  })
			: {}),
	},
};
