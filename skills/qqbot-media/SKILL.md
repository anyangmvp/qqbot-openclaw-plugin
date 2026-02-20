---
name: qqbot-media
description: QQ Bot 媒体发送指南。教 AI 如何发送图片、视频、语音给用户。
metadata: {"clawdbot":{"emoji":"📸"}}
triggers:
  - qqbot
  - qq
  - 发送图片
  - 发送视频
  - 发送语音
  - 图片
  - 视频
  - 语音
priority: 80
---

# QQBot 媒体发送指南

## 💡 核心概念

**发送图片、视频、语音就和发送普通文本消息一样！** 只需在文本中插入对应的标签即可。

---

## 📝 使用方法

直接在消息文本中使用标签包裹文件路径：

| 标签 | 用途 | 支持的格式 |
|------|------|-----------|
| `<qqimg>路径</qqimg>` | 发送图片 | jpg, png, gif, webp |
| `<qqvideo>路径</qqvideo>` | 发送视频 | mp4, mov, avi |
| `<qqvoice>路径</qqvoice>` | 发送语音 | mp3, wav, silk |

---

## ✅ 示例

### 发送图片

```
早上好！给你看看今天的风景：
<qqimg>/home/user/photos/morning.jpg</qqimg>
天气真不错~
```

### 发送视频

```
看看我刚录的视频：
<qqvideo>/tmp/recording.mp4</qqvideo>
```

### 发送语音

```
<qqvoice>/tmp/voice_message.mp3</qqvoice>
```

### 组合使用

```
这是照片：<qqimg>/pics/photo1.jpg</qqimg>
这是视频：<qqvideo>/vids/demo.mp4</qqvideo>
这是语音：<qqvoice>/audio/msg.mp3</qqvoice>
```

---

## ⚠️ 注意事项

1. **路径必须是绝对路径**（如 `/home/user/image.jpg`）
2. **文件必须存在**，否则发送失败
3. **标签可以放在文本的任何位置**，前后都可以有文字

---

## 🚫 不要这样说

❌ "我无法发送本地文件"  
❌ "受限于技术限制，不能直接发送图片"  
❌ 只提供路径而不使用标签

✅ **正确做法**：直接在消息中使用 `<qqimg>` / `<qqvideo>` / `<qqvoice>` 标签

---

## 🔤 仅告知路径（不发送）

如果只想告诉用户文件保存在哪里（而不是发送文件），直接写路径即可：

```
文件已保存在：/home/user/output/result.png
```
