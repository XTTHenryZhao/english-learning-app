const fs = require('fs');

// 读取sentences.ts文件
const sentencesPath = './src/data/sentences.ts';
console.log('正在读取文件:', sentencesPath);

try {
  const content = fs.readFileSync(sentencesPath, 'utf8');
  console.log('文件读取成功，内容长度:', content.length);
} catch (error) {
  console.error('读取文件失败:', error.message);
  process.exit(1);
}

const content = fs.readFileSync(sentencesPath, 'utf8');

// 定义category到usageScenario的映射
const categoryToUsageScenario = {
  // 日常交流类
  '日常问候': '日常交流',
  '日常交流': '日常交流',
  '家庭生活': '日常交流',
  '请求帮助': '日常交流',
  '身体状况': '日常交流',
  '兴趣爱好': '日常交流',
  '情感表达': '日常交流',
  '礼貌请求': '日常交流',
  '表达同意': '日常交流',
  '请求解释': '日常交流',
  '表达满意': '日常交流',
  '表达不确定': '日常交流',
  '社交邀请': '日常交流',
  '道歉表达': '日常交流',
  '感谢表达': '日常交流',
  '请求时间': '日常交流',
  '情感状态': '日常交流',
  '表达感激': '日常交流',
  '情感变化': '日常交流',
  '天气描述': '日常交流',
  
  // 商务会议类
  '商务会议': '商务会议',
  '工作沟通': '商务会议',
  '决策讨论': '商务会议',
  '项目管理': '商务会议',
  '业绩报告': '商务会议',
  '会议安排': '商务会议',
  '客户服务': '商务会议',
  '业务策略': '商务会议',
  '取消安排': '商务会议',
  '表达赞同': '商务会议',
  
  // 餐饮服务类
  '餐厅用餐': '餐饮服务',
  '美食评价': '餐饮服务',
  
  // 旅游出行类
  '旅游计划': '旅游出行',
  '旅游咨询': '旅游出行',
  '住宿体验': '旅游出行',
  '机票预订': '旅游出行',
  '旅游建议': '旅游出行',
  
  // 学习教育类
  '学习心得': '学习教育',
  '学习状态': '学习教育',
  '课堂学习': '学习教育',
  '技能提升': '学习教育',
  '学习兴趣': '学习教育',
  '技能学习': '学习教育',
  
  // 科技数码类
  '数码产品': '科技数码',
  '科技影响': '科技数码',
  '软件更新': '科技数码',
  '数据管理': '科技数码',
  
  // 健康生活类
  '健康习惯': '健康生活',
  '健康饮食': '健康生活',
  '健康建议': '健康生活',
  '健康知识': '健康生活',
  '生活平衡': '健康生活',
  
  // 学术研究类
  '学术研究': '学术研究',
  '理论分析': '学术研究',
  '战略规划': '学术研究',
  '市场分析': '学术研究',
  '高级表达': '学术研究',
  '商业策略': '学术研究',
  '创新思维': '学术研究',
  '个人发展': '学术研究',
  '战略实施': '学术研究',
  '可持续发展': '学术研究',
  '竞争分析': '学术研究',
  '创新管理': '学术研究',
  '组织管理': '学术研究',
  '研究方法': '学术研究',
  '实证研究': '学术研究',
  '文献研究': '学术研究',
  '统计分析': '学术研究'
};

console.log('映射表包含', Object.keys(categoryToUsageScenario).length, '个类别');

// 修复函数：为缺少usageScenario的句子添加字段
function fixUsageScenario(content) {
  let fixedContent = content;
  let fixedCount = 0;
  
  // 查找所有缺少usageScenario的句子
  const sentencePattern = /(\{\s*id:\s*\d+[^}]*category:\s*'([^']+)'[^}]*)(mastered:\s*false,\s*reviewCount:\s*0,\s*masteryLevel:\s*0)/g;
  
  console.log('正在查找缺少usageScenario的句子...');
  
  fixedContent = fixedContent.replace(sentencePattern, (match, before, category, after) => {
    console.log('找到句子，类别:', category);
    const usageScenario = categoryToUsageScenario[category];
    if (usageScenario) {
      fixedCount++;
      console.log(`修复句子 ${fixedCount}: ${category} -> ${usageScenario}`);
      return `${before}, usageScenario: '${usageScenario}', ${after}`;
    } else {
      console.log(`未找到映射: ${category}`);
    }
    return match;
  });
  
  console.log(`修复了 ${fixedCount} 个句子的 usageScenario 字段`);
  return fixedContent;
}

// 执行修复
console.log('开始修复 usageScenario 字段...');
const fixedContent = fixUsageScenario(content);

// 写回文件
console.log('正在写回文件...');
fs.writeFileSync(sentencesPath, fixedContent, 'utf8');
console.log('修复完成！文件已更新。');

// 验证修复结果
console.log('\n验证修复结果...');
const verificationContent = fs.readFileSync(sentencesPath, 'utf8');
const missingUsageScenario = verificationContent.match(/category:\s*'[^']+'[^}]*mastered:\s*false,\s*reviewCount:\s*0,\s*masteryLevel:\s*0/g);

if (missingUsageScenario) {
  console.log(`仍有 ${missingUsageScenario.length} 个句子缺少 usageScenario 字段`);
} else {
  console.log('✓ 所有句子都已包含 usageScenario 字段');
} 