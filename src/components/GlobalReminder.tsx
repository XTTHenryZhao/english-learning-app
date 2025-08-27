// 导入React核心库和生命周期钩子
import React, { useEffect, useState } from 'react';
// 导入Ant Design组件库的UI组件
import { Modal, Button } from 'antd';
// 导入Ant Design图标库中的书本图标
import { BookOutlined } from '@ant-design/icons';
// 导入学习提醒工具类
import { StudyReminder } from '../utils/reminderUtils.ts';

// 全局提醒组件：在适当的时候提醒用户进行学习
const GlobalReminder: React.FC = () => {
  // 控制提醒弹窗的显示状态
  const [visible, setVisible] = useState(false);

  // 使用useEffect钩子来处理提醒逻辑
  useEffect(() => {
    // 检查是否应该显示提醒的函数
    const checkReminder = () => {
      if (StudyReminder.shouldShowReminder()) {
        // 如果应该显示提醒，则显示弹窗并标记为已显示
        setVisible(true);
        StudyReminder.markReminderShown();
      }
    };

    // 页面加载时立即检查一次
    checkReminder();

    // 设置定时器，每分钟检查一次是否需要显示提醒
    const interval = setInterval(checkReminder, 60 * 1000);

    // 清理函数：组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []); // 空依赖数组表示只在组件挂载时执行一次

  // 处理"开始学习"按钮点击事件
  const handleStartStudy = () => {
    // 关闭提醒弹窗
    setVisible(false);
    // 跳转到学习页面
    window.location.href = '/study';
  };

  // 处理"稍后再说"按钮点击事件
  const handleDismiss = () => {
    // 关闭提醒弹窗
    setVisible(false);
  };

  // 渲染提醒弹窗
  return (
    <Modal
      // 弹窗标题，包含书本图标和文字
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BookOutlined style={{ marginRight: '0.5rem', color: '#667eea' }} />
          学习提醒
        </div>
      }
      // 控制弹窗的显示状态
      open={visible}
      // 点击取消按钮或遮罩层时的处理函数
      onCancel={handleDismiss}
      // 弹窗底部按钮区域
      footer={[
        // "稍后再说"按钮
        <Button key="dismiss" onClick={handleDismiss}>
          稍后再说
        </Button>,
        // "开始学习"主要按钮
        <Button key="study" type="primary" onClick={handleStartStudy}>
          开始学习
        </Button>
      ]}
    >
      {/* 提醒内容 */}
      <p>该学习了！坚持每天学习，英语水平会快速提升的！</p>
    </Modal>
  );
};

export default GlobalReminder; 