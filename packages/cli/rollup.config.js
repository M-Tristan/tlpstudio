import resolve from 'rollup-plugin-node-resolve';
import rollupTypescript from 'rollup-plugin-typescript2' 
export default {
    input: 'src/bin.ts',
    output: {
      file: 'bin/bin.js',
      format: 'es'
    },
    plugins: [ rollupTypescript() ]
  };
  
  