import React from 'react';
import { Button, Card, Typography, message } from 'antd';
import { useStore } from '../store/useStore.ts';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const DebugPage: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  
  // 获取当前设置
  const { settings, getSentencesForLearning } = store;
  
  // 获取学习句子
  const learningSentences = getSentencesForLearning();
  
  // 获取所有句子
  const allSentences = store.sentences;
  
  // 按难度统计
  const difficultyStats = allSentences.reduce((acc, s) => {
    acc[s.difficulty] = (acc[s.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 按使用场景统计
  const usageScenarioStats = allSentences.reduce((acc, s) => {
    acc[s.usageScenario] = (acc[s.usageScenario] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 测试学习逻辑
  const testLearningLogic = () => {
    const sentences = getSentencesForLearning();
    message.info(`获取到 ${sentences.length} 个学习句子`);
    
    // 显示前5个句子的详细信息
    const sampleSentences = sentences.slice(0, 5);
    console.log('学习句子样本:', sampleSentences);
    
    // 统计难度分布
    const learningDifficultyStats = sentences.reduce((acc, s) => {
      acc[s.difficulty] = (acc[s.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // 统计使用场景分布
    const learningUsageScenarioStats = sentences.reduce((acc, s) => {
      acc[s.usageScenario] = (acc[s.usageScenario] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('学习句子难度分布:', learningDifficultyStats);
    console.log('学习句子使用场景分布:', learningUsageScenarioStats);
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          style={{ color: 'white' }}
        >
          返回
        </Button>
        <h1 className="app-title">调试页面</h1>
        <div style={{ color: 'white' }}>学习逻辑测试</div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2}>调试信息</Title>
          
          <Card title="用户设置" style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>每日学习目标:</strong> {settings.dailyGoal}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>难度等级选择:</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '8px' }}>
                {Object.entries(settings.difficultyGoals || {}).map(([diff, selected]) => (
                  <div key={diff} style={{ 
                    padding: '8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    backgroundColor: selected ? '#f0f5ff' : 'white'
                  }}>
                    {diff}: {selected ? '✓ 已选择' : '✗ 未选择'}
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>使用场景选择:</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '8px' }}>
                {Object.entries(settings.usageScenarioGoals || {}).map(([scenario, selected]) => (
                  <div key={scenario} style={{ 
                    padding: '8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    backgroundColor: selected ? '#f0f5ff' : 'white'
                  }}>
                    {scenario}: {selected ? '✓ 已选择' : '✗ 未选择'}
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card title="句子统计" style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>总句子数:</strong> {allSentences.length}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>难度分布:</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '8px' }}>
                {Object.entries(difficultyStats).map(([diff, count]) => (
                  <div key={diff} style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    {diff}: {count}句
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>使用场景分布:</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '8px' }}>
                {Object.entries(usageScenarioStats).map(([scenario, count]) => (
                  <div key={scenario} style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    {scenario}: {count}句
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card title="学习逻辑测试" style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>当前学习句子数:</strong> {learningSentences.length}
            </div>
            
            <Button type="primary" onClick={testLearningLogic} style={{ marginBottom: '1rem' }}>
              测试学习逻辑
            </Button>
            
            <Paragraph>
              点击按钮后，请查看浏览器控制台的输出信息，了解学习逻辑的执行情况。
            </Paragraph>
          </Card>
          
          <div className="button-group">
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/')}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '25px',
                padding: '0 2rem'
              }}
            >
              返回首页
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DebugPage; 