// 全局站点常量
export const SITE = {
  name: 'KCHub',
  title: 'KCHub · 我们的家庭数字中枢',
  description:
    'KCHub 是 Kang 和 Chen 的家庭数字中枢——由 Agent 驱动，把调研、攻略、家庭数据串联成一个会自我修复的小宇宙。',
  url: 'https://kchub.cn',
  author: 'Kang & Chen',
  email: 'hi@kchub.cn',
  since: 2026,
  locale: 'zh-CN',
} as const;

export const NAV = [
  { label: '首页', href: '/' },
  { label: '愿景', href: '/vision' },
  { label: '能力', href: '/capabilities' },
  { label: '架构', href: '/architecture' },
  { label: '技术', href: '/tech' },
  { label: '路线图', href: '/roadmap' },
  { label: '关于', href: '/about' },
  { label: '留言', href: '/contact' },
] as const;
