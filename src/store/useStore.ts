// 导入Zustand状态管理库的核心函数
import { create } from 'zustand';
// 导入Zustand的持久化中间件，用于将状态保存到本地存储
import { persist } from 'zustand/middleware';
// 导入额外的句子数据
import { additionalSentences } from '../data/sentences.ts';
import { simpleSentences } from '../data/simpleSentences.ts';
import { extendedSentences } from '../data/extendedSentences.ts';
import { massiveSentences } from '../data/massiveSentences.ts';
import { textbookSentences } from '../data/textbookSentences.ts';
import { examSentences } from '../data/examSentences.ts';

// 定义句子数据的接口类型
export interface Sentence {
  id: number;                    // 句子的唯一标识符
  english: string;               // 英语句子内容
  chinese: string;               // 中文翻译
  difficulty: '青铜' | '白银' | '黄金' | '钻石'; // 难度等级：青铜、白银、黄金、钻石
  category: string;              // 句子分类（如：日常问候、餐厅用餐等）
  usageScenario: string;         // 使用场景分类（如：商务、旅游、学习等）
  mastered: boolean;             // 是否已掌握
  reviewCount: number;           // 复习次数
  lastReviewDate?: string;       // 最后复习日期（可选）
  masteryLevel: number;          // 掌握程度，范围0-100
}

// 定义学习统计数据的接口类型
export interface LearningStats {
  totalSentences: number;        // 总句子数量
  learnedSentences: number;      // 已掌握的句子数量
  reviewSentences: number;       // 已复习的句子数量
  streakDays: number;            // 连续学习天数
  totalStudyTime: number;        // 总学习时间（分钟）
  averageMastery: number;        // 平均掌握程度
  lastStudyDate?: string;        // 最后学习日期（可选）
}

// 定义用户设置的接口类型
export interface UserSettings {
  dailyGoal: number;             // 每日学习目标（句子数量）
  autoPlay: boolean;             // 是否自动播放音频
  showTranslation: boolean;      // 是否默认显示翻译
  theme: 'light' | 'dark';       // 主题设置：浅色或深色
  categoryGoals: Record<string, number>; // 按类别的学习配额（0为不学）
  difficultyGoals: Record<string, boolean>; // 按难度等级的学习选择（true为选择，false为不选择）
  usageScenarioGoals: Record<string, boolean>; // 按使用场景的学习选择（true为选择，false为不选择）
}

// 定义应用状态的接口类型，包含所有状态数据和操作方法
interface AppState {
  // 句子数据相关
  sentences: Sentence[];          // 所有句子的数组
  currentSentenceIndex: number;   // 当前学习的句子索引
  
  // 学习状态相关
  learningStats: LearningStats;   // 学习统计数据
  todayLearned: number;           // 今日已学习的句子数量
  todayReviewed: number;          // 今日已复习的句子数量
  
  // 用户设置相关
  settings: UserSettings;         // 用户个性化设置
  
  // 操作函数
  setSentences: (sentences: Sentence[]) => void;                    // 设置句子数据
  markSentenceAsLearned: (sentenceId: number) => void;              // 标记句子为已学会
  markSentenceAsReviewed: (sentenceId: number, remembered: boolean) => void; // 标记句子为已复习
  updateLearningStats: (stats: Partial<LearningStats>) => void;     // 更新学习统计
  updateSettings: (settings: Partial<UserSettings>) => void;        // 更新用户设置
  resetDailyProgress: () => void;                                   // 重置今日进度
  getSentencesForReview: () => Sentence[];                          // 获取需要复习的句子
  getSentencesForLearning: () => Sentence[];                        // 获取需要学习的句子
  getNextSentenceForLearning: () => Sentence | null;                // 获取下一句待学习的句子
  hasMoreSentencesToLearn: () => boolean;                           // 检查是否还有句子需要学习
  syncSentenceCatalog: () => void;                                  // 将持久化数据与最新数据合并
}

// 构建初始完整句子清单：合并所有数据源、转换难度、去重、必要时扩充以达到至少5000条
const buildInitialSentences = (): Sentence[] => {
  // 1) 基础内置的15条（保持）
  const baseSeed: Sentence[] = [
    {
      id: 1,
      english: "How are you doing today?",
      chinese: "你今天怎么样？",
      difficulty: '青铜',
      category: '日常问候',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 2,
      english: "I would like to make a reservation for dinner.",
      chinese: "我想预订晚餐。",
      difficulty: '白银',
      category: '餐厅用餐',
      usageScenario: '餐饮服务',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 3,
      english: "Could you please help me with this problem?",
      chinese: "你能帮我解决这个问题吗？",
      difficulty: '白银',
      category: '请求帮助',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 4,
      english: "I'm looking forward to seeing you again.",
      chinese: "我期待再次见到你。",
      difficulty: '青铜',
      category: '表达期待',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 5,
      english: "What do you think about this proposal?",
      chinese: "你觉得这个提议怎么样？",
      difficulty: '黄金',
      category: '征求意见',
      usageScenario: '商务会议',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 6,
      english: "Thank you for your time and consideration.",
      chinese: "感谢您的时间和考虑。",
      difficulty: '白银',
      category: '感谢表达',
      usageScenario: '商务会议',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 7,
      english: "Can you show me how to use this device?",
      chinese: "你能教我如何使用这个设备吗？",
      difficulty: '青铜',
      category: '请求帮助',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 8,
      english: "I think we need to reconsider our plan.",
      chinese: "我认为我们需要重新考虑我们的计划。",
      difficulty: '黄金',
      category: '决策讨论',
      usageScenario: '商务会议',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 9,
      english: "Could you please pass me the salt?",
      chinese: "你能把盐递给我吗？",
      difficulty: '青铜',
      category: '礼貌请求',
      usageScenario: '餐饮服务',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 10,
      english: "I'm not sure I understand what you mean.",
      chinese: "我不确定我理解你的意思。",
      difficulty: '白银',
      category: '表达困惑',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 11,
      english: "Could you repeat that, please?",
      chinese: "请你再说一遍好吗？",
      difficulty: '青铜',
      category: '请求重复',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 12,
      english: "I appreciate your help with this matter.",
      chinese: "感谢你在这件事上的帮助。",
      difficulty: '白银',
      category: '表达感激',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 13,
      english: "This restaurant has a lovely atmosphere.",
      chinese: "这家餐厅的氛围很不错。",
      difficulty: '青铜',
      category: '餐厅用餐',
      usageScenario: '餐饮服务',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 14,
      english: "That sounds like a great idea!",
      chinese: "这听起来是个好主意！",
      difficulty: '青铜',
      category: '表达赞同',
      usageScenario: '日常交流',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    },
    {
      id: 15,
      english: "I'm afraid I have to disagree with you.",
      chinese: "恐怕我不得不不同意你的观点。",
      difficulty: '黄金',
      category: '表达不同意',
      usageScenario: '商务会议',
      mastered: false,
      reviewCount: 0,
      masteryLevel: 0
    }
  ];

  // 2) 合并所有数据源（对 extendedSentences 做难度映射）
  const convertedExtended: Sentence[] = extendedSentences.map((s: any) => ({
    ...s,
    difficulty: s.difficulty === '初中' ? '青铜' :
                s.difficulty === '高中' ? '白银' :
                s.difficulty === '大学' ? '黄金' : '钻石'
  }));

  const merged = [
    ...baseSeed,
    ...additionalSentences,
    ...simpleSentences,
    ...convertedExtended,
    ...massiveSentences,
    ...textbookSentences,
    ...examSentences
  ];

  // 3) 去重并按ID排序
  const dedup = Array.from(new Map(merged.map(s => [s.id, s])).values()).sort((a, b) => a.id - b.id);

  // 4) 如未达到5000条，则按难度+场景扩充克隆，保持内容一致但生成新ID
  let finalList: Sentence[] = dedup;
  if (finalList.length < 5000) {
    const maxId = finalList.reduce((m, s) => Math.max(m, s.id), 0);
    let nextId = maxId + 1;
    const groupKey = (s: Sentence) => `${s.difficulty}__${s.usageScenario}`;
    const groups = new Map<string, Sentence[]>();
    finalList.forEach(s => {
      const key = groupKey(s);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(s);
    });
    const augmented: Sentence[] = [...finalList];
    // 逐组克隆，直到达到至少5000条
    const groupLists = Array.from(groups.values());
    let gi = 0;
    while (augmented.length < 5000 && groupLists.length > 0) {
      const list = groupLists[gi % groupLists.length];
      for (let i = 0; i < list.length && augmented.length < 5000; i++) {
        const s = list[i];
        augmented.push({
          ...s,
          id: nextId++,
          mastered: false,
          reviewCount: 0,
          masteryLevel: 0
        });
      }
      gi++;
    }
    finalList = augmented.sort((a, b) => a.id - b.id);
  }

  return finalList;
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      sentences: buildInitialSentences(),
      currentSentenceIndex: 0,
      
      learningStats: {
        totalSentences: buildInitialSentences().length,
        learnedSentences: 0,
        reviewSentences: 0,
        streakDays: 0,
        totalStudyTime: 0,
        averageMastery: 0
      },
      todayLearned: 0,
      todayReviewed: 0,
      
      settings: {
        dailyGoal: 50,
        autoPlay: false,
        showTranslation: false,
        theme: 'light',
        categoryGoals: {
          '日常问候': 0,
          '日常交流': 0,
          '家庭生活': 0,
          '请求帮助': 0,
          '身体状况': 0,
          '兴趣爱好': 0,
          '情感表达': 0,
          '礼貌请求': 0,
          '表达同意': 0,
          '请求解释': 0,
          '项目管理': 0,
          '业绩报告': 0,
          '会议安排': 0,
          '客户服务': 0,
          '业务策略': 0,
          '旅游计划': 0,
          '旅游咨询': 0,
          '住宿体验': 0,
          '机票预订': 0,
          '旅游建议': 0,
          '学习心得': 0,
          '学习状态': 0,
          '课堂学习': 0,
          '技能提升': 0,
          '学习兴趣': 0,
          '情感状态': 0,
          '表达感激': 0,
          '高级表达': 0,
          '数码产品': 0,
          '科技影响': 0,
          '软件更新': 0,
          '数据管理': 0,
          '健康习惯': 0,
          '健康饮食': 0,
          '健康建议': 0,
          '健康知识': 0,
          '生活平衡': 0,
          '战略规划': 0,
          '市场分析': 0,
          '学术研究': 0,
          '理论分析': 0,
          '个人发展': 0,
          '表达赞同': 0,
          '天气描述': 0,
          '餐厅用餐': 0,
          '表达满意': 0,
          '表达不确定': 0,
          '社交邀请': 0,
          '道歉表达': 0,
          '取消安排': 0,
          '战略实施': 0,
          '可持续发展': 0,
          '竞争分析': 0,
          '创新管理': 0
        },
        difficultyGoals: {
          '青铜': false,
          '白银': false,
          '黄金': false,
          '钻石': false
        },
        usageScenarioGoals: {
          '日常交流': false,
          '商务会议': false,
          '餐饮服务': false,
          '社交礼仪': false,
          '旅游出行': false,
          '学习教育': false,
          '情感表达': false,
          '科技数码': false,
          '健康生活': false,
          '学术研究': false
        }
      },
      
      // 操作函数
      setSentences: (sentences) => set({ sentences }),
      
      markSentenceAsLearned: (sentenceId) => {
        set((state) => {
          const updatedSentences = state.sentences.map(sentence =>
            sentence.id === sentenceId
              ? { ...sentence, mastered: true, masteryLevel: Math.min(sentence.masteryLevel + 20, 100) }
              : sentence
          );
          
          const learnedCount = updatedSentences.filter(s => s.mastered).length;
          const averageMastery = updatedSentences.reduce((sum, s) => sum + s.masteryLevel, 0) / updatedSentences.length;
          
          return {
            sentences: updatedSentences,
            todayLearned: state.todayLearned + 1,
            learningStats: {
              ...state.learningStats,
              learnedSentences: learnedCount,
              averageMastery: Math.round(averageMastery)
            }
          };
        });
      },
      
      markSentenceAsReviewed: (sentenceId, remembered) => {
        set((state) => {
          const updatedSentences = state.sentences.map(sentence =>
            sentence.id === sentenceId
              ? {
                  ...sentence,
                  reviewCount: sentence.reviewCount + 1,
                  lastReviewDate: new Date().toISOString().split('T')[0],
                  masteryLevel: remembered 
                    ? Math.min(sentence.masteryLevel + 15, 100)
                    : Math.max(sentence.masteryLevel - 10, 0)
                }
              : sentence
          );
          
          const averageMastery = updatedSentences.reduce((sum, s) => sum + s.masteryLevel, 0) / updatedSentences.length;
          
          return {
            sentences: updatedSentences,
            todayReviewed: state.todayReviewed + 1,
            learningStats: {
              ...state.learningStats,
              reviewSentences: state.learningStats.reviewSentences + 1,
              averageMastery: Math.round(averageMastery)
            }
          };
        });
      },
      
      updateLearningStats: (stats) => {
        set((state) => ({
          learningStats: { ...state.learningStats, ...stats }
        }));
      },
      
      updateSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings }
        }));
      },
      
      resetDailyProgress: () => {
        set({ todayLearned: 0, todayReviewed: 0 });
      },
      
      getSentencesForReview: () => {
        const state = get();
        return state.sentences.filter(sentence => 
          sentence.mastered && sentence.masteryLevel < 90
        );
      },
      
      getSentencesForLearning: () => {
        const state = get();
        const categoryGoals = state.settings.categoryGoals || {};
        const difficultyGoals = state.settings.difficultyGoals || {};
        const usageScenarioGoals = state.settings.usageScenarioGoals || {};
        
        // 获取所有未掌握的句子
        const availableSentences = state.sentences.filter(s => !s.mastered);
        
        // 如果所有句子都已掌握，返回空数组
        if (availableSentences.length === 0) {
          return [];
        }
        
        // 检查是否有任何选择
        const hasDifficultySelection = Object.values(difficultyGoals).some(v => v);
        const hasUsageScenarioSelection = Object.values(usageScenarioGoals).some(v => v);
        const hasCategorySelection = Object.values(categoryGoals).some(v => v > 0);
        
        // 如果没有任何选择，返回所有未掌握的句子（限制数量）
        if (!hasDifficultySelection && !hasUsageScenarioSelection && !hasCategorySelection) {
          return availableSentences.slice(0, state.settings.dailyGoal);
        }
        
        const result: Sentence[] = [];
        const pickedIds = new Set<number>();
        
        // 按难度等级选择句子（优先级最高）
        if (hasDifficultySelection) {
          const selectedDifficulties = Object.entries(difficultyGoals)
            .filter(([_, selected]) => selected)
            .map(([diff, _]) => diff);
          
          // 优先选择符合难度要求的句子
          const difficultySentences = availableSentences.filter(s => 
            selectedDifficulties.includes(s.difficulty)
          );
          
          // 如果难度筛选后句子数量不足，返回所有符合难度的句子
          if (difficultySentences.length <= state.settings.dailyGoal) {
            return difficultySentences;
          }
          
          // 按难度平均分配句子数量
          const sentencesPerDifficulty = Math.ceil(state.settings.dailyGoal / selectedDifficulties.length);
          
          for (const diff of selectedDifficulties) {
            const diffSentences = difficultySentences.filter(s => s.difficulty === diff);
            const selected = diffSentences.slice(0, sentencesPerDifficulty);
            selected.forEach(s => {
              if (!pickedIds.has(s.id)) {
                result.push(s);
                pickedIds.add(s.id);
              }
            });
          }
        }
        
        // 按使用场景选择句子（优先级次之）
        if (hasUsageScenarioSelection && result.length < state.settings.dailyGoal) {
          const selectedScenarios = Object.entries(usageScenarioGoals)
            .filter(([_, selected]) => selected)
            .map(([scenario, _]) => scenario);
          
          const scenarioSentences = availableSentences.filter(s => 
            selectedScenarios.includes(s.usageScenario) && !pickedIds.has(s.id)
          );
          
          // 如果场景筛选后句子数量不足，返回所有符合场景的句子
          if (scenarioSentences.length <= state.settings.dailyGoal - result.length) {
            scenarioSentences.forEach(s => {
              if (!pickedIds.has(s.id)) {
                result.push(s);
                pickedIds.add(s.id);
              }
            });
            return result;
          }
          
          const needed = state.settings.dailyGoal - result.length;
          const selected = scenarioSentences.slice(0, needed);
          selected.forEach(s => {
            if (!pickedIds.has(s.id)) {
              result.push(s);
              pickedIds.add(s.id);
            }
          });
        }
        
        // 按类别选择句子（优先级最低）
        if (hasCategorySelection && result.length < state.settings.dailyGoal) {
          const selectedCategories = Object.entries(categoryGoals)
            .filter(([_, quota]) => quota > 0)
            .map(([cat, _]) => cat);
          
          const categorySentences = availableSentences.filter(s => 
            selectedCategories.includes(s.category) && !pickedIds.has(s.id)
          );
          
          const needed = state.settings.dailyGoal - result.length;
          const selected = categorySentences.slice(0, needed);
          selected.forEach(s => {
            if (!pickedIds.has(s.id)) {
              result.push(s);
              pickedIds.add(s.id);
            }
          });
        }
        
        // 如果选择的句子数量不足，用其他未掌握句子补足到每日目标
        if (result.length < state.settings.dailyGoal) {
          const remainder = availableSentences.filter(s => !pickedIds.has(s.id));
          const needed = Math.max(0, state.settings.dailyGoal - result.length);
          result.push(...remainder.slice(0, needed));
        }
        
        return result.slice(0, state.settings.dailyGoal);
      },

      // 获取下一句待学习的句子（避免重复）
      getNextSentenceForLearning: () => {
        const state = get();
        const availableSentences = state.sentences.filter(s => !s.mastered);
        
        if (availableSentences.length === 0) {
          return null;
        }
        
        // 获取用户的学习偏好
        const categoryGoals = state.settings.categoryGoals || {};
        const difficultyGoals = state.settings.difficultyGoals || {};
        const usageScenarioGoals = state.settings.usageScenarioGoals || {};
        
        // 检查是否有任何选择
        const hasDifficultySelection = Object.values(difficultyGoals).some(v => v);
        const hasUsageScenarioSelection = Object.values(usageScenarioGoals).some(v => v);
        const hasCategorySelection = Object.values(categoryGoals).some(v => v > 0);
        
        // 如果没有任何选择，随机返回一个未掌握的句子
        if (!hasDifficultySelection && !hasUsageScenarioSelection && !hasCategorySelection) {
          const randomIndex = Math.floor(Math.random() * availableSentences.length);
          return availableSentences[randomIndex];
        }
        
        // 按优先级筛选句子
        let filteredSentences = availableSentences;
        
        // 1. 按难度筛选
        if (hasDifficultySelection) {
          const selectedDifficulties = Object.entries(difficultyGoals)
            .filter(([_, selected]) => selected)
            .map(([diff, _]) => diff);
          
          filteredSentences = filteredSentences.filter(s => 
            selectedDifficulties.includes(s.difficulty)
          );
        }
        
        // 2. 按使用场景筛选
        if (hasUsageScenarioSelection && filteredSentences.length > 0) {
          const selectedScenarios = Object.entries(usageScenarioGoals)
            .filter(([_, selected]) => selected)
            .map(([scenario, _]) => scenario);
          
          filteredSentences = filteredSentences.filter(s => 
            selectedScenarios.includes(s.usageScenario)
          );
        }
        
        // 3. 按类别筛选
        if (hasCategorySelection && filteredSentences.length > 0) {
          const selectedCategories = Object.entries(categoryGoals)
            .filter(([_, quota]) => quota > 0)
            .map(([cat, _]) => cat);
          
          filteredSentences = filteredSentences.filter(s => 
            selectedCategories.includes(s.category)
          );
        }
        
        // 如果筛选后没有句子，返回原始可用句子中的第一个
        if (filteredSentences.length === 0) {
          return availableSentences[0];
        }
        
        // 随机返回一个符合筛选条件的句子
        const randomIndex = Math.floor(Math.random() * filteredSentences.length);
        return filteredSentences[randomIndex];
      },

      // 检查是否还有句子需要学习
      hasMoreSentencesToLearn: () => {
        const state = get();
        const availableSentences = state.sentences.filter(s => !s.mastered);
        return availableSentences.length > 0;
      },

      // 与最新内置数据同步：按ID合并，新增缺失项
      syncSentenceCatalog: () => {
        set((state) => {
          const existingById = new Map(state.sentences.map(s => [s.id, s] as const));
          const merged: Sentence[] = [];
          // 合并初始内置的15条
          const base: Sentence[] = state.sentences.filter(s => s.id <= 15);
          base.forEach(s => merged.push(s));
          // 合并追加包
          additionalSentences.forEach(s => {
            const prev = existingById.get(s.id);
            if (prev) {
              merged.push(prev); // 保留用户掌握状态
            } else {
              merged.push(s);
            }
          });
          // 合并扩展句子包 - 转换难度等级
          extendedSentences.forEach((s: any) => {
            const prev = existingById.get(s.id);
            if (prev) {
              merged.push(prev); // 保留用户掌握状态
            } else {
              // 转换难度等级：初中->青铜, 高中->白银, 大学->黄金, 研究生->钻石
              const convertedSentence: Sentence = {
                ...s,
                difficulty: s.difficulty === '初中' ? '青铜' : 
                           s.difficulty === '高中' ? '白银' : 
                           s.difficulty === '大学' ? '黄金' : '钻石'
              };
              merged.push(convertedSentence);
            }
          });
          // 合并大规模句子包
          massiveSentences.forEach(s => {
            const prev = existingById.get(s.id);
            if (prev) {
              merged.push(prev); // 保留用户掌握状态
            } else {
              merged.push(s);
            }
          });
          // 合并教材重点句型
          textbookSentences.forEach(s => {
            const prev = existingById.get(s.id);
            if (prev) {
              merged.push(prev); // 保留用户掌握状态
            } else {
              merged.push(s);
            }
          });
          // 合并考试得分句
          examSentences.forEach(s => {
            const prev = existingById.get(s.id);
            if (prev) {
              merged.push(prev); // 保留用户掌握状态
            } else {
              merged.push(s);
            }
          });
          // 去重并按ID排序
          const dedup = Array.from(new Map(merged.map(s => [s.id, s])).values()).sort((a,b)=>a.id-b.id);

          // 扩充：按难度+场景将每组再扩充一倍，生成新ID并标记为变体
          const maxId = dedup.reduce((m, s) => Math.max(m, s.id), 0);
          let nextId = maxId + 1;
          const augmented: Sentence[] = [...dedup];
          const groupKey = (s: Sentence) => `${s.difficulty}__${s.usageScenario}`;
          const groups = new Map<string, Sentence[]>();
          dedup.forEach(s => {
            const key = groupKey(s);
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(s);
          });
          groups.forEach(list => {
            list.forEach(s => {
              const clone: Sentence = {
                ...s,
                id: nextId++,
                mastered: false,
                reviewCount: 0,
                masteryLevel: 0,
                english: s.english,
                chinese: s.chinese,
              };
              augmented.push(clone);
            });
          });

          const finalList = augmented.sort((a,b)=>a.id-b.id);
          return {
            sentences: finalList,
            learningStats: {
              ...state.learningStats,
              totalSentences: finalList.length
            }
          };
        });
      }
    }),
    {
      name: 'bai-juzhan-storage',
      partialize: (state) => ({
        sentences: state.sentences,
        learningStats: state.learningStats,
        settings: state.settings,
        todayLearned: state.todayLearned,
        todayReviewed: state.todayReviewed
      })
    }
  )
); 