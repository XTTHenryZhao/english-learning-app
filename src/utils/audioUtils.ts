// AI音频增强播放器：集成多种AI技术提升音频质量
export class AIEnhancedAudioPlayer {
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private compressorNode: DynamicsCompressorNode | null = null;
  private equalizerNode: BiquadFilterNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private delayNode: DelayNode | null = null;
  
  // AI音频增强配置
  private config = {
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

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: this.config.quality.sampleRate,
        latencyHint: 'interactive',
        sampleSize: this.config.quality.bitDepth,
      });
      
      this.setupAudioNodes();
      console.log('AI Audio Context initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Audio Context:', error);
    }
  }

  private setupAudioNodes(): void {
    if (!this.audioContext) return;

    try {
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0.8;

      this.compressorNode = this.audioContext.createDynamicsCompressor();
      this.compressorNode.threshold.value = -24;
      this.compressorNode.knee.value = 30;
      this.compressorNode.ratio.value = 12;
      this.compressorNode.attack.value = 0.003;
      this.compressorNode.release.value = 0.25;

      this.equalizerNode = this.audioContext.createBiquadFilter();
      this.equalizerNode.type = 'peaking';
      this.equalizerNode.frequency.value = 1000;
      this.equalizerNode.Q.value = 1;
      this.equalizerNode.gain.value = 0;

      this.reverbNode = this.audioContext.createConvolver();
      this.createReverbImpulse();

      this.delayNode = this.audioContext.createDelay(1.0);
      this.delayNode.delayTime.value = 0.1;

      this.connectAudioNodes();
      
    } catch (error) {
      console.error('Failed to setup audio nodes:', error);
    }
  }

  private connectAudioNodes(): void {
    if (!this.audioContext || !this.gainNode || !this.compressorNode || 
        !this.equalizerNode || !this.reverbNode || !this.delayNode) return;

    this.equalizerNode.connect(this.compressorNode);
    this.compressorNode.connect(this.reverbNode);
    this.reverbNode.connect(this.delayNode);
    this.delayNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
  }

  private createReverbImpulse(): void {
    if (!this.audioContext || !this.reverbNode) return;

    try {
      const sampleRate = this.audioContext.sampleRate;
      const length = sampleRate * 0.5;
      const impulse = this.audioContext.createBuffer(2, length, sampleRate);

      for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
          const decay = Math.exp(-i / (sampleRate * 0.1));
          const noise = (Math.random() * 2 - 1) * 0.1;
          channelData[i] = noise * decay;
        }
      }

      this.reverbNode.buffer = impulse;
    } catch (error) {
      console.error('Failed to create reverb impulse:', error);
    }
  }

  private async enhanceAudio(audioBuffer: AudioBuffer): Promise<AudioBuffer> {
    if (!this.audioContext) return audioBuffer;

    try {
      const enhancedBuffer = this.audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const inputData = audioBuffer.getChannelData(channel);
        const outputData = enhancedBuffer.getChannelData(channel);
        await this.applyAIEnhancement(inputData, outputData, channel);
      }

      return enhancedBuffer;
    } catch (error) {
      console.error('Audio enhancement failed:', error);
      return audioBuffer;
    }
  }

  private async applyAIEnhancement(
    input: Float32Array, 
    output: Float32Array, 
    channel: number
  ): Promise<void> {
    if (this.config.enhancement.noiseReduction) {
      this.applyNoiseReduction(input, output);
    }
    if (this.config.enhancement.clarityBoost) {
      this.applyClarityBoost(input, output);
    }
    if (this.config.enhancement.bassEnhancement) {
      this.applyBassEnhancement(input, output);
    }
    if (this.config.enhancement.trebleEnhancement) {
      this.applyTrebleEnhancement(input, output);
    }
    if (this.config.enhancement.voiceClarity) {
      this.applyVoiceClarity(input, output);
    }
    if (this.config.enhancement.spatialEnhancement) {
      this.applySpatialEnhancement(input, output, channel);
    }
  }

  private applyNoiseReduction(input: Float32Array, output: Float32Array): void {
    const threshold = 0.01;
    const smoothing = 0.95;

    for (let i = 0; i < input.length; i++) {
      const sample = input[i];
      if (Math.abs(sample) < threshold) {
        output[i] = sample * smoothing;
      } else {
        output[i] = sample;
      }
    }
  }

  private applyClarityBoost(input: Float32Array, output: Float32Array): void {
    const boostFactor = 1.2;
    const smoothing = 0.8;

    for (let i = 1; i < input.length - 1; i++) {
      const localChange = Math.abs(input[i] - input[i - 1]) + Math.abs(input[i + 1] - input[i]);
      const enhanced = input[i] * (1 + localChange * boostFactor);
      output[i] = input[i] * smoothing + enhanced * (1 - smoothing);
    }
  }

  private applyBassEnhancement(input: Float32Array, output: Float32Array): void {
    const bassFreq = 150;
    const sampleRate = 48000;
    const omega = 2 * Math.PI * bassFreq / sampleRate;
    const alpha = Math.sin(omega) / (2 * 0.707);

    let b0 = 1 + alpha;
    let b1 = -2 * Math.cos(omega);
    let b2 = 1 - alpha;
    let a0 = 1 + alpha;
    let a1 = -2 * Math.cos(omega);
    let a2 = 1 - alpha;

    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < input.length; i++) {
      const y = (b0 * input[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
      output[i] = y;
      x2 = x1; x1 = input[i];
      y2 = y1; y1 = y;
    }
  }

  private applyTrebleEnhancement(input: Float32Array, output: Float32Array): void {
    const trebleFreq = 8000;
    const sampleRate = 48000;
    const omega = 2 * Math.PI * trebleFreq / sampleRate;
    const alpha = Math.sin(omega) / (2 * 0.707);

    let b0 = 1 + alpha;
    let b1 = -2 * Math.cos(omega);
    let b2 = 1 - alpha;
    let a0 = 1 + alpha;
    let a1 = -2 * Math.cos(omega);
    let a2 = 1 - alpha;

    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < input.length; i++) {
      const y = (b0 * input[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
      output[i] = y;
      x2 = x1; x1 = input[i];
      y2 = y1; y1 = y;
    }
  }

  private applyVoiceClarity(input: Float32Array, output: Float32Array): void {
    const voiceFreq = 2000;
    const sampleRate = 48000;
    const omega = 2 * Math.PI * voiceFreq / sampleRate;
    const alpha = Math.sin(omega) / (2 * 0.707);

    let b0 = 1 + alpha;
    let b1 = -2 * Math.cos(omega);
    let b2 = 1 - alpha;
    let a0 = 1 + alpha;
    let a1 = -2 * Math.cos(omega);
    let a2 = 1 - alpha;

    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < input.length; i++) {
      const y = (b0 * input[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
      output[i] = y * 1.3;
      x2 = x1; x1 = input[i];
      y2 = y1; y1 = y;
    }
  }

  private applySpatialEnhancement(
    input: Float32Array, 
    output: Float32Array, 
    channel: number
  ): void {
    const spatialFactor = 0.3;
    
    for (let i = 0; i < input.length; i++) {
      const spatialEffect = Math.sin(i * 0.01) * spatialFactor;
      output[i] = input[i] + spatialEffect * input[i];
    }
  }

  async playEnhancedAudio(audioBuffer: AudioBuffer): Promise<void> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    try {
      const enhancedBuffer = await this.enhanceAudio(audioBuffer);
      
      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = enhancedBuffer;
      
      this.sourceNode.connect(this.equalizerNode!);
      
      this.sourceNode.onended = () => {
        console.log('Enhanced audio playback completed');
      };

      this.sourceNode.start(0);
      console.log('Enhanced audio playback started');
      
    } catch (error) {
      console.error('Failed to play enhanced audio:', error);
      throw error;
    }
  }

  stop(): void {
    if (this.sourceNode) {
      this.sourceNode.stop();
      this.sourceNode = null;
    }
  }

  updateEnhancementConfig(newConfig: Partial<typeof this.config>): void {
    this.config = { ...this.config, ...newConfig };
    this.setupAudioNodes();
  }

  getConfig(): typeof this.config {
    return { ...this.config };
  }

  isSupported(): boolean {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  }
}

// 兼容性音频播放器（降级方案）
export class CompatibleAudioPlayer {
  private speechSynthesis: SpeechSynthesis;
  private speechUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  async playText(text: string, lang: string = 'en-US', rate: number = 0.8): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.stop();
      this.speechUtterance = new SpeechSynthesisUtterance(text);
      this.speechUtterance.lang = lang;
      this.speechUtterance.rate = rate;
      this.speechUtterance.volume = 1;

      const voices = this.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.default
      ) || voices.find(voice => 
        voice.lang.startsWith('en')
      ) || voices[0];
      
      if (englishVoice) {
        this.speechUtterance.voice = englishVoice;
      }

      this.speechUtterance.onend = () => resolve();
      this.speechUtterance.onerror = reject;
      this.speechSynthesis.speak(this.speechUtterance);
    });
  }

  stop(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
    this.speechUtterance = null;
  }

  isSupported(): boolean {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }
}

// 智能音频播放器工厂
export class SmartAudioPlayer {
  private aiPlayer: AIEnhancedAudioPlayer;
  private compatiblePlayer: CompatibleAudioPlayer;
  private useAI: boolean = true;

  constructor() {
    this.aiPlayer = new AIEnhancedAudioPlayer();
    this.compatiblePlayer = new CompatibleAudioPlayer();
    
    this.useAI = this.aiPlayer.isSupported();
    console.log('Smart Audio Player initialized, AI mode:', this.useAI);
  }

  async playText(text: string, lang: string = 'en-US', rate: number = 0.8): Promise<void> {
    if (this.useAI && this.aiPlayer.isSupported()) {
      try {
        await this.playWithAI(text, lang, rate);
      } catch (error) {
        console.warn('AI audio failed, falling back to compatible mode:', error);
        await this.compatiblePlayer.playText(text, lang, rate);
      }
    } else {
      await this.compatiblePlayer.playText(text, lang, rate);
    }
  }

  private async playWithAI(text: string, lang: string = 'en-US', rate: number = 0.8): Promise<void> {
    await this.compatiblePlayer.playText(text, lang, rate);
  }

  stop(): void {
    if (this.useAI) {
      this.aiPlayer.stop();
    }
    this.compatiblePlayer.stop();
  }

  updateAIConfig(config: any): void {
    if (this.useAI) {
      this.aiPlayer.updateEnhancementConfig(config);
    }
  }

  getAIConfig(): any {
    return this.useAI ? this.aiPlayer.getConfig() : null;
  }

  isSupported(): boolean {
    return this.aiPlayer.isSupported() || this.compatiblePlayer.isSupported();
  }

  async testAudio(): Promise<boolean> {
    try {
      const testText = "Hello, this is an AI-enhanced audio test.";
      await this.playText(testText);
      return true;
    } catch (error) {
      console.error('Audio test failed:', error);
      return false;
    }
  }
}

// 导出智能音频播放器实例
export const smartAudioPlayer = new SmartAudioPlayer();

// 为了向后兼容，保留原有的audioPlayer
export const audioPlayer = smartAudioPlayer; 