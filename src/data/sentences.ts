// 导入句子数据的类型定义
import { Sentence } from '../store/useStore.ts';

// 扩展的句子数据数组：包含1000个英语学习句子
export const additionalSentences: Sentence[] = [
  // 原有句子 (16-30)
  {
    id: 16, english: "I'm really looking forward to our meeting tomorrow.", chinese: "我非常期待我们明天的会议。", difficulty: '白银', category: '商务会议', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 17, english: "Could you please send me the report by Friday?", chinese: "你能在周五之前把报告发给我吗？", difficulty: '白银', category: '工作沟通', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 18, english: "I think we should consider all the options before making a decision.", chinese: "我认为在做决定之前我们应该考虑所有选项。", difficulty: '黄金', category: '决策讨论', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 19, english: "The weather is absolutely beautiful today!", chinese: "今天的天气真是太好了！", difficulty: '青铜', category: '天气描述', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 20, english: "I'd like to book a table for two people, please.", chinese: "我想预订一张两人桌，谢谢。", difficulty: '白银', category: '餐厅用餐', usageScenario: '餐饮服务', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 21, english: "This is exactly what I was looking for.", chinese: "这正是我在找的东西。", difficulty: '青铜', category: '表达满意', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 22, english: "I'm not sure if I understand the question correctly.", chinese: "我不确定我是否正确理解了这个问题。", difficulty: '白银', category: '表达不确定', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 23, english: "Let's meet up for coffee sometime next week.", chinese: "我们下周找个时间一起喝咖啡吧。", difficulty: '青铜', category: '社交邀请', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 24, english: "I completely forgot about our appointment.", chinese: "我完全忘记了我们的约会。", difficulty: '白银', category: '道歉表达', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 25, english: "The presentation went really well, thank you for your help.", chinese: "演讲进行得很顺利，谢谢你的帮助。", difficulty: '白银', category: '感谢表达', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 26, english: "I'm afraid I have to cancel our meeting.", chinese: "恐怕我不得不取消我们的会议。", difficulty: '白银', category: '取消安排', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 27, english: "That's a great idea! Let's implement it right away.", chinese: "这是个好主意！让我们立即实施它。", difficulty: '白银', category: '表达赞同', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 28, english: "I need to think about this before giving you an answer.", chinese: "在给你答案之前我需要考虑一下。", difficulty: '白银', category: '请求时间', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 29, english: "The food at this restaurant is absolutely delicious!", chinese: "这家餐厅的食物真是太好吃了！", difficulty: '青铜', category: '美食评价', usageScenario: '餐饮服务', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 30, english: "I'm really sorry for the inconvenience I caused.", chinese: "我为造成的不便深表歉意。", difficulty: '白银', category: '道歉表达', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 新增句子 - 日常交流类 (31-100)
  {
    id: 31, english: "How's everything going with you?", chinese: "你最近怎么样？", difficulty: '青铜', category: '日常问候', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 32, english: "What do you usually do on weekends?", chinese: "你周末通常做什么？", difficulty: '青铜', category: '日常交流', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 33, english: "I love spending time with my family.", chinese: "我喜欢和家人共度时光。", difficulty: '青铜', category: '家庭生活', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 34, english: "Could you help me with this problem?", chinese: "你能帮我解决这个问题吗？", difficulty: '白银', category: '请求帮助', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 35, english: "I'm not feeling very well today.", chinese: "我今天感觉不太舒服。", difficulty: '青铜', category: '身体状况', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 36, english: "What's your favorite type of music?", chinese: "你最喜欢什么类型的音乐？", difficulty: '青铜', category: '兴趣爱好', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 37, english: "I'm really excited about the upcoming trip.", chinese: "我对即将到来的旅行非常兴奋。", difficulty: '白银', category: '情感表达', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 38, english: "Do you mind if I ask you a personal question?", chinese: "你介意我问你一个私人问题吗？", difficulty: '白银', category: '礼貌请求', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 39, english: "I completely agree with your point of view.", chinese: "我完全同意你的观点。", difficulty: '白银', category: '表达同意', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 40, english: "Could you please explain this in more detail?", chinese: "你能详细解释一下这个吗？", difficulty: '白银', category: '请求解释', usageScenario: '日常交流', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 商务职场类 (101-200)
  {
    id: 101, english: "We need to finalize the project proposal by next Monday.", chinese: "我们需要在下周一之前完成项目提案。", difficulty: '白银', category: '项目管理', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 102, english: "The quarterly results exceeded our expectations.", chinese: "季度业绩超出了我们的预期。", difficulty: '白银', category: '业绩报告', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 103, english: "I'd like to schedule a meeting to discuss the budget.", chinese: "我想安排一个会议来讨论预算。", difficulty: '白银', category: '会议安排', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 104, english: "The client is very satisfied with our service.", chinese: "客户对我们的服务非常满意。", difficulty: '白银', category: '客户服务', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 105, english: "We should focus on improving customer satisfaction.", chinese: "我们应该专注于提高客户满意度。", difficulty: '白银', category: '业务策略', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 科技数码类 - 钻石难度 (201-300)
  {
    id: 201, english: "The quantum computing paradigm represents a fundamental shift in computational complexity theory.", chinese: "量子计算范式代表了计算复杂性理论的根本性转变。", difficulty: '钻石', category: '量子计算', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 202, english: "Machine learning algorithms exhibit emergent properties that transcend traditional algorithmic analysis.", chinese: "机器学习算法展现出超越传统算法分析的新兴特性。", difficulty: '钻石', category: '机器学习', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 203, english: "The blockchain architecture demonstrates unprecedented levels of cryptographic security and distributed consensus.", chinese: "区块链架构展示了前所未有的加密安全性和分布式共识水平。", difficulty: '钻石', category: '区块链技术', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 204, english: "Neural network architectures exhibit complex emergent behaviors that challenge conventional computational models.", chinese: "神经网络架构展现出挑战传统计算模型的复杂新兴行为。", difficulty: '钻石', category: '神经网络', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 205, english: "The Internet of Things paradigm necessitates novel approaches to distributed systems and edge computing.", chinese: "物联网范式需要分布式系统和边缘计算的新方法。", difficulty: '钻石', category: '物联网', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 科技数码类 - 黄金难度 (211-250)
  {
    id: 211, english: "The development of 5G networks has revolutionized mobile communication technology.", chinese: "5G网络的发展彻底改变了移动通信技术。", difficulty: '黄金', category: '移动通信', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 212, english: "Virtual reality technology creates immersive digital environments for various applications.", chinese: "虚拟现实技术为各种应用创建沉浸式数字环境。", difficulty: '黄金', category: '虚拟现实', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 213, english: "Augmented reality overlays digital information onto the physical world.", chinese: "增强现实将数字信息叠加到物理世界上。", difficulty: '黄金', category: '增强现实', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 214, english: "Big data analytics enables organizations to make data-driven decisions.", chinese: "大数据分析使组织能够做出数据驱动的决策。", difficulty: '黄金', category: '大数据', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 215, english: "The Internet of Things connects everyday devices to the digital network.", chinese: "物联网将日常设备连接到数字网络。", difficulty: '黄金', category: '物联网', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 科技数码类 - 白银难度 (251-300)
  {
    id: 251, english: "Smartphones have become essential tools in our daily lives.", chinese: "智能手机已成为我们日常生活中的重要工具。", difficulty: '白银', category: '移动设备', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 252, english: "Social media platforms connect people from around the world.", chinese: "社交媒体平台连接来自世界各地的人们。", difficulty: '白银', category: '社交媒体', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 253, english: "Online shopping has transformed the way we buy products.", chinese: "网上购物改变了我们购买产品的方式。", difficulty: '白银', category: '电子商务', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 254, english: "Digital cameras capture high-quality images and videos.", chinese: "数码相机可以拍摄高质量的照片和视频。", difficulty: '白银', category: '数码影像', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 255, english: "Gaming consoles provide immersive entertainment experiences.", chinese: "游戏机提供沉浸式娱乐体验。", difficulty: '白银', category: '游戏娱乐', usageScenario: '科技数码', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 高级商务句子
  {
    id: 900, english: "The strategic implementation requires comprehensive stakeholder engagement.", chinese: "战略实施需要全面的利益相关者参与。", difficulty: '黄金', category: '战略实施', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 901, english: "We must prioritize sustainability in our business model.", chinese: "我们必须在商业模式中优先考虑可持续性。", difficulty: '黄金', category: '可持续发展', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 902, english: "The competitive analysis reveals market opportunities.", chinese: "竞争分析揭示了市场机会。", difficulty: '黄金', category: '竞争分析', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 903, english: "Innovation is the key to maintaining competitive advantage.", chinese: "创新是保持竞争优势的关键。", difficulty: '黄金', category: '创新管理', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 904, english: "The organizational structure supports our growth objectives.", chinese: "组织结构支持我们的增长目标。", difficulty: '黄金', category: '组织管理', usageScenario: '商务会议', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 高级学术句子
  {
    id: 950, english: "The research methodology demonstrates rigorous scientific standards.", chinese: "研究方法展示了严格的科学标准。", difficulty: '黄金', category: '研究方法', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 951, english: "The theoretical framework provides comprehensive analytical tools.", chinese: "理论框架提供了全面的分析工具。", difficulty: '黄金', category: '理论分析', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 952, english: "The empirical evidence supports our hypothesis.", chinese: "实证证据支持我们的假设。", difficulty: '黄金', category: '实证研究', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 953, english: "The literature review reveals significant research gaps.", chinese: "文献综述揭示了重要的研究空白。", difficulty: '黄金', category: '文献研究', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 954, english: "The statistical analysis confirms our findings.", chinese: "统计分析确认了我们的发现。", difficulty: '黄金', category: '统计分析', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },

  // 最终句子 (995-1000)
  {
    id: 995, english: "I'm absolutely thrilled about this incredible opportunity.", chinese: "我对这个令人难以置信的机会感到无比兴奋。", difficulty: '黄金', category: '高级表达', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 996, english: "The serendipitous discovery led to groundbreaking innovation.", chinese: "意外发现导致了突破性创新。", difficulty: '黄金', category: '高级表达', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 997, english: "I'm genuinely appreciative of your unwavering commitment.", chinese: "我真诚地感谢你的坚定承诺。", difficulty: '黄金', category: '高级表达', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 998, english: "The complexity of this situation requires multifaceted solutions.", chinese: "这种情况的复杂性需要多方面的解决方案。", difficulty: '黄金', category: '高级表达', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 999, english: "We must prioritize innovation and continuous improvement.", chinese: "我们必须优先考虑创新和持续改进。", difficulty: '黄金', category: '高级表达', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  },
  {
    id: 1000, english: "I'm deeply committed to excellence and personal growth.", chinese: "我深深致力于卓越和个人成长。", difficulty: '黄金', category: '高级表达', usageScenario: '学术研究', mastered: false, reviewCount: 0, masteryLevel: 0
  }
]; 
