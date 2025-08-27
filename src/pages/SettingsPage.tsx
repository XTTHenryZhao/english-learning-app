// 导入React核心库和状态管理钩子
import React, { useState } from 'react';
// 导入Ant Design组件库的UI组件
import { Button, Card, Typography, Switch, InputNumber, Select, Divider, message } from 'antd';
// 导入Ant Design图标库中的各种图标
import { ArrowLeftOutlined, SettingOutlined, SoundOutlined, TranslationOutlined, BellOutlined } from '@ant-design/icons';
// 导入React Router的导航钩子
import { useNavigate } from 'react-router-dom';
// 导入自定义的状态管理钩子
import { useStore } from '../store/useStore.ts';
// 导入学习提醒组件
import StudyReminderComponent from '../components/StudyReminder.tsx';
// 导入AI音频设置组件
// import AudioSettings from '../components/AudioSettings';

// 从Typography组件中解构出Title和Paragraph组件，用于文本显示
const { Title, Paragraph } = Typography;
// 从Select组件中解构出Option组件，用于下拉选择
const { Option } = Select;

// 设置页面组件：用于配置应用的各种设置选项
const SettingsPage: React.FC = () => {
  // 获取导航函数，用于页面跳转
  const navigate = useNavigate();
  // 从全局状态中获取设置数据、更新设置方法、重置进度方法
  const { settings, updateSettings, resetDailyProgress } = useStore();
  // 控制学习提醒设置弹窗的显示状态
  const [reminderVisible, setReminderVisible] = useState(false);


  // 清除学习进度缓存的函数
  const clearStudyProgressCache = () => {
    const today = new Date().toDateString();
    localStorage.removeItem(`studyProgress_${today}`);
  };

  // 处理每日学习目标变化的函数
  const handleDailyGoalChange = (value: number | null) => {
    if (value && value > 0) {
      // 更新每日学习目标设置
      updateSettings({ dailyGoal: value });
      // 清除学习进度缓存，让新的设置生效
      clearStudyProgressCache();
      // 显示成功提示消息
      message.success('每日目标已更新，学习队列已刷新');
    }
  };

  // 处理自动播放设置变化的函数
  const handleAutoPlayChange = (checked: boolean) => {
    // 更新自动播放设置
    updateSettings({ autoPlay: checked });
    // 显示设置状态变化的提示消息
    message.success(`自动播放已${checked ? '开启' : '关闭'}`);
  };

  // 处理翻译显示设置变化的函数
  const handleShowTranslationChange = (checked: boolean) => {
    // 更新翻译显示设置
    updateSettings({ showTranslation: checked });
    // 显示设置状态变化的提示消息
    message.success(`翻译显示已${checked ? '开启' : '关闭'}`);
  };

  // 处理主题设置变化的函数
  const handleThemeChange = (value: 'light' | 'dark') => {
    // 更新主题设置
    updateSettings({ theme: value });
    // 显示成功提示消息
    message.success('主题已更新');
  };

  // 处理重置今日进度的函数
  const handleResetProgress = () => {
    // 重置今日学习进度
    resetDailyProgress();
    // 清除学习进度缓存
    const today = new Date().toDateString();
    localStorage.removeItem(`studyProgress_${today}`);
    // 显示成功提示消息
    message.success('今日进度已重置，学习队列已刷新');
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
        <h1 className="app-title">设置</h1>
        <div style={{ color: 'white' }}>
          <SettingOutlined style={{ marginRight: '0.5rem' }} />
          个性化设置
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            应用设置
          </Title>

          <Card title="学习目标" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span style={{ marginRight: '0.5rem', color: '#667eea' }}>🎯</span>
                <span>每日学习目标</span>
              </div>
              <InputNumber
                min={1}
                max={1000}
                value={settings.dailyGoal}
                onChange={handleDailyGoalChange}
                style={{ width: 120 }}
              />
            </div>
            <Paragraph style={{ color: '#666', marginTop: '0.5rem', marginBottom: '1rem' }}>
              设置每天要学习的句子数量
            </Paragraph>
            
            <Divider />
            
            {/* 难度等级选择 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Title level={4} style={{ marginBottom: '1rem', color: '#333' }}>
                📚 难度等级选择
              </Title>
              <Paragraph style={{ color: '#666', marginBottom: '1rem' }}>
                选择你想要学习的句子难度等级，系统会提供相应难度的句子
              </Paragraph>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {['青铜', '白银', '黄金', '钻石'].map((diff) => {
                  const val = settings.difficultyGoals?.[diff] || false;
                  return (
                    <Card 
                      key={diff} 
                      size="small" 
                      style={{ 
                        border: val ? '2px solid #667eea' : '1px solid #d9d9d9',
                        backgroundColor: val ? '#f0f5ff' : 'white',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        updateSettings({ 
                          difficultyGoals: { 
                            ...(settings.difficultyGoals || {}), 
                            [diff]: !val 
                          } 
                        });
                        clearStudyProgressCache();
                        message.success('难度设置已更新，学习队列已刷新');
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold', 
                          color: val ? '#667eea' : '#666',
                          marginBottom: '0.5rem'
                        }}>
                          {diff}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#999' }}>
                          {val ? '✓ 已选择' : '点击选择'}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            {/* 使用场景选择 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Title level={4} style={{ marginBottom: '1rem', color: '#333' }}>
                🌍 使用场景选择
              </Title>
              <Paragraph style={{ color: '#666', marginBottom: '1rem' }}>
                选择你感兴趣的使用场景，系统会提供相应场景的句子
              </Paragraph>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {['日常交流', '商务会议', '餐饮服务', '社交礼仪', '旅游出行', '学习教育', '情感表达', '科技数码', '健康生活', '学术研究'].map((scenario) => {
                  const val = settings.usageScenarioGoals?.[scenario] || false;
                  return (
                    <Card 
                      key={scenario} 
                      size="small" 
                      style={{ 
                        border: val ? '2px solid #667eea' : '1px solid #d9d9d9',
                        backgroundColor: val ? '#f0f5ff' : 'white',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        updateSettings({ 
                          usageScenarioGoals: { 
                            ...(settings.usageScenarioGoals || {}), 
                            [scenario]: !val 
                          } 
                        });
                        clearStudyProgressCache();
                        message.success('场景设置已更新，学习队列已刷新');
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          color: val ? '#667eea' : '#666',
                          marginBottom: '0.5rem'
                        }}>
                          {scenario}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#999' }}>
                          {val ? '✓ 已选择' : '点击选择'}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <Divider />
            
            {/* 快速设置按钮 */}
            <div style={{ marginBottom: '1rem' }}>
              <Title level={5} style={{ marginBottom: '0.5rem', color: '#333' }}>
                ⚡ 快速设置
              </Title>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button 
                  size="small" 
                  onClick={() => {
                    const newDifficultyGoals = { '青铜': true, '白银': true, '黄金': true, '钻石': true };
                    updateSettings({ difficultyGoals: newDifficultyGoals });
                    clearStudyProgressCache();
                    message.success('已设置均衡难度学习目标，学习队列已刷新');
                  }}
                >
                  均衡难度
                </Button>
                <Button 
                  size="small" 
                  onClick={() => {
                    const newDifficultyGoals = { '青铜': true, '白银': true, '黄金': false, '钻石': false };
                    updateSettings({ difficultyGoals: newDifficultyGoals });
                    clearStudyProgressCache();
                    message.success('已设置初级学习目标，学习队列已刷新');
                  }}
                >
                  初级学习
                </Button>
                <Button 
                  size="small" 
                  onClick={() => {
                    const newDifficultyGoals = { '青铜': false, '白银': false, '黄金': true, '钻石': true };
                    updateSettings({ difficultyGoals: newDifficultyGoals });
                    clearStudyProgressCache();
                    message.success('已设置高级学习目标，学习队列已刷新');
                  }}
                >
                  高级学习
                </Button>
                <Button 
                  size="small" 
                  onClick={() => {
                    const newDifficultyGoals = { '青铜': false, '白银': false, '黄金': false, '钻石': false };
                    const newUsageScenarioGoals = { '日常交流': false, '商务会议': false, '餐饮服务': false, '社交礼仪': false, '旅游出行': false, '学习教育': false, '情感表达': false, '科技数码': false, '健康生活': false, '学术研究': false, '商务策略': false, '高级学术': false, '高级商务': false, '高级表达': false };
                    updateSettings({ 
                      difficultyGoals: newDifficultyGoals,
                      usageScenarioGoals: newUsageScenarioGoals
                    });
                    clearStudyProgressCache();
                    message.success('已重置所有学习目标，学习队列已刷新');
                  }}
                >
                  重置目标
                </Button>
              </div>
            </div>
            
            <Paragraph style={{ color: '#999', marginTop: 8, textAlign: 'center' }}>
              💡 系统会按优先级：难度等级 {'>'} 使用场景来选择句子，不足部分用其他未学句子补足到每日总目标
            </Paragraph>
          </Card>

          <Card title="学习体验" style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <SoundOutlined style={{ marginRight: '0.5rem', color: '#667eea' }} />
                  <span>自动播放音频</span>
                </div>
                <Switch 
                  checked={settings.autoPlay} 
                  onChange={handleAutoPlayChange}
                />
              </div>
              <Paragraph style={{ color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                学习时自动播放句子音频
              </Paragraph>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <TranslationOutlined style={{ marginRight: '0.5rem', color: '#667eea' }} />
                  <span>默认显示翻译</span>
                </div>
                <Switch 
                  checked={settings.showTranslation} 
                  onChange={handleShowTranslationChange}
                />
              </div>
              <Paragraph style={{ color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                学习时默认显示中文翻译
              </Paragraph>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>主题设置</span>
                <Select
                  value={settings.theme}
                  onChange={handleThemeChange}
                  style={{ width: 120 }}
                >
                  <Option value="light">浅色主题</Option>
                  <Option value="dark">深色主题</Option>
                </Select>
              </div>
              <Paragraph style={{ color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                选择应用的主题样式
              </Paragraph>
            </div>
          </Card>

          <Card title="AI音频增强" style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <SoundOutlined style={{ marginRight: '0.5rem', color: '#667eea' }} />
                  <span>音频质量设置</span>
                </div>

              </div>
              <Paragraph style={{ color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                配置AI音频增强参数，提升音质和清晰度
              </Paragraph>
            </div>
          </Card>

          <Card title="学习提醒" style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <BellOutlined style={{ marginRight: '0.5rem', color: '#667eea' }} />
                  <span>学习提醒设置</span>
                </div>
                <Button 
                  type="default" 
                  onClick={() => setReminderVisible(true)}
                  style={{ borderRadius: '20px' }}
                >
                  设置提醒
                </Button>
              </div>
              <Paragraph style={{ color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                设置每日学习提醒时间
              </Paragraph>
            </div>
          </Card>

          <Card title="数据管理" style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Paragraph style={{ color: '#666', marginBottom: '1rem' }}>
                重置今日学习进度，重新开始今天的学习
              </Paragraph>
              <Button 
                type="default" 
                onClick={handleResetProgress}
                style={{ borderRadius: '20px' }}
              >
                重置今日进度
              </Button>
            </div>
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

      <StudyReminderComponent 
        visible={reminderVisible}
        onClose={() => setReminderVisible(false)}
      />
      

    </div>
  );
};

export default SettingsPage; 