// 学习提醒工具类：管理学习提醒的设置、存储和显示逻辑
export class StudyReminder {
  // 本地存储中提醒设置的键名
  private static readonly REMINDER_KEY = 'bai-juzhan-reminder';

  // 设置学习提醒的静态方法
  static setReminder(hour: number, minute: number): void {
    // 创建提醒时间对象
    const reminderTime = new Date();
    reminderTime.setHours(hour, minute, 0, 0); // 设置小时、分钟，秒和毫秒设为0
    
    // 如果设置的时间已经过了，则设置为明天同一时间
    if (reminderTime.getTime() <= Date.now()) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    // 构建提醒数据对象
    const reminderData = {
      time: reminderTime.getTime(), // 提醒时间戳
      enabled: true                  // 启用状态
    };

    // 将提醒设置保存到本地存储
    localStorage.setItem(this.REMINDER_KEY, JSON.stringify(reminderData));
  }

  // 获取提醒设置的静态方法
  static getReminder(): { time: number; enabled: boolean } | null {
    // 从本地存储中获取提醒数据
    const data = localStorage.getItem(this.REMINDER_KEY);
    // 如果存在数据则解析返回，否则返回null
    return data ? JSON.parse(data) : null;
  }

  // 禁用提醒的静态方法
  static disableReminder(): void {
    // 获取当前的提醒设置
    const data = this.getReminder();
    if (data) {
      // 将启用状态设为false
      data.enabled = false;
      // 保存更新后的设置到本地存储
      localStorage.setItem(this.REMINDER_KEY, JSON.stringify(data));
    }
  }

  // 判断是否应该显示提醒的静态方法
  static shouldShowReminder(): boolean {
    // 获取提醒设置
    const reminder = this.getReminder();
    // 如果没有设置或已禁用，则不显示
    if (!reminder || !reminder.enabled) return false;

    // 获取当前时间
    const now = Date.now();
    // 获取上次显示提醒的时间
    const lastShown = localStorage.getItem('bai-juzhan-last-reminder');
    const lastShownTime = lastShown ? parseInt(lastShown) : 0;

    // 如果距离上次提醒不足1小时，不显示（避免频繁打扰）
    if (now - lastShownTime < 60 * 60 * 1000) return false;

    // 检查是否到了提醒时间
    return now >= reminder.time;
  }

  // 标记提醒已显示的静态方法
  static markReminderShown(): void {
    // 将当前时间保存为上次显示提醒的时间
    localStorage.setItem('bai-juzhan-last-reminder', Date.now().toString());
  }
} 