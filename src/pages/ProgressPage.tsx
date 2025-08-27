// 导入React核心库
import React from 'react';
// 导入Ant Design组件库的UI组件
import { Button, Card, Row, Col, Typography, Progress, Statistic, List, Tag } from 'antd';
// 导入Ant Design图标库中的各种图标
import { ArrowLeftOutlined, TrophyOutlined, FireOutlined, CalendarOutlined, BookOutlined } from '@ant-design/icons';
// 导入React Router的导航钩子
import { useNavigate } from 'react-router-dom';
// 导入自定义的状态管理钩子
import { useStore } from '../store/useStore.ts';

// 从Typography组件中解构出Title和Paragraph组件，用于文本显示
const { Title, Paragraph } = Typography;

// 定义最近活动数据的接口类型
interface RecentActivity {
  id: number;                    // 活动ID
  type: 'learn' | 'review';      // 活动类型：学习或复习
  sentence: string;              // 句子内容
  date: string;                  // 活动时间
  result: 'success' | 'fail';    // 活动结果：成功或失败
}

// 进度页面组件：显示学习统计数据和进度信息
const ProgressPage: React.FC = () => {
  // 获取导航函数，用于页面跳转
  const navigate = useNavigate();
  // 从全局状态中获取学习统计数据
  const { learningStats } = useStore();

  // 模拟最近活动数据，实际应用中应该从状态管理或API获取
  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'learn', // 学习活动
      sentence: "How are you doing today?", // 英语句子
      date: '2024-01-15 14:30', // 活动时间
      result: 'success' // 学习成功
    },
    {
      id: 2,
      type: 'review', // 复习活动
      sentence: "I would like to make a reservation for dinner.", // 英语句子
      date: '2024-01-15 14:25', // 活动时间
      result: 'success' // 复习成功
    },
    {
      id: 3,
      type: 'learn', // 学习活动
      sentence: "Could you please help me with this problem?", // 英语句子
      date: '2024-01-15 14:20', // 活动时间
      result: 'fail' // 学习失败
    }
  ];

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
        <h1 className="app-title">学习进度</h1>
        <div style={{ color: 'white' }}>
          <TrophyOutlined style={{ marginRight: '0.5rem' }} />
          学习达人
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            学习统计
          </Title>

          <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
            <Col xs={12} sm={8}>
              <Card>
                <Statistic
                  title="总句子数"
                  value={learningStats.totalSentences}
                  prefix={<BookOutlined />}
                  valueStyle={{ color: '#667eea' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card>
                <Statistic
                  title="已掌握"
                  value={learningStats.learnedSentences}
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card>
                <Statistic
                  title="连续学习"
                  value={learningStats.streakDays}
                  prefix={<FireOutlined />}
                  suffix="天"
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
            <Col xs={24} sm={12}>
              <Card title="学习进度">
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>掌握进度</span>
                    <span>{Math.round((learningStats.learnedSentences / learningStats.totalSentences) * 100)}%</span>
                  </div>
                  <Progress 
                    percent={Math.round((learningStats.learnedSentences / learningStats.totalSentences) * 100)} 
                    strokeColor="#667eea" 
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>平均掌握度</span>
                    <span>{learningStats.averageMastery}%</span>
                  </div>
                  <Progress 
                    percent={learningStats.averageMastery} 
                    strokeColor={getMasteryColor(learningStats.averageMastery)} 
                  />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="学习时间">
                <Statistic
                  title="总学习时间"
                  value={learningStats.totalStudyTime}
                  suffix="分钟"
                  valueStyle={{ color: '#1890ff' }}
                />
                <div style={{ marginTop: '1rem' }}>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    平均每天: {Math.round(learningStats.totalStudyTime / learningStats.streakDays)} 分钟
                  </Paragraph>
                </div>
              </Card>
            </Col>
          </Row>

          <Card title="最近活动" style={{ marginBottom: '2rem' }}>
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%',
                        background: item.type === 'learn' ? '#e6f7ff' : '#fff7e6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.type === 'learn' ? '#1890ff' : '#fa8c16'
                      }}>
                        {item.type === 'learn' ? <BookOutlined /> : <CalendarOutlined />}
                      </div>
                    }
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{item.sentence}</span>
                        <Tag color={item.result === 'success' ? 'green' : 'red'}>
                          {item.result === 'success' ? '成功' : '失败'}
                        </Tag>
                      </div>
                    }
                    description={item.date}
                  />
                </List.Item>
              )}
            />
          </Card>

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
              继续学习
            </Button>
            <Button 
              size="large"
              onClick={() => navigate('/review')}
              style={{ 
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
};

export default ProgressPage; 