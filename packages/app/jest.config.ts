import { compilerOptions } from './tsconfig.json';
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
	prefix: '<rootDir>/',
});

export default {
	preset: 'ts-jest',
	testRegex: '(/test/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	testPathIgnorePatterns: ['dist', 'build'],
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	coverageReporters: ['json', 'lcov', 'text'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/test/__mocks__/fileMock.ts',
		'\\.(css|scss|pcss)$': '<rootDir>/test/__mocks__/styleMock.ts',
		'^(src/.*)$': '<rootDir>/$1',
		...moduleNameMapper,
	},
} satisfies Config;
