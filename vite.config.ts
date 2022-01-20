import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 自动导入函数插件
import AutoImport from 'unplugin-auto-import/vite';
// 组件按需自动引入
import Components from 'unplugin-vue-components/vite';
// 组件库按需引入
import {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers';
// svg插件
import viteSvgIcons from 'vite-plugin-svg-icons';
// 压缩插件
import viteCompression from 'vite-plugin-compression';
import path from 'path';

// 重写resolve方法
function _resolve(dir: string){
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': _resolve('src'),
      '@assets': _resolve('src/assets'),
      '@comps': _resolve('src/components'),
      '@utils': _resolve('src/utils'),
      '@router': _resolve('src/router'),
      '@store': _resolve('src/store'),
    }
  },
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [ElementPlusResolver()],

      dts: path.resolve(_resolve('src'), 'auto-imports.d.ts'),
    }),
    // 自动引入组件
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: path.resolve(_resolve('src'), 'components.d.ts'),
    }),
    // svg插件
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    // 压缩插件
    viteCompression(),
  ],
})
