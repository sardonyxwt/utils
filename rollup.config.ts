import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';
import cleaner from 'rollup-plugin-cleaner';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: ['react', 'react-dom', 'styled-components'],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.rollup.json',
            typescript: require('ttypescript'),
            useTsconfigDeclarationDir: true,
        }),
        cleaner({
            targets: ['./lib/'],
        }),
        visualizer({
            filename: 'report/stats.html',
        }),
    ],
};
