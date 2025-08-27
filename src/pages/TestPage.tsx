import React from 'react';
import { useStore } from '../store/useStore.ts';

const TestPage: React.FC = () => {
  const store = useStore();
  
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>测试页面</h1>
      <p>句子数量: {store.sentences.length}</p>
      <p>学习统计: {JSON.stringify(store.learningStats)}</p>
      <p>设置: {JSON.stringify(store.settings)}</p>
      <p>今日学习: {store.todayLearned}</p>
      <p>今日复习: {store.todayReviewed}</p>
    </div>
  );
};

export default TestPage; 