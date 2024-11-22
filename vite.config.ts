import path from 'node:path'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import { NutResolver } from 'nutui-uniapp'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    envDir: './env', // 自定义env目录
    envPrefix: 'APP_', // 自定义vite环境变量前缀
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@imgs': path.join(process.cwd(), './src/static/images'),
      },
    },
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'src/uni-pages.d.ts',
      }),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        resolvers: [
          NutResolver(),
        ],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
      }),
      Uni(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', '@vueuse/core', 'uni-app', 'pinia', {
          'nutui-uniapp/composables': [
            // 在这里添加nutui-uniapp需要自动导入的API
            'useToast',
            'useNotify',
          ],
        }],
        resolvers: [VueHooksPlusResolver()],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils'], // 指定目录下的文件进行自动导入
        vueTemplate: true, // vue模板文件进行自动导入
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
  })
}
