// 自然语音测试页面
import React, { useState } from 'react';
import { Button, Card, Typography, Input, Slider, Space, Row, Col, Select, message } from 'antd';
import { ArrowLeftOutlined, PlayCircleOutlined, PauseCircleOutlined, StopOutlined, SoundOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { playNaturalVoice, naturalVoicePlayer } from '../utils/naturalVoicePlayer';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const VoiceTestPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 状态管理
  const [text, setText] = useState('Hello, this is a natural voice test. The audio has been optimized to remove the mechanical feeling and sound more like a real human voice.');
  const [voice, setVoice] = useState('Natural');
  const [rate, setRate] = useState(0.95);
  const [pitch, setPitch] = useState(1.02);
  const [volume, setVolume] = useState(0.9);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackState, setPlaybackState] = useState<'stopped' | 'playing' | 'paused'>('stopped');

  // 可用的语音选项
  const voiceOptions = [
    { label: '自然语音', value: 'Natural' },
    { label: '高质量语音', value: 'Premium' },
    { label: '增强语音', value: 'Enhanced' },
    { label: '高清语音', value: 'HD' },
    { label: '女性语音', value: 'Female' },
    { label: '男性语音', value: 'Male' },
  ];

  // 播放文本
  const handlePlay = async () => {
    if (!text.trim()) {
      message.warning('请输入要播放的文本');
      return;
    }

    try {
      setIsPlaying(true);
      setPlaybackState('playing');
      
      await playNaturalVoice(text, {
        voice,
        rate,
        pitch,
        volume
      });
      
      setIsPlaying(false);
      setPlaybackState('stopped');
      message.success('播放完成');
    } catch (error) {
      console.error('播放失败:', error);
      message.error('播放失败，请检查浏览器设置');
      setIsPlaying(false);
      setPlaybackState('stopped');
    }
  };

  // 暂停播放
  const handlePause = () => {
    naturalVoicePlayer.pause();
    setPlaybackState('paused');
    setIsPlaying(false);
  };

  // 恢复播放
  const handleResume = () => {
    naturalVoicePlayer.resume();
    setPlaybackState('playing');
    setIsPlaying(true);
  };

  // 停止播放
  const handleStop = () => {
    naturalVoicePlayer.stop();
    setPlaybackState('stopped');
    setIsPlaying(false);
  };

  // 设置音量
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    naturalVoicePlayer.setVolume(value);
  };

  // 设置播放速度
  const handleRateChange = (value: number) => {
    setRate(value);
    naturalVoicePlayer.setPlaybackRate(value);
  };

  // 预设文本
  const presetTexts = [
    {
      title: '英语学习',
      text: 'Learning English is fun and rewarding. Practice makes perfect!'
    },
    {
      title: '商务对话',
      text: 'Thank you for your time. I look forward to our next meeting.'
    },
    {
      title: '日常交流',
      text: 'How are you doing today? The weather is really nice outside.'
    },
    {
      title: '技术说明',
      text: 'This system uses advanced audio processing to create natural voice output.'
    }
  ];

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
        <h1 className="app-title">自然语音测试</h1>
        <div style={{ color: 'white' }}>
          <SoundOutlined style={{ marginRight: '0.5rem' }} />
          去除机器感
        </div>
      </header>

      <main className="app-content">
        <div className="card-container">
          <Title level={2} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            自然语音播放器测试
          </Title>
          
          <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            专门优化去除音频播放中的"机器感"，让声音听起来更像真实的人声
          </Paragraph>

          {/* 文本输入区域 */}
          <Card title="播放文本" style={{ marginBottom: '2rem' }}>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请输入要播放的文本..."
              rows={4}
              style={{ marginBottom: '1rem' }}
            />
            
            {/* 预设文本 */}
            <div style={{ marginBottom: '1rem' }}>
              <Text strong>预设文本：</Text>
              <Space wrap style={{ marginTop: '0.5rem' }}>
                {presetTexts.map((preset, index) => (
                  <Button
                    key={index}
                    size="small"
                    onClick={() => setText(preset.text)}
                  >
                    {preset.title}
                  </Button>
                ))}
              </Space>
            </div>
          </Card>

          {/* 语音设置 */}
          <Card title="语音设置" style={{ marginBottom: '2rem' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <Text strong>语音类型：</Text>
                  <Select
                    value={voice}
                    onChange={setVoice}
                    options={voiceOptions}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  />
                </div>
              </Col>
              
              <Col span={12}>
                <div>
                  <Text strong>播放速度：</Text>
                  <div style={{ marginTop: '0.5rem' }}>
                    <Slider
                      min={0.5}
                      max={1.5}
                      step={0.05}
                      value={rate}
                      onChange={setRate}
                      marks={{
                        0.5: '0.5x',
                        0.8: '0.8x',
                        1.0: '1.0x',
                        1.2: '1.2x',
                        1.5: '1.5x'
                      }}
                    />
                    <div style={{ textAlign: 'center', color: '#666' }}>
                      当前：{rate.toFixed(2)}x
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col span={12}>
                <div>
                  <Text strong>音调调整：</Text>
                  <div style={{ marginTop: '0.5rem' }}>
                    <Slider
                      min={0.5}
                      max={1.5}
                      step={0.01}
                      value={pitch}
                      onChange={setPitch}
                      marks={{
                        0.5: '低',
                        1.0: '正常',
                        1.5: '高'
                      }}
                    />
                    <div style={{ textAlign: 'center', color: '#666' }}>
                      当前：{pitch.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col span={12}>
                <div>
                  <Text strong>音量控制：</Text>
                  <div style={{ marginTop: '0.5rem' }}>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolumeChange}
                      marks={{
                        0: '静音',
                        0.5: '50%',
                        1: '100%'
                      }}
                    />
                    <div style={{ textAlign: 'center', color: '#666' }}>
                      当前：{Math.round(volume * 100)}%
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 播放控制 */}
          <Card title="播放控制" style={{ marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  onClick={handlePlay}
                  disabled={isPlaying}
                >
                  播放
                </Button>
                
                {playbackState === 'playing' && (
                  <Button
                    size="large"
                    icon={<PauseCircleOutlined />}
                    onClick={handlePause}
                  >
                    暂停
                  </Button>
                )}
                
                {playbackState === 'paused' && (
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={handleResume}
                  >
                    继续
                  </Button>
                )}
                
                <Button
                  size="large"
                  icon={<StopOutlined />}
                  onClick={handleStop}
                  disabled={playbackState === 'stopped'}
                >
                  停止
                </Button>
              </Space>
              
              <div style={{ marginTop: '1rem', color: '#666' }}>
                播放状态：{playbackState === 'playing' ? '播放中' : 
                           playbackState === 'paused' ? '已暂停' : '已停止'}
              </div>
            </div>
          </Card>

          {/* 技术说明 */}
          <Card title="技术特性">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: '1rem' }}>
                  <Text strong>🎛️ 动态压缩：</Text>
                  <Paragraph style={{ margin: '0.5rem 0' }}>
                    温和的压缩设置，保持人声的自然性
                  </Paragraph>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <Text strong>🎵 频率优化：</Text>
                  <Paragraph style={{ margin: '0.5rem 0' }}>
                    专门优化人声频率，突出清晰度
                  </Paragraph>
                </div>
              </Col>
              
              <Col span={12}>
                <div style={{ marginBottom: '1rem' }}>
                  <Text strong>🌊 空间效果：</Text>
                  <Paragraph style={{ margin: '0.5rem 0' }}>
                    自然混响和延迟，增加真实感
                  </Paragraph>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <Text strong>🎭 随机变化：</Text>
                  <Paragraph style={{ margin: '0.5rem 0' }}>
                    轻微的速度和音调变化，减少机械感
                  </Paragraph>
                </div>
              </Col>
            </Row>
            
            <div style={{ 
              background: '#f0f8ff', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginTop: '1rem' 
            }}>
              <Text strong>💡 使用建议：</Text>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                <li>从基础设置开始，逐步调整参数</li>
                <li>根据内容类型选择最适合的语音</li>
                <li>适当的速度和音调调整可以增加自然感</li>
                <li>注意音量平衡，避免过响或过轻</li>
              </ul>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VoiceTestPage; 