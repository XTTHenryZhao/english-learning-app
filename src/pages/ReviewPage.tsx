// 导入React核心库和状态管理钩子
import React, { useState } from 'react';
// 导入Ant Design组件库的UI组件
import { Button, Card, Progress, Typography, Space, message, Tag } from 'antd';
// 导入Ant Design图标库中的各种图标
import { ArrowLeftOutlined, SoundOutlined, CheckOutlined, CloseOutlined, ClockCircleOutlined } from '@ant-design/icons';
// 导入React Router的导航钩子
import { useNavigate } from 'react-router-dom';
// 导入自定义的状态管理钩子
import { useStore } from '../store/useStore.ts';
// 导入音频播放工具
import { audioPlayer } from '../utils/audioUtils.ts';

// 从Typography组件中解构出Title和Paragraph组件，用于文本显示
const { Title, Paragraph } = Typography;

// 复习页面组件：用于复习已学习的英语句子
const ReviewPage: React.FC = () => {
  // 获取导航函数，用于页面跳转
  const navigate = useNavigate();
  // 当前复习的句子索引，从0开始
  const [currentIndex, setCurrentIndex] = useState(0);
  // 是否显示中文翻译的状态
  const [showTranslation, setShowTranslation] = useState(false);
  
  // 从全局状态中获取复习相关的方法和数据
  const { 
    getSentencesForReview,      // 获取需要复习的句子列表
    markSentenceAsReviewed,     // 标记句子为已复习
    todayReviewed               // 今日已复习的句子数量
  } = useStore();
  
  // 获取需要复习的句子列表
  const reviewSentences = getSentencesForReview();
  // 今日已复习的句子数量
  const reviewedCount = todayReviewed;

  // 当前正在复习的句子对象
  const currentSentence = reviewSentences[currentIndex];
  // 当复习列表长度变化时，避免索引越界
  React.useEffect(() => {
    if (reviewSentences.length === 0) return;
    if (currentIndex >= reviewSentences.length) {
      setCurrentIndex(Math.max(0, reviewSentences.length - 1));
      setShowTranslation(false);
    }
  }, [reviewSentences.length, currentIndex]);
  // 计算复习进度百分比
  const progress = reviewSentences.length > 0 ? ((currentIndex + 1) / reviewSentences.length) * 100 : 0;

  // 处理"记得"按钮点击事件
  const handleRemember = () => {
    if (currentSentence) {
      // 将当前句子标记为已复习，并标记为记得（true）
      markSentenceAsReviewed(currentSentence.id, true);
    }
    // 跳转到下一个句子
    nextSentence();
  };

  // 处理"忘记了"按钮点击事件
  const handleForgot = () => {
    if (currentSentence) {
      // 将当前句子标记为已复习，并标记为忘记（false）
      markSentenceAsReviewed(currentSentence.id, false);
    }
    // 跳转到下一个句子
    nextSentence();
  };

  // 跳转到下一个句子的函数
  const nextSentence = () => {
    if (currentIndex < reviewSentences.length - 1) {
      // 如果还有更多句子，更新索引并隐藏翻译
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
    } else {
      // 已到最后一条，停留在最后，不弹提示
      setCurrentIndex(Math.max(0, reviewSentences.length - 1));
      setShowTranslation(false);
    }
  };

  // 返回上一句
  const prevSentence = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  // 如果没有句子可复习，显示提示
  if (reviewSentences.length === 0) {
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
          <h1 className="app-title">智能复习</h1>
          <div style={{ color: 'white' }}>
            暂无复习内容
          </div>
        </header>

        <main className="app-content">
          <div className="card-container">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
              太棒了！🎉
            </Title>
            <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>
              目前没有需要复习的句子，继续学习新句子吧！
            </Paragraph>
            <div className="button-group">
              <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/study')}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0 2rem'
                }}
              >
                开始学习
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

  // 测试音频功能的函数
  const testAudio = async () => {
    try {
      const success = await audioPlayer.testAudio();
      if (success) {
        message.success('音频测试成功！');
      } else {
        message.error('音频测试失败，请检查浏览器设置');
      }
    } catch (error) {
      message.error('音频测试出错');
      console.error('Audio test error:', error);
    }
  };

  // 根据掌握度返回对应的颜色，用于视觉化显示
  const getMasteryColor = (level: number) => {
    if (level >= 80) return '#52c41a';    // 80%以上显示绿色（掌握良好）
    if (level >= 60) return '#fa8c16';    // 60-79%显示橙色（需要加强）
    return '#ff4d4f';                     // 60%以下显示红色（需要重点复习）
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
        <h1 className="app-title">智能复习</h1>
        <div style={{ color: 'white' }}>
          复习: {currentIndex + 1}/{reviewSentences.length}
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>复习进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress percent={progress} strokeColor="#667eea" />
          </div>

          <Card className="sentence-card">
            {!currentSentence ? (
              <Paragraph style={{ textAlign: 'center', color: '#666' }}>暂无可复习的句子</Paragraph>
            ) : (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <Space wrap>
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
                      background: currentSentence.difficulty === 'easy' ? '#e6f7ff' : 
                                 currentSentence.difficulty === 'medium' ? '#fff7e6' : '#fff2f0',
                      color: currentSentence.difficulty === 'easy' ? '#1890ff' : 
                             currentSentence.difficulty === 'medium' ? '#fa8c16' : '#ff4d4f',
                      borderRadius: '12px',
                      fontSize: '0.9rem'
                    }}>
                      {currentSentence.difficulty === 'easy' ? '简单' : 
                       currentSentence.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                    <Tag color={getMasteryColor(currentSentence.masteryLevel)}>
                      掌握度: {currentSentence.masteryLevel}%
                    </Tag>
                  </Space>
                </div>
              </>
            )}

            <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
              {currentSentence && (
                <>
                  <Space>
                    <ClockCircleOutlined />
                    上次复习: {currentSentence.lastReviewDate}
                  </Space>
                  <span style={{ marginLeft: '1rem' }}>
                    复习次数: {currentSentence.reviewCount}
                  </span>
                </>
              )}
            </div>

            {currentSentence && (
              <>
                <Title level={2} className="sentence-text">
                  {currentSentence.english}
                </Title>

                <div style={{ marginBottom: '1rem' }}>
                  <Button 
                    type="text" 
                    icon={<SoundOutlined />} 
                    onClick={playAudio}
                    style={{ marginRight: '0.5rem' }}
                  >
                    播放音频
                  </Button>
                  <Button 
                    type="dashed" 
                    size="small"
                    onClick={testAudio}
                  >
                    测试音频
                  </Button>
                </div>
              </>
            )}

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
              <Button onClick={prevSentence} style={{ borderRadius: '25px', padding: '0 1.25rem' }} disabled={currentIndex === 0}>
                上一句
              </Button>
              <Button 
                type="primary" 
                icon={<CheckOutlined />}
                onClick={handleRemember}
                style={{ 
                  background: '#52c41a',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0 2rem'
                }}
              >
                记得
              </Button>
              <Button 
                icon={<CloseOutlined />}
                onClick={handleForgot}
                style={{ 
                  borderRadius: '25px',
                  padding: '0 2rem'
                }}
              >
                忘记了
              </Button>
            </div>
          </Card>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Paragraph style={{ color: '#666' }}>
              已复习: {reviewedCount} 个句子
            </Paragraph>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage; 