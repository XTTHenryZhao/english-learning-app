// 导入React核心库
import React from 'react';
// 导入Ant Design组件库的UI组件
import { Button, Card, Row, Col, Typography, Progress } from 'antd';
// 导入Ant Design图标库中的各种图标
import { BookOutlined, ReloadOutlined, BarChartOutlined, PlayCircleOutlined, SettingOutlined, TrophyOutlined, BranchesOutlined } from '@ant-design/icons';
// 导入React Router的导航钩子
import { useNavigate } from 'react-router-dom';
// 导入自定义的状态管理钩子
import { useStore } from '../store/useStore.ts';

// 从Typography组件中解构出Title和Paragraph组件，用于文本显示
const { Title, Paragraph } = Typography;

// 首页组件：显示应用的主要功能入口和学习进度
const HomePage: React.FC = () => {
  // 获取导航函数，用于页面跳转
  const navigate = useNavigate();
  // 从全局状态中获取学习统计数据、今日学习/复习数量、用户设置等信息
  const { todayLearned, todayReviewed, settings } = useStore();

  // 定义首页功能卡片的数据数组，每个卡片包含图标、标题、描述和点击动作
  const features = [
    {
      icon: <BookOutlined style={{ fontSize: '2rem', color: '#667eea' }} />, // 学习图标，蓝色
      title: '句子学习', // 功能标题
      description: '卡片式学习，轻松掌握英语句子', // 功能描述
      action: () => navigate('/study') // 点击后跳转到学习页面
    },
    {
      icon: <ReloadOutlined style={{ fontSize: '2rem', color: '#764ba2' }} />, // 复习图标，紫色
      title: '智能复习', // 功能标题
      description: '根据记忆曲线，科学安排复习', // 功能描述
      action: () => navigate('/review') // 点击后跳转到复习页面
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '2rem', color: '#f093fb' }} />, // 进度图标，粉色
      title: '学习进度', // 功能标题
      description: '实时跟踪学习进度和掌握情况', // 功能描述
      action: () => navigate('/progress') // 点击后跳转到进度页面
    },
    {
      icon: <SettingOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />, // 设置图标，绿色
      title: '设置', // 功能标题
      description: '个性化设置和学习目标', // 功能描述
      action: () => navigate('/settings') // 点击后跳转到设置页面
    },
    {
      icon: <BookOutlined style={{ fontSize: '2rem', color: '#13c2c2' }} />, // 教材图标，青色
      title: '教材句型', // 功能标题
      description: '同步课堂内容，巩固重点句型', // 功能描述
      action: () => navigate('/textbook') // 点击后跳转到教材句型页面
    },
    {
      icon: <TrophyOutlined style={{ fontSize: '2rem', color: '#fa8c16' }} />, // 奖杯图标，橙色
      title: '考试得分句', // 功能标题
      description: '掌握写作衔接句和阅读长难句', // 功能描述
      action: () => navigate('/exam') // 点击后跳转到考试得分句页面
    },

    {
      icon: <BranchesOutlined style={{ fontSize: '2rem', color: '#13c2c2' }} />, // 分支图标，青色
      title: '句子剖析', // 功能标题
      description: '深度分析复杂句的语法结构和逻辑关系', // 功能描述
      action: () => navigate('/analysis') // 点击后跳转到句子剖析页面
    }
  ];

  // 渲染首页的JSX结构
  return (
    // 应用的主容器
    <div className="app">
      {/* 页面头部区域 */}
      <header className="app-header">
        {/* 应用标题 */}
        <h1 className="app-title">百句斩</h1>
        {/* 应用副标题，包含播放图标 */}
        <div style={{ color: 'white' }}>
          <PlayCircleOutlined style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
          英语句子背诵专家
        </div>
      </header>
      
      {/* 页面主要内容区域 */}
      <main className="app-content">
        {/* 卡片容器，包含所有内容 */}
        <div className="card-container">
          {/* 欢迎标题 */}
          <Title level={2} style={{ marginBottom: '1rem', color: '#333' }}>
            欢迎使用百句斩
          </Title>
          {/* 应用介绍文字 */}
          <Paragraph style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            通过科学的记忆方法，让你轻松掌握英语句子，提升口语表达能力
          </Paragraph>

          {/* 今日学习进度显示区域 */}
          <div style={{ marginBottom: '2rem' }}>
            {/* 进度条上方的文字说明，显示当前进度和每日目标 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>今日学习进度</span>
              {/* 显示今日已学习+复习的数量，以及每日目标（达到后仍可继续学习） */}
              <span>{todayLearned + todayReviewed}/{settings.dailyGoal}（可继续）</span>
            </div>
            {/* 进度条组件，显示学习进度的可视化 */}
            <Progress 
              percent={Math.round(((todayLearned + todayReviewed) / Math.max(settings.dailyGoal,1)) * 1000) / 10} 
              strokeColor="#667eea" 
              status={(todayLearned + todayReviewed) >= settings.dailyGoal ? 'active' : 'normal'}
            />
          </div>

          {/* 功能卡片网格布局 */}
          <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
            {/* 遍历features数组，渲染每个功能卡片 */}
            {features.map((feature, index) => (
              // 响应式列布局：xs=24表示小屏幕占满，sm=8表示中等屏幕占1/3
              <Col xs={24} sm={8} key={index}>
                {/* 可悬停的卡片组件，点击时执行对应动作 */}
                <Card 
                  hoverable 
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={feature.action}
                >
                  {/* 图标容器 */}
                  <div style={{ marginBottom: '1rem' }}>
                    {feature.icon}
                  </div>
                  {/* 功能标题 */}
                  <Title level={4} style={{ marginBottom: '0.5rem' }}>
                    {feature.title}
                  </Title>
                  {/* 功能描述 */}
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>

          {/* 开始学习按钮区域 */}
          <div className="button-group">
            {/* 主要操作按钮，点击后跳转到学习页面 */}
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/study')}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 渐变背景色
                border: 'none', // 无边框
                borderRadius: '25px', // 圆角边框
                padding: '0 2rem', // 左右内边距
                height: '48px' // 按钮高度
              }}
            >
              开始学习
            </Button>
            

          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 