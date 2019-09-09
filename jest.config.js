module.exports = {
    testURL: 'http://localhost',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '/test/.*\\.test\\.ts$',
    reporters: [
        'default',
        ['./node_modules/jest-html-reporter', {
            pageTitle: 'Utils Test Report',
            outputPath: './report/test-report.html',
            includeFailureMsg: true,
            includeConsoleLog: true
        }]
    ],
    collectCoverage: true,
    coverageDirectory: './report/coverage',
    collectCoverageFrom: [
        'file/**/*.ts',
        'generator/**/*.ts',
        'object/**/*.ts',
        'array/**/*.ts',
        '!<rootDir>/node_modules/'
    ]
};
