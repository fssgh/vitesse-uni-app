import Uni from '@dcloudio/vite-plugin-uni'
import path from 'node:path'
import process from 'node:process'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { NutResolver } from 'nutui-uniapp'

// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
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
        imports: ['vue', '@vueuse/core', 'uni-app', 'pinia', {
          'nutui-uniapp/composables': [
            // 在这里添加需要自动导入的API
            'useToast',
            'useNotify',
          ],
        }], // 要自动导入的内容
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
