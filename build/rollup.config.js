import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

module.exports = [
  {
    input: "src/index.js",
    output: [
      {
        sourcemap: true,
        file: "dist/index.js",
        format: "es",
      },
    ],
    inlineDynamicImports: true,
    plugins: [
      vue({
        preprocessStyles: true,
        preprocessOptions: {
          scss: {
            additionalData: `
              @import 'dist/tokens/_variables.scss';
              @import 'dist/styles/styles.scss';
            `,
          },
        },
      }),
      terser(),
      postcss(),
    ],
  },
];

// Como o nome sugere, esse é o arquivo de configuração do rollup. Ele pega irá pegar todos os componentes que estejam dentro do arquivos
// index.js que criamos acima e irá fazer o build para um único arquivo JS. Ele também irá juntar nossos arquivos de estilo e colocar no meio
//  do build, mas note que os caminhos dos arquivos .scss estão diferentes, já iremos ver isso:
