import React, { useState, useEffect } from 'react';
import { Card, Slider, Switch, InputNumber, Button, Space, Typography, Divider, message } from 'antd';
import { SoundOutlined, SettingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { smartAudioPlayer } from '../utils/audioUtils';

const { Title, Text } = Typography;

interface AudioSettingsProps {
  onClose?: () => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ onClose }) => {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentConfig = smartAudioPlayer.getAIConfig();
    if (currentConfig) {
      setConfig(currentConfig);
    }
  }, []);

  const handleConfigChange = (path: string, value: any) => {
    if (!config) return;

    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    
    smartAudioPlayer.updateAIConfig(newConfig);
  };

  const handleEnhancementToggle = (key: string, checked: boolean) => {
    handleConfigChange(`enhancement.${key}`, checked);
  };

  const handleEffectChange = (key: string, value: number) => {
    handleConfigChange(`effects.${key}`, value);
  };

  const handleEqualizationChange = (key: string, value: number) => {
    handleConfigChange(`effects.equalization.${key}`, value);
  };

  const testAudio = async () => {
    setIsLoading(true);
    try {
      const success = await smartAudioPlayer.testAudio();
      if (success) {
        message.success('音频测试成功！');
      } else {
        message.error('音频测试失败');
      }
    } catch (error) {
      message.error('音频测试出错');
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    const defaultConfig = {
      enhancement: {
        noiseReduction: true,
        clarityBoost: true,
        bassEnhancement: true,
        trebleEnhancement: true,
        spatialEnhancement: true,
        voiceClarity: true,
      },
      effects: {
        reverb: 0.3,
        delay: 0.1,
        compression: 0.5,
        equalization: {
          bass: 2.0,
          mid: 1.5,
          treble: 1.8,
        }
      },
      quality: {
        sampleRate: 48000,
        bitDepth: 24,
        channels: 2,
      }
    };
    
    setConfig(defaultConfig);
    smartAudioPlayer.updateAIConfig(defaultConfig);
    message.success('已重置为默认设置');
  };

  if (!config) {
    return (
      <Card title="音频设置" extra={<SettingOutlined />}>
        <Text>正在加载音频配置...</Text>
      </Card>
    );
  }

  return (
    <Card 
      title={
        <Space>
          <SoundOutlined />
          <span>AI音频增强设置</span>
        </Space>
      }
      extra={
        <Space>
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />}
            onClick={testAudio}
            loading={isLoading}
          >
            测试音频
          </Button>
          <Button onClick={onClose}>关闭</Button>
        </Space>
      }
      style={{ maxWidth: 800 }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        
        <div>
          <Title level={5}>音频增强功能</Title>
          <Space wrap>
            <div>
              <Text>降噪处理</Text>
              <Switch 
                checked={config.enhancement.noiseReduction}
                onChange={(checked) => handleEnhancementToggle('noiseReduction', checked)}
                style={{ marginLeft: 8 }}
              />
            </div>
            <div>
              <Text>清晰度提升</Text>
              <Switch 
                checked={config.enhancement.clarityBoost}
                onChange={(checked) => handleEnhancementToggle('clarityBoost', checked)}
                style={{ marginLeft: 8 }}
              />
            </div>
            <div>
              <Text>低音增强</Text>
              <Switch 
                checked={config.enhancement.bassEnhancement}
                onChange={(checked) => handleEnhancementToggle('bassEnhancement', checked)}
                style={{ marginLeft: 8 }}
              />
            </div>
            <div>
              <Text>高音增强</Text>
              <Switch 
                checked={config.enhancement.trebleEnhancement}
                onChange={(checked) => handleEnhancementToggle('trebleEnhancement', checked)}
                style={{ marginLeft: 8 }}
              />
            </div>
            <div>
              <Text>空间感增强</Text>
              <Switch 
                checked={config.enhancement.spatialEnhancement}
                onChange={(checked) => handleEnhancementToggle('spatialEnhancement', checked)}
                style={{ marginLeft: 8 }}
              />
            </div>
            <div>
              <Text>人声清晰度</Text>
              <Switch 
                checked={config.enhancement.voiceClarity}
                onChange={(checked) => handleEnhancementToggle('voiceClarity', checked)}
                style={{ marginLeft: 8 }}
              />
            </div>
          </Space>
        </div>

        <Divider />

        <div>
          <Title level={5}>音效参数</Title>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            
            <div>
              <Text>混响强度: {config.effects.reverb}</Text>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={config.effects.reverb}
                onChange={(value) => handleEffectChange('reverb', value)}
                style={{ marginTop: 8 }}
              />
            </div>

            <div>
              <Text>延迟强度: {config.effects.delay}</Text>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={config.effects.delay}
                onChange={(value) => handleEffectChange('delay', value)}
                style={{ marginTop: 8 }}
              />
            </div>

            <div>
              <Text>压缩强度: {config.effects.compression}</Text>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={config.effects.compression}
                onChange={(value) => handleEffectChange('compression', value)}
                style={{ marginTop: 8 }}
              />
            </div>
          </Space>
        </div>

        <Divider />

        <div>
          <Title level={5}>均衡器设置</Title>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            
            <div>
              <Text>低音增益: {config.effects.equalization.bass}</Text>
              <Slider
                min={0.5}
                max={4.0}
                step={0.1}
                value={config.effects.equalization.bass}
                onChange={(value) => handleEqualizationChange('bass', value)}
                style={{ marginTop: 8 }}
              />
            </div>

            <div>
              <Text>中音增益: {config.effects.equalization.mid}</Text>
              <Slider
                min={0.5}
                max={4.0}
                step={0.1}
                value={config.effects.equalization.mid}
                onChange={(value) => handleEqualizationChange('mid', value)}
                style={{ marginTop: 8 }}
              />
            </div>

            <div>
              <Text>高音增益: {config.effects.equalization.treble}</Text>
              <Slider
                min={0.5}
                max={4.0}
                step={0.1}
                value={config.effects.equalization.treble}
                onChange={(value) => handleEqualizationChange('treble', value)}
                style={{ marginTop: 8 }}
              />
            </div>
          </Space>
        </div>

        <Divider />

        <div>
          <Title level={5}>音频质量</Title>
          <Space wrap>
            <div>
              <Text>采样率: </Text>
              <InputNumber
                value={config.quality.sampleRate}
                onChange={(value) => handleConfigChange('quality.sampleRate', value)}
                min={8000}
                max={96000}
                step={1000}
                style={{ width: 120 }}
              />
              <Text style={{ marginLeft: 4 }}>Hz</Text>
            </div>
            
            <div>
              <Text>位深度: </Text>
              <InputNumber
                value={config.quality.bitDepth}
                onChange={(value) => handleConfigChange('quality.bitDepth', value)}
                min={16}
                max={32}
                step={8}
                style={{ width: 80 }}
              />
              <Text style={{ marginLeft: 4 }}>bit</Text>
            </div>
            
            <div>
              <Text>声道数: </Text>
              <InputNumber
                value={config.quality.channels}
                onChange={(value) => handleConfigChange('quality.channels', value)}
                min={1}
                max={8}
                step={1}
                style={{ width: 80 }}
              />
            </div>
          </Space>
        </div>

        <Divider />

        <Space>
          <Button onClick={resetToDefaults} type="dashed">
            重置为默认值
          </Button>
          <Button type="primary" onClick={testAudio} loading={isLoading}>
            测试当前设置
          </Button>
        </Space>

        <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 6 }}>
          <Title level={5}>技术说明</Title>
          <Text type="secondary">
            本音频增强系统采用先进的AI算法，包括：
            <br />• 自适应降噪：智能识别并过滤背景噪音
            <br />• 频谱增强：优化不同频率段的音质表现
            <br />• 空间音频：增强立体声效果和空间感
            <br />• 动态压缩：平衡音频的动态范围
            <br />• 实时处理：低延迟的音频处理管道
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default AudioSettings; 