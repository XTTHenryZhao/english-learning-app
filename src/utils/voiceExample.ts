// 自然语音播放器使用示例
import { playNaturalVoice, naturalVoicePlayer } from './naturalVoicePlayer';

// 示例1：基础播放
export const playBasicExample = async () => {
  try {
    await playNaturalVoice("Hello, this is a natural voice test", {
      voice: 'Natural',
      rate: 0.95,
      pitch: 1.02,
      volume: 0.9
    });
    console.log('播放完成');
  } catch (error) {
    console.error('播放失败:', error);
  }
};

// 示例2：英语学习
export const playLearningExample = async () => {
  try {
    await playNaturalVoice("Learning English is fun and rewarding. Practice makes perfect!", {
      voice: 'Premium',
      rate: 0.9,
      pitch: 1.0,
      volume: 0.85
    });
    console.log('学习示例播放完成');
  } catch (error) {
    console.error('播放失败:', error);
  }
};

// 示例3：商务对话
export const playBusinessExample = async () => {
  try {
    await playNaturalVoice("Thank you for your time. I look forward to our next meeting.", {
      voice: 'Enhanced',
      rate: 0.95,
      pitch: 1.05,
      volume: 0.9
    });
    console.log('商务示例播放完成');
  } catch (error) {
    console.error('播放失败:', error);
  }
};

// 示例4：自定义设置
export const playCustomExample = async (text: string, options: {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}) => {
  try {
    await playNaturalVoice(text, {
      voice: options.voice || 'Natural',
      rate: options.rate || 0.95,
      pitch: options.pitch || 1.02,
      volume: options.volume || 0.9
    });
    console.log('自定义示例播放完成');
  } catch (error) {
    console.error('播放失败:', error);
  }
};

// 示例5：播放器控制
export const playerControlExample = () => {
  // 设置音量
  naturalVoicePlayer.setVolume(0.8);
  
  // 设置播放速度
  naturalVoicePlayer.setPlaybackRate(0.9);
  
  // 获取播放状态
  const state = naturalVoicePlayer.getPlaybackState();
  console.log('当前播放状态:', state);
  
  return {
    setVolume: naturalVoicePlayer.setVolume.bind(naturalVoicePlayer),
    setPlaybackRate: naturalVoicePlayer.setPlaybackRate.bind(naturalVoicePlayer),
    getState: naturalVoicePlayer.getPlaybackState.bind(naturalVoicePlayer),
    play: naturalVoicePlayer.playText.bind(naturalVoicePlayer),
    stop: naturalVoicePlayer.stop.bind(naturalVoicePlayer),
    pause: naturalVoicePlayer.pause.bind(naturalVoicePlayer),
    resume: naturalVoicePlayer.resume.bind(naturalVoicePlayer)
  };
};

// 示例6：批量播放
export const playBatchExample = async (texts: string[]) => {
  const player = playerControlExample();
  
  for (let i = 0; i < texts.length; i++) {
    try {
      console.log(`播放第 ${i + 1} 句:`, texts[i]);
      await player.play(texts[i], {
        voice: 'Natural',
        rate: 0.95,
        pitch: 1.02,
        volume: 0.9
      });
      
      // 等待1秒再播放下一句
      if (i < texts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`第 ${i + 1} 句播放失败:`, error);
    }
  }
  
  console.log('批量播放完成');
};

// 示例7：错误处理
export const playWithErrorHandling = async (text: string) => {
  try {
    // 检查文本是否为空
    if (!text.trim()) {
      throw new Error('播放文本不能为空');
    }
    
    // 检查文本长度
    if (text.length > 1000) {
      throw new Error('播放文本过长，请分段播放');
    }
    
    // 开始播放
    await playNaturalVoice(text, {
      voice: 'Natural',
      rate: 0.95,
      pitch: 1.02,
      volume: 0.9
    });
    
    console.log('播放成功');
    return true;
  } catch (error) {
    console.error('播放失败:', error);
    
    // 根据错误类型给出建议
    if (error instanceof Error) {
      if (error.message.includes('权限')) {
        console.log('建议：检查浏览器音频权限设置');
      } else if (error.message.includes('不支持')) {
        console.log('建议：升级浏览器或使用其他浏览器');
      } else if (error.message.includes('网络')) {
        console.log('建议：检查网络连接');
      }
    }
    
    return false;
  }
};

// 导出所有示例
export const voiceExamples = {
  playBasicExample,
  playLearningExample,
  playBusinessExample,
  playCustomExample,
  playerControlExample,
  playBatchExample,
  playWithErrorHandling
}; 