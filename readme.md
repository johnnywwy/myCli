创建属于自己的脚手架工具

1.

```bash
1、pnpm init
2、pnpm add -D typescript
3、npx tsc --init
```

2.

```bash
创建src目录 创建index.ts 入口文件
```

3.

```bash
pnpm add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json rollup-plugin-typescript2 @rollup/plugin-terser rollup-plugin-node-externals
```

4.

```bash
最外层创建 rollup.config.ts

import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from 'rollup-plugin-typescript2';

引入刚刚安装的依赖
```
