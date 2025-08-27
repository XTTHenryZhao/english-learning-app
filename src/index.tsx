// 导入React核心库
import React from 'react';
// 导入ReactDOM，用于将React组件渲染到DOM
import ReactDOM from 'react-dom/client';
// 导入应用的样式文件
import './index.css';
// 导入主应用组件
import App from './App.tsx';
// 获取根DOM元素，这是React应用挂载的容器
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 渲染React应用到根DOM元素
root.render(
  // React.StrictMode 是一个开发模式下的包装器，用于检测潜在问题
  <React.StrictMode>
    {/* 渲染主应用组件 */}
    <App />
  </React.StrictMode>
); 