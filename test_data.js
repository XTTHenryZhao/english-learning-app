// 测试脚本：检查句子数据和用户设置的数据匹配情况
const fs = require('fs');

// 读取句子数据
const sentencesPath = './src/data/sentences.ts';
const extendedSentencesPath = './src/data/extendedSentences.ts';

console.log('=== 数据匹配测试 ===\n');

// 检查句子数据中的usageScenario值
function checkUsageScenarios() {
  console.log('1. 检查句子数据中的usageScenario值:');
  
  try {
    // 读取sentences.ts
    if (fs.existsSync(sentencesPath)) {
      const sentencesContent = fs.readFileSync(sentencesPath, 'utf8');
      const usageScenarioMatches = sentencesContent.match(/usageScenario:\s*'([^']+)'/g);
      if (usageScenarioMatches) {
        const uniqueScenarios = [...new Set(usageScenarioMatches.map(match => match.match(/'([^']+)'/)[1]))];
        console.log('   sentences.ts 中的 usageScenario 值:', uniqueScenarios);
      }
    }
    
    // 读取extendedSentences.ts
    if (fs.existsSync(extendedSentencesPath)) {
      const extendedContent = fs.readFileSync(extendedSentencesPath, 'utf8');
      const usageScenarioMatches = extendedContent.match(/usageScenario:\s*'([^']+)'/g);
      if (usageScenarioMatches) {
        const uniqueScenarios = [...new Set(usageScenarioMatches.map(match => match.match(/'([^']+)'/)[1]))];
        console.log('   extendedSentences.ts 中的 usageScenario 值:', uniqueScenarios);
      }
    }
  } catch (error) {
    console.log('   读取文件失败:', error.message);
  }
}

// 检查用户设置中的usageScenarioGoals值
function checkUserSettings() {
  console.log('\n2. 检查用户设置中的usageScenarioGoals值:');
  
  try {
    const storePath = './src/store/useStore.ts';
    if (fs.existsSync(storePath)) {
      const storeContent = fs.readFileSync(storePath, 'utf8');
      const usageScenarioGoalsMatch = storeContent.match(/usageScenarioGoals:\s*{([^}]+)}/);
      if (usageScenarioGoalsMatch) {
        console.log('   用户设置中的 usageScenarioGoals:', usageScenarioGoalsMatch[1]);
      }
    }
  } catch (error) {
    console.log('   读取文件失败:', error.message);
  }
}

// 检查学习逻辑
function checkLearningLogic() {
  console.log('\n3. 检查学习逻辑中的使用场景选择:');
  
  try {
    const storePath = './src/store/useStore.ts';
    if (fs.existsSync(storePath)) {
      const storeContent = fs.readFileSync(storePath, 'utf8');
      
      // 检查hasUsageScenarioSelection的逻辑
      const hasUsageScenarioSelectionMatch = storeContent.match(/hasUsageScenarioSelection\s*=\s*Object\.values\(usageScenarioGoals\)\.some\(v\s*=>\s*v\)/);
      if (hasUsageScenarioSelectionMatch) {
        console.log('   ✓ hasUsageScenarioSelection 逻辑正确');
      } else {
        console.log('   ✗ hasUsageScenarioSelection 逻辑可能有问题');
      }
      
      // 检查使用场景选择的执行条件
      const usageScenarioConditionMatch = storeContent.match(/if\s*\(hasUsageScenarioSelection\s*&&\s*result\.length\s*<\s*state\.settings\.dailyGoal\)/);
      if (usageScenarioConditionMatch) {
        console.log('   ✓ 使用场景选择执行条件正确');
      } else {
        console.log('   ✗ 使用场景选择执行条件可能有问题');
      }
    }
  } catch (error) {
    console.log('   读取文件失败:', error.message);
  }
}

// 执行测试
checkUsageScenarios();
checkUserSettings();
checkLearningLogic();

console.log('\n=== 测试完成 ==='); 