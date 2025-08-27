@echo off
echo ========================================
echo 百句斩 - GitHub部署助手
echo ========================================
echo.

echo 正在检查Git是否已安装...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git未安装，请先安装Git: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git已安装

echo.
echo 请输入你的GitHub用户名:
set /p github_username=

echo.
echo 请输入你的GitHub仓库名:
set /p repo_name=

echo.
echo 正在初始化Git仓库...
git init

echo 正在添加所有文件...
git add .

echo 正在提交更改...
git commit -m "Initial commit: 百句斩英语学习应用"

echo 正在添加远程仓库...
git remote add origin https://github.com/%github_username%/%repo_name%.git

echo 正在推送到GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo ✅ 部署到GitHub完成！
echo ========================================
echo.
echo 接下来请：
echo 1. 访问 https://vercel.com
echo 2. 注册/登录账号
echo 3. 点击 "New Project"
echo 4. 选择你的GitHub仓库
echo 5. 点击 "Deploy"
echo.
echo 你的GitHub仓库地址：
echo https://github.com/%github_username%/%repo_name%
echo.
pause 