const fs = require('fs');

// 读取sentences.ts文件
const sentencesPath = './src/data/sentences.ts';
const content = fs.readFileSync(sentencesPath, 'utf8');

console.log('=== 检查剩余的缺少usageScenario字段的句子 ===\n');

// 查找所有缺少usageScenario的句子
const sentencePattern = /(\{\s*id:\s*(\d+)[^}]*category:\s*'([^']+)'[^}]*)(mastered:\s*false,\s*reviewCount:\s*0,\s*masteryLevel:\s*0)/g;

let match;
const missingSentences = [];

while ((match = sentencePattern.exec(content)) !== null) {
  const id = match[2];
  const category = match[3];
  missingSentences.push({ id, category });
}

console.log(`找到 ${missingSentences.length} 个缺少usageScenario字段的句子:\n`);

// 按类别分组统计
const categoryStats = {};
missingSentences.forEach(sentence => {
  categoryStats[sentence.category] = (categoryStats[sentence.category] || 0) + 1;
});

console.log('按类别统计:');
Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`  ${category}: ${count}个`);
});

console.log('\n前10个句子的详细信息:');
missingSentences.slice(0, 10).forEach(sentence => {
  console.log(`  ID: ${sentence.id}, 类别: ${sentence.category}`);
});

// 检查是否有新的类别需要添加到映射表中
const existingCategories = new Set(Object.keys(categoryStats));
console.log('\n这些类别需要添加到映射表中:');
existingCategories.forEach(category => {
  console.log(`  '${category}': '待定',`);
}); 