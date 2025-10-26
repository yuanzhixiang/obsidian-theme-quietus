# 发布新版本指南

## 自动化发布流程

这个仓库已经配置了 GitHub Actions，可以自动创建 Release 并上传 `theme.css` 和 `manifest.json`。

## 方式一：使用 npm 命令（推荐）

### 发布补丁版本 (1.0.0 → 1.0.1)

```bash
npm run release
```

这会自动：

1. 更新 `package.json`、`manifest.json` 和 `versions.json` 的版本号
2. 创建 git commit
3. 创建 git tag
4. 推送到 GitHub（触发自动发布）

### 发布小版本 (1.0.0 → 1.1.0)

```bash
npm version minor && git push --follow-tags
```

### 发布大版本 (1.0.0 → 2.0.0)

```bash
npm version major && git push --follow-tags
```

## 方式二：手动发布

### 1. 更新版本号

手动编辑以下文件：

-   `manifest.json` - 更新 `version` 字段
-   `versions.json` - 添加新版本条目
-   `package.json` - 更新 `version` 字段

### 2. 提交更改

```bash
git add manifest.json versions.json package.json
git commit -m "Bump version to 1.0.1"
```

### 3. 创建 tag 并推送

```bash
git tag 1.0.1
git push origin main --tags
```

### 4. GitHub Action 自动执行

一旦 tag 被推送，GitHub Action 会自动：

-   验证 `manifest.json` 中的版本号与 tag 是否匹配
-   创建 GitHub Release
-   上传 `theme.css` 和 `manifest.json` 到 Release

## 验证发布

1. 访问 <https://github.com/yuanzhixiang/obsidian-theme-quietus/releases>
2. 确认新版本已创建
3. 确认 `theme.css` 和 `manifest.json` 已上传

## 故障排除

### 版本不匹配错误

如果看到错误：`Version mismatch! manifest.json has X but tag is Y`

解决方法：

1. 确保 `manifest.json` 中的 `version` 与你创建的 tag 完全一致
2. 删除错误的 tag：`git tag -d X.X.X && git push origin :refs/tags/X.X.X`
3. 修正版本号后重新创建 tag

### Action 未触发

确保：

1. 你推送的是 tag，不只是 commit
2. 使用 `git push --tags` 或 `git push --follow-tags`
3. `.github/workflows/release.yml` 文件在 main 分支中
