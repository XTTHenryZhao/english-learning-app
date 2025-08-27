// 导入React核心库
import React from 'react';
// 导入路由相关组件
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 导入Ant Design的配置提供者组件
import { ConfigProvider } from 'antd';
// 导入中文语言包，用于国际化
import zhCN from 'antd/locale/zh_CN';
// 导入各个页面组件
import HomePage from './pages/HomePage.tsx';        // 首页
import StudyPage from './pages/StudyPage.tsx';      // 学习页面
import ReviewPage from './pages/ReviewPage.tsx';    // 复习页面
import ProgressPage from './pages/ProgressPage.tsx'; // 进度页面
import SettingsPage from './pages/SettingsPage.tsx'; // 设置页面
import TestPage from './pages/TestPage.tsx'; // 测试页面
import DebugPage from './pages/DebugPage.tsx'; // 调试页面
import TextbookPage from './pages/TextbookPage.tsx'; // 教材句型页面
import ExamPage from './pages/ExamPage.tsx'; // 考试得分句页面

import AnalysisPage from './pages/AnalysisPage.tsx'; // 句子剖析页面
// 导入全局提醒组件
import GlobalReminder from './components/GlobalReminder.tsx';
// 导入应用的样式文件
import './App.css';
import { useStore } from './store/useStore.ts';

// 主应用组件：定义整个应用的路由结构和全局配置
const App: React.FC = () => {
  // 启动时同步一次句子目录，确保调整目标后仍能继续学习
  React.useEffect(() => {
    try { useStore.getState().syncSentenceCatalog(); } catch {}
  }, []);
  return (
    // ConfigProvider 提供Ant Design组件的全局配置，这里设置为中文
    <ConfigProvider locale={zhCN}>
      {/* Router组件包装整个应用，提供路由功能 */}
      <Router>
        {/* 应用的主容器 */}
        <div className="app">
          {/* 定义应用的路由规则 */}
          <Routes>
            {/* 首页路由 - 访问根路径时显示 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 学习页面路由 */}
            <Route path="/study" element={<StudyPage />} />
            
            {/* 复习页面路由 */}
            <Route path="/review" element={<ReviewPage />} />
            
            {/* 进度页面路由 */}
            <Route path="/progress" element={<ProgressPage />} />
            
            {/* 设置页面路由 */}
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* 测试页面路由 */}
            <Route path="/test" element={<TestPage />} />
            
            {/* 调试页面路由 */}
            <Route path="/debug" element={<DebugPage />} />
            
            {/* 教材句型页面路由 */}
            <Route path="/textbook" element={<TextbookPage />} />
            
            {/* 考试得分句页面路由 */}
            <Route path="/exam" element={<ExamPage />} />
            

            
            {/* 句子剖析页面路由 */}
            <Route path="/analysis" element={<AnalysisPage />} />
          </Routes>
          
          {/* 全局提醒组件，显示学习提醒 */}
          <GlobalReminder />
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App; 