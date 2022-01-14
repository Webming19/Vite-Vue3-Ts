import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 组件按需自动引入
import Components from 'unplugin-vue-components/vite';
// 组件库按需引入
import ViteComponents, {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
// 压缩插件
import viteCompression from 'vite-plugin-compression';
// svg插件
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入组件
    Components({
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),
        VantResolver(),
      ],
    }),
    // 压缩插件
    viteCompression(),
    // svg插件
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ]
})
