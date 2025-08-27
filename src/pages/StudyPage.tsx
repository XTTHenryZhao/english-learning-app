// 导入React核心库和状态管理钩子
import React, { useState, useEffect } from 'react';
// 导入Ant Design组件库的UI组件
import { Button, Card, Progress, Typography, Space, message } from 'antd';
// 导入Ant Design图标库中的各种图标
import { ArrowLeftOutlined, SoundOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
// 导入React Router的导航钩子
import { useNavigate } from 'react-router-dom';
// 导入自定义的状态管理钩子
import { useStore, Sentence } from '../store/useStore.ts';
// 导入音频播放工具
import { audioPlayer } from '../utils/audioUtils.ts';

// 从Typography组件中解构出Title和Paragraph组件，用于文本显示
const { Title, Paragraph } = Typography;

// 学习页面组件：用于学习新的英语句子
const StudyPage: React.FC = () => {
  // 获取导航函数，用于页面跳转
  const navigate = useNavigate();
  // 当前学习的句子索引，从0开始
  const [currentIndex, setCurrentIndex] = useState(0);
  // 是否显示中文翻译的状态
  const [showTranslation, setShowTranslation] = useState(false);
  // 学习历史记录：记录用户实际学习过的句子ID顺序
  const [learningHistory, setLearningHistory] = useState<number[]>([]);
  // 当前学习队列中的句子
  const [currentLearningQueue, setCurrentLearningQueue] = useState<Sentence[]>([]);
  // 今日已学习的句子数量（从store获取）
  const [todayLearnedCount, setTodayLearnedCount] = useState(0);
  
  // 从全局状态中获取学习相关的方法和数据
  const { 
    getSentencesForLearning,      // 获取待学习的句子列表
    getNextSentenceForLearning,   // 获取下一句待学习的句子
    hasMoreSentencesToLearn,      // 检查是否还有句子需要学习
    markSentenceAsLearned,        // 标记句子为已学会
    todayLearned,                 // 今日已学会的句子数量
    settings                      // 用户设置
  } = useStore();
  
  // 初始化学习队列和学习进度
  useEffect(() => {
    initializeLearningSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // 初始化学习会话
  const initializeLearningSession = () => {
    // 从localStorage获取今日的学习进度
    const today = new Date().toDateString();
    const storedProgress = localStorage.getItem(`studyProgress_${today}`);
    
    if (storedProgress) {
      try {
        const progress = JSON.parse(storedProgress);
        setCurrentLearningQueue(progress.queue || []);
        setCurrentIndex(progress.currentIndex || 0);
        setLearningHistory(progress.learningHistory || []);
        setTodayLearnedCount(progress.todayLearned || 0);
        
        // 如果存储的队列为空，重新获取
        if (progress.queue && progress.queue.length > 0) {
          return;
        }
      } catch (error) {
        console.error('解析学习进度失败:', error);
      }
    }
    
    // 如果没有存储的进度或队列为空，重新获取句子
    const sentences = getSentencesForLearning();
    setCurrentLearningQueue(sentences);
    setCurrentIndex(0);
    setLearningHistory([]);
    setTodayLearnedCount(todayLearned);
    
    // 保存初始进度
    saveLearningProgress(sentences, 0, [], todayLearned);
  };
  
  // 保存学习进度到localStorage
  const saveLearningProgress = (queue: Sentence[], index: number, history: number[], learned: number) => {
    const today = new Date().toDateString();
    const progress = {
      queue,
      currentIndex: index,
      learningHistory: history,
      todayLearned: learned,
      timestamp: Date.now()
    };
    
    try {
      localStorage.setItem(`studyProgress_${today}`, JSON.stringify(progress));
    } catch (error) {
      console.error('保存学习进度失败:', error);
    }
  };
  
  // 更新今日已学习数量
  useEffect(() => {
    setTodayLearnedCount(todayLearned);
  }, [todayLearned]);
  
  // 当句子数量变化时，避免索引越界
  useEffect(() => {
    if (currentLearningQueue.length === 0) return;
    if (currentIndex >= currentLearningQueue.length) {
      setCurrentIndex(Math.max(0, currentLearningQueue.length - 1));
      setShowTranslation(false);
    }
  }, [currentLearningQueue.length, currentIndex]);
  
  // 计算学习进度百分比，考虑今日已学习的句子
  const calculateProgress = () => {
    if (currentLearningQueue.length === 0) return 0;
    
    // 计算当前队列中的进度
    const queueProgress = (currentIndex + 1) / currentLearningQueue.length;
    
    // 计算今日总体进度（包括已学习的句子）
    const totalTodayProgress = (todayLearnedCount + currentIndex + 1) / Math.max(settings.dailyGoal, 1);
    
    // 返回当前队列进度和今日总体进度的加权平均
    const weightedProgress = (queueProgress * 0.7) + (Math.min(totalTodayProgress, 1) * 0.3);
    
    return Math.round(weightedProgress * 1000) / 10;
  };
  
  const progress = calculateProgress();

  // 当前正在学习的句子对象
  const currentSentence = currentLearningQueue[currentIndex];
  
  // 处理"我认识"按钮点击事件
  const handleKnow = () => {
    if (currentSentence) {
      // 将当前句子标记为已学会
      markSentenceAsLearned(currentSentence.id);
      // 将当前句子ID添加到学习历史记录
      const newHistory = [...learningHistory, currentSentence.id];
      setLearningHistory(newHistory);
      
      // 更新今日已学习数量
      const newTodayLearned = todayLearnedCount + 1;
      setTodayLearnedCount(newTodayLearned);
      
      // 保存进度
      saveLearningProgress(currentLearningQueue, currentIndex, newHistory, newTodayLearned);
    }
    // 跳转到下一个句子
    nextSentence();
  };

  // 处理"不认识"按钮点击事件
  const handleDontKnow = () => {
    if (currentSentence) {
      // 即使不认识，也要记录到学习历史中
      const newHistory = [...learningHistory, currentSentence.id];
      setLearningHistory(newHistory);
      
      // 保存进度
      saveLearningProgress(currentLearningQueue, currentIndex, newHistory, todayLearnedCount);
    }
    // 直接跳转到下一句，不弹出提示
    nextSentence();
  };

  // 跳转到下一个句子的函数
  const nextSentence = () => {
    if (currentIndex < currentLearningQueue.length - 1) {
      // 如果还有更多句子，更新索引并隐藏翻译
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setShowTranslation(false);
      
      // 保存进度
      saveLearningProgress(currentLearningQueue, newIndex, learningHistory, todayLearnedCount);
    } else {
      // 如果学完当前队列，尝试获取新的句子
      const nextSentence = getNextSentenceForLearning();
      if (nextSentence) {
        // 将新句子添加到队列末尾
        const newQueue = [...currentLearningQueue, nextSentence];
        const newIndex = currentIndex + 1;
        setCurrentLearningQueue(newQueue);
        setCurrentIndex(newIndex);
        setShowTranslation(false);
        
        // 保存进度
        saveLearningProgress(newQueue, newIndex, learningHistory, todayLearnedCount);
      } else {
        // 如果没有更多句子，留在最后一条
        const newIndex = Math.max(0, currentLearningQueue.length - 1);
        setCurrentIndex(newIndex);
        setShowTranslation(false);
        
        // 保存进度
        saveLearningProgress(currentLearningQueue, newIndex, learningHistory, todayLearnedCount);
      }
    }
  };

  // 返回上一句 - 修复后的逻辑
  const prevSentence = () => {
    if (learningHistory.length > 1 && currentIndex > 0) {
      // 直接返回上一句
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setShowTranslation(false);
      
      // 从学习历史中移除当前句子
      const newHistory = learningHistory.slice(0, -1);
      setLearningHistory(newHistory);
      
      // 保存进度
      saveLearningProgress(currentLearningQueue, newIndex, newHistory, todayLearnedCount);
    }
  };

  // 如果没有句子可学习，显示提示
  if (currentLearningQueue.length === 0 || !hasMoreSentencesToLearn()) {
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
          <h1 className="app-title">句子学习</h1>
          <div style={{ color: 'white' }}>
            已完成所有句子
          </div>
        </header>

        <main className="app-content">
          <div className="card-container">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
              太棒了！🎉
            </Title>
            <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>
              你已经完成了所有新句子的学习！
            </Paragraph>
            <div className="button-group">
              <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/review')}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0 2rem'
                }}
              >
                开始复习
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 播放音频的函数，用于朗读英语句子
  const playAudio = async () => {
    // 检查浏览器是否支持语音合成功能
    if (!audioPlayer.isSupported()) {
      message.error('您的浏览器不支持语音合成功能');
      return;
    }
    
    try {
      // 播放当前句子的英语音频
      await audioPlayer.playText(currentSentence.english);
    } catch (error) {
      // 如果播放失败，显示错误提示
      message.error('播放音频失败');
      console.error('Audio playback error:', error);
    }
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
        <h1 className="app-title">句子学习</h1>
        <div style={{ color: 'white' }}>
          进度: {currentIndex + 1}/{currentLearningQueue.length}
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>学习进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress percent={progress} strokeColor="#667eea" />
            
            {/* 显示今日学习统计 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              <span>今日目标: {settings.dailyGoal} 句</span>
              <span>已学习: {todayLearnedCount} 句</span>
              <span>当前队列: {currentIndex + 1}/{currentLearningQueue.length} 句</span>
            </div>
          </div>

          <Card className="sentence-card">
            {!currentSentence ? (
              <Paragraph style={{ textAlign: 'center', color: '#666' }}>暂无可学习的句子</Paragraph>
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <Space>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: '#f0f0f0', 
                      borderRadius: '12px',
                      fontSize: '0.9rem'
                    }}>
                      {currentSentence.category}
                    </span>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: currentSentence.difficulty === '青铜' ? '#e6f7ff' : 
                                 currentSentence.difficulty === '白银' ? '#fff7e6' : 
                                 currentSentence.difficulty === '黄金' ? '#fffbe6' : '#fff2f0',
                      color: currentSentence.difficulty === '青铜' ? '#1890ff' : 
                             currentSentence.difficulty === '白银' ? '#fa8c16' : 
                             currentSentence.difficulty === '黄金' ? '#faad14' : '#ff4d4f',
                      borderRadius: '12px',
                      fontSize: '0.9rem'
                    }}>
                      {currentSentence.difficulty}
                    </span>
                  </Space>
                </div>

                <Title level={2} className="sentence-text">
                  {currentSentence.english}
                </Title>
              </>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <Button 
                type="text" 
                icon={<SoundOutlined />} 
                onClick={playAudio}
                disabled={!currentSentence}
                style={{ marginRight: '0.5rem' }}
              >
                播放音频
              </Button>

            </div>

            {showTranslation ? (
              <Paragraph className="sentence-translation">
                {currentSentence.chinese}
              </Paragraph>
            ) : (
              <Button 
                type="dashed" 
                onClick={() => setShowTranslation(true)}
                style={{ marginBottom: '1rem' }}
              >
                显示翻译
              </Button>
            )}

            <div className="button-group">
              <Button onClick={prevSentence} style={{ borderRadius: '25px', padding: '0 1.25rem' }} disabled={learningHistory.length <= 1}>
                上一句
              </Button>
              <Button 
                type="primary" 
                icon={<CheckOutlined />}
                onClick={handleKnow}
                style={{ 
                  background: '#52c41a',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0 2rem'
                }}
              >
                我认识
              </Button>
              <Button 
                icon={<CloseOutlined />}
                onClick={handleDontKnow}
                style={{ 
                  borderRadius: '25px',
                  padding: '0 2rem'
                }}
              >
                不认识
              </Button>
            </div>
          </Card>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Paragraph style={{ color: '#666' }}>
              已掌握: {todayLearnedCount} 个句子
            </Paragraph>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyPage; 