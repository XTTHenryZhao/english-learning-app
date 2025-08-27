// 简化的句子数据用于测试
import { Sentence } from '../store/useStore.ts';

export const simpleSentences: Sentence[] = [
  {
    id: 1001,
    english: "Hello, how are you?",
    chinese: "你好，你好吗？",
    difficulty: '初中',
    category: '日常问候',
    usageScenario: '日常交流',
    mastered: false,
    reviewCount: 0,
    masteryLevel: 0
  },
  {
    id: 1002,
    english: "What's your name?",
    chinese: "你叫什么名字？",
    difficulty: '初中',
    category: '初次见面',
    usageScenario: '社交礼仪',
    mastered: false,
    reviewCount: 0,
    masteryLevel: 0
  },
  {
    id: 1003,
    english: "Nice to meet you!",
    chinese: "很高兴见到你！",
    difficulty: '初中',
    category: '初次见面',
    usageScenario: '社交礼仪',
    mastered: false,
    reviewCount: 0,
    masteryLevel: 0
  }
]; 