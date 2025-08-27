// 自然的人声音频播放器 - 专门优化去除机器感
export class NaturalVoicePlayer {
  private audioContext: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private compressorNode: DynamicsCompressorNode | null = null;
  private equalizerNode: BiquadFilterNode[] = [];
  private reverbNode: ConvolverNode | null = null;
  private delayNode: DelayNode | null = null;
  private chorusNode: DelayNode[] = [];
  private isInitialized = false;

  constructor() {
    this.initAudioContext();
  }

  // 初始化音频上下文
  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // 等待用户交互后启动音频上下文
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      this.setupAudioChain();
      this.isInitialized = true;
    } catch (error) {
      console.error('初始化音频上下文失败:', error);
    }
  }

  // 设置音频处理链
  private setupAudioChain() {
    if (!this.audioContext) return;

    // 创建音频元素
    this.audioElement = new Audio();
    this.audioElement.crossOrigin = 'anonymous';
    
    // 创建音频源节点
    this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
    
    // 创建主音量控制
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0.9;
    
    // 创建动态压缩器 - 减少动态范围，让声音更自然
    this.compressorNode = this.audioContext.createDynamicsCompressor();
    this.setupCompressor();
    
    // 创建均衡器 - 优化人声频率
    this.setupEqualizer();
    
    // 创建混响效果 - 增加空间感
    this.setupReverb();
    
    // 创建延迟效果 - 增加深度
    this.setupDelay();
    
    // 创建合唱效果 - 减少机械感
    this.setupChorus();
    
    // 连接音频链
    this.connectAudioChain();
  }

  // 设置压缩器参数
  private setupCompressor() {
    if (!this.compressorNode) return;
    
    // 温和的压缩设置，保持人声的自然性
    this.compressorNode.threshold.value = -20;    // 压缩阈值
    this.compressorNode.knee.value = 40;          // 软膝压缩
    this.compressorNode.ratio.value = 3;          // 压缩比
    this.compressorNode.attack.value = 0.005;     // 快速攻击
    this.compressorNode.release.value = 0.1;      // 适中释放
  }

  // 设置均衡器
  private setupEqualizer() {
    if (!this.audioContext) return;
    
    // 人声优化的频率设置
    const frequencies = [
      { freq: 80, type: 'lowshelf', gain: 2 },      // 低频增强
      { freq: 200, type: 'peaking', gain: -1 },     // 减少浑浊
      { freq: 800, type: 'peaking', gain: 1 },      // 中频增强
      { freq: 2500, type: 'peaking', gain: 3 },    // 人声清晰度
      { freq: 5000, type: 'peaking', gain: 2 },    // 高频亮度
      { freq: 8000, type: 'highshelf', gain: -1 }  // 减少刺耳
    ];

    this.equalizerNode = frequencies.map(({ freq, type, gain }) => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = type as BiquadFilterType;
      filter.frequency.value = freq;
      filter.gain.value = gain;
      filter.Q.value = 1;
      return filter;
    });
  }

  // 设置混响效果
  private setupReverb() {
    if (!this.audioContext) return;
    
    this.reverbNode = this.audioContext.createConvolver();
    
    // 创建自然的混响脉冲响应
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 0.15; // 150ms混响
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    // 填充混响数据
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // 指数衰减的混响
        const decay = Math.exp(-i / (sampleRate * 0.05));
        channelData[i] = (Math.random() - 0.5) * 2 * decay * 0.3;
      }
    }
    
    this.reverbNode.buffer = impulse;
  }

  // 设置延迟效果
  private setupDelay() {
    if (!this.audioContext) return;
    
    this.delayNode = this.audioContext.createDelay();
    this.delayNode.delayTime.value = 0.08; // 80ms延迟
    
    // 创建延迟反馈
    const feedbackGain = this.audioContext.createGain();
    feedbackGain.gain.value = 0.3;
    
    this.delayNode.connect(feedbackGain);
    feedbackGain.connect(this.delayNode);
  }

  // 设置合唱效果
  private setupChorus() {
    if (!this.audioContext) return;
    
    // 创建多个延迟节点模拟合唱效果
    this.chorusNode = [
      this.audioContext.createDelay(),
      this.audioContext.createDelay(),
      this.audioContext.createDelay()
    ];
    
    const chorusGain = this.audioContext.createGain();
    chorusGain.gain.value = 0.15; // 轻微的合唱效果
    
    // 设置不同的延迟时间
    this.chorusNode[0].delayTime.value = 0.025;
    this.chorusNode[1].delayTime.value = 0.035;
    this.chorusNode[2].delayTime.value = 0.045;
    
    // 添加轻微的调制
    this.chorusNode.forEach((delay, index) => {
      const lfo = this.audioContext!.createOscillator();
      const lfoGain = this.audioContext!.createGain();
      
      lfo.frequency.value = 0.5 + index * 0.2;
      lfoGain.gain.value = 0.005;
      
      lfo.connect(lfoGain);
      lfoGain.connect(delay.delayTime);
      lfo.start();
    });
  }

  // 连接音频处理链
  private connectAudioChain() {
    if (!this.sourceNode || !this.gainNode || !this.compressorNode) return;
    
    let currentNode: AudioNode = this.sourceNode;
    
    // 连接压缩器
    currentNode.connect(this.compressorNode);
    currentNode = this.compressorNode;
    
    // 连接均衡器链
    this.equalizerNode.forEach(filter => {
      currentNode.connect(filter);
      currentNode = filter;
    });
    
    // 连接混响
    if (this.reverbNode) {
      currentNode.connect(this.reverbNode);
      currentNode = this.reverbNode;
    }
    
    // 连接延迟
    if (this.delayNode) {
      currentNode.connect(this.delayNode);
      currentNode = this.delayNode;
    }
    
    // 连接合唱效果
    this.chorusNode.forEach(chorus => {
      currentNode.connect(chorus);
    });
    
    // 连接主音量控制
    currentNode.connect(this.gainNode);
    
    // 连接到输出
    this.gainNode.connect(this.audioContext!.destination);
  }

  // 播放文本
  async playText(text: string, options: {
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  } = {}) {
    if (!this.isInitialized || !this.audioContext) {
      await this.initAudioContext();
    }

    try {
      // 使用Web Speech API进行语音合成
      if ('speechSynthesis' in window) {
        return this.playWithSpeechSynthesis(text, options);
      } else {
        throw new Error('浏览器不支持语音合成');
      }
    } catch (error) {
      console.error('播放失败:', error);
      throw error;
    }
  }

  // 使用语音合成播放
  private playWithSpeechSynthesis(text: string, options: {
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  }) {
    return new Promise<void>((resolve, reject) => {
      if (!this.audioContext) {
        reject(new Error('音频上下文未初始化'));
        return;
      }

      // 停止之前的播放
      this.stop();
      
      // 创建语音合成
      const utterance = new SpeechSynthesisUtterance(text);
      
      // 选择最佳的人声
      const voices = speechSynthesis.getVoices();
      const bestVoice = this.selectBestVoice(voices, options.voice);
      
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
      
      // 设置语音参数 - 优化人声自然度
      utterance.rate = Math.max(0.8, Math.min(1.2, options.rate || 0.95));  // 稍微慢一点
      utterance.pitch = Math.max(0.9, Math.min(1.1, options.pitch || 1.02)); // 轻微的音调变化
      utterance.volume = Math.max(0.8, Math.min(1.0, options.volume || 0.9)); // 适当音量
      
      // 添加随机变化，减少机械感
      this.addRandomVariation(utterance);
      
      // 事件处理
      utterance.onstart = () => {
        console.log('开始播放:', text);
      };
      
      utterance.onend = () => {
        console.log('播放完成');
        resolve();
      };
      
      utterance.onerror = (event) => {
        console.error('播放错误:', event);
        reject(new Error('语音合成失败'));
      };
      
      // 开始播放
      speechSynthesis.speak(utterance);
    });
  }

  // 选择最佳人声
  private selectBestVoice(voices: SpeechSynthesisVoice[], preferredVoice?: string): SpeechSynthesisVoice | null {
    if (preferredVoice) {
      const voice = voices.find(v => v.name.includes(preferredVoice));
      if (voice) return voice;
    }
    
    // 按优先级选择最佳人声
    const voicePriorities = [
      'Natural', 'Premium', 'Enhanced', 'HD', 'High Quality',
      'Female', 'Male', 'English', 'US', 'GB'
    ];
    
    for (const priority of voicePriorities) {
      const voice = voices.find(v => 
        v.name.includes(priority) || 
        v.lang.includes('en')
      );
      if (voice) return voice;
    }
    
    // 返回第一个可用的英语语音
    return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  // 添加随机变化，减少机械感
  private addRandomVariation(utterance: SpeechSynthesisUtterance) {
    // 轻微的随机变化
    const rateVariation = 0.02; // 2%的变化
    const pitchVariation = 0.01; // 1%的变化
    
    utterance.rate += (Math.random() - 0.5) * rateVariation;
    utterance.pitch += (Math.random() - 0.5) * pitchVariation;
  }

  // 播放音频文件
  async playAudioFile(audioUrl: string, options: {
    volume?: number;
    playbackRate?: number;
  } = {}) {
    if (!this.isInitialized || !this.audioContext || !this.audioElement) {
      await this.initAudioContext();
    }

    try {
      if (!this.audioElement) throw new Error('音频元素未初始化');
      
      // 停止之前的播放
      this.stop();
      
      // 设置音频源
      this.audioElement.src = audioUrl;
      
      // 设置播放参数
      if (options.volume !== undefined) {
        this.audioElement.volume = options.volume;
      }
      if (options.playbackRate !== undefined) {
        this.audioElement.playbackRate = options.playbackRate;
      }
      
      // 播放音频
      await this.audioElement.play();
      
      console.log('开始播放音频文件:', audioUrl);
    } catch (error) {
      console.error('播放音频文件失败:', error);
      throw error;
    }
  }

  // 停止播放
  stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }

  // 暂停播放
  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
  }

  // 恢复播放
  resume() {
    if (this.audioElement) {
      this.audioElement.play();
    }
    
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }

  // 设置音量
  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
    
    if (this.audioElement) {
      this.audioElement.volume = Math.max(0, Math.min(1, volume));
    }
  }

  // 设置播放速度
  setPlaybackRate(rate: number) {
    if (this.audioElement) {
      this.audioElement.playbackRate = Math.max(0.5, Math.min(2, rate));
    }
  }

  // 获取播放状态
  getPlaybackState(): 'playing' | 'paused' | 'stopped' {
    if (this.audioElement) {
      if (this.audioElement.paused) {
        return this.audioElement.currentTime === 0 ? 'stopped' : 'paused';
      }
      return 'playing';
    }
    
    if (speechSynthesis.speaking) {
      return speechSynthesis.paused ? 'paused' : 'playing';
    }
    
    return 'stopped';
  }

  // 销毁播放器
  destroy() {
    this.stop();
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.audioElement = null;
    this.sourceNode = null;
    this.gainNode = null;
    this.compressorNode = null;
    this.equalizerNode = [];
    this.reverbNode = null;
    this.delayNode = null;
    this.chorusNode = [];
    this.isInitialized = false;
  }
}

// 创建全局实例
export const naturalVoicePlayer = new NaturalVoicePlayer();

// 便捷的播放函数
export const playNaturalVoice = async (
  text: string, 
  options?: {
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  }
) => {
  return naturalVoicePlayer.playText(text, options);
};

export const playNaturalAudio = async (
  audioUrl: string,
  options?: {
    volume?: number;
    playbackRate?: number;
  }
) => {
  return naturalVoicePlayer.playAudioFile(audioUrl, options);
}; 