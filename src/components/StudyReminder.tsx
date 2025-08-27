// 导入React核心库和生命周期钩子
import React, { useState, useEffect } from 'react';
// 导入Ant Design组件库的UI组件
import { Modal, Button, TimePicker, Switch, message } from 'antd';
// 导入Ant Design图标库中的铃铛图标
// import { BellOutlined } from '@ant-design/icons';
// 导入学习提醒工具类
import { StudyReminder } from '../utils/reminderUtils.ts';
// 导入日期时间处理库
import dayjs from 'dayjs';

// 定义组件的属性接口
interface StudyReminderProps {
  visible: boolean;    // 控制弹窗的显示状态
  onClose: () => void; // 关闭弹窗的回调函数
}

// 学习提醒设置组件：用于配置学习提醒的时间和启用状态
const StudyReminderComponent: React.FC<StudyReminderProps> = ({ visible, onClose }) => {
  // 提醒时间状态，默认设置为上午9点
  const [reminderTime, setReminderTime] = useState<dayjs.Dayjs>(dayjs().hour(9).minute(0));
  // 提醒启用状态，默认关闭
  const [reminderEnabled, setReminderEnabled] = useState(false);

  // 组件挂载时从本地存储加载提醒设置
  useEffect(() => {
    // 获取已保存的提醒设置
    const reminder = StudyReminder.getReminder();
    if (reminder) {
      // 如果存在设置，则更新状态
      setReminderTime(dayjs(reminder.time));
      setReminderEnabled(reminder.enabled);
    }
  }, []); // 空依赖数组表示只在组件挂载时执行一次

  // 处理保存提醒设置的函数
  const handleSaveReminder = () => {
    if (reminderEnabled) {
      // 如果启用了提醒，则设置提醒时间
      StudyReminder.setReminder(reminderTime.hour(), reminderTime.minute());
      // 显示成功提示消息
      message.success('学习提醒已设置');
    } else {
      // 如果禁用了提醒，则关闭提醒功能
      StudyReminder.disableReminder();
      // 显示成功提示消息
      message.success('学习提醒已关闭');
    }
    // 关闭设置弹窗
    onClose();
  };

  // 渲染提醒设置弹窗
  return (
    <Modal
      // 弹窗标题
      title="学习提醒设置"
      // 控制弹窗的显示状态
      open={visible}
      // 点击取消按钮或遮罩层时的处理函数
      onCancel={onClose}
      // 弹窗底部按钮区域
      footer={[
        // "取消"按钮
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        // "保存"主要按钮
        <Button key="save" type="primary" onClick={handleSaveReminder}>
          保存
        </Button>
      ]}
    >
      {/* 提醒设置内容区域 */}
      <div style={{ marginBottom: '1rem' }}>
        {/* 启用提醒的开关设置 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span>启用学习提醒</span>
          <Switch 
            checked={reminderEnabled} 
            onChange={setReminderEnabled}
          />
        </div>
        
        {/* 只有在启用提醒时才显示时间选择器 */}
        {reminderEnabled && (
          <div>
            <div style={{ marginBottom: '0.5rem' }}>提醒时间：</div>
            {/* 时间选择器，用于设置提醒时间 */}
            <TimePicker
              value={reminderTime}
              onChange={(time) => time && setReminderTime(time)}
              format="HH:mm"
              style={{ width: '100%' }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StudyReminderComponent; 