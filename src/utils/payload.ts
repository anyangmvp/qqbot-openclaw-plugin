/**
 * QQBot 结构化消息载荷工具
 * 
 * 用于处理 AI 输出的结构化消息载荷，包括：
 * - 媒体消息载荷 (media)
 */

// ============================================
// 类型定义
// ============================================

/**
 * 媒体消息载荷
 */
export interface MediaPayload {
  type: 'media';
  /** 媒体类型：image, audio, video */
  mediaType: 'image' | 'audio' | 'video';
  /** 来源类型：url 或 file */
  source: 'url' | 'file';
  /** 媒体路径或 URL */
  path: string;
  /** 媒体描述（可选） */
  caption?: string;
}

/**
 * QQBot 载荷联合类型
 */
export type QQBotPayload = MediaPayload;

/**
 * 解析结果
 */
export interface ParseResult {
  /** 是否为结构化载荷 */
  isPayload: boolean;
  /** 解析后的载荷对象（如果是结构化载荷） */
  payload?: QQBotPayload;
  /** 原始文本（如果不是结构化载荷） */
  text?: string;
  /** 解析错误信息（如果解析失败） */
  error?: string;
}

// ============================================
// 常量定义
// ============================================

/** AI 输出的结构化载荷前缀 */
const PAYLOAD_PREFIX = 'QQBOT_PAYLOAD:';



// ============================================
// 解析函数
// ============================================

/**
 * 解析 AI 输出的结构化载荷
 * 
 * 检测消息是否以 QQBOT_PAYLOAD: 前缀开头，如果是则提取并解析 JSON
 * 
 * @param text AI 输出的原始文本
 * @returns 解析结果
 * 
 * @example
 * const result = parseQQBotPayload('QQBOT_PAYLOAD:\n{"type": "media", "mediaType": "image", ...}');
 * if (result.isPayload && result.payload) {
 *   // 处理结构化载荷
 * }
 */
export function parseQQBotPayload(text: string): ParseResult {
  const trimmedText = text.trim();
  
  // 检查是否以 QQBOT_PAYLOAD: 开头
  if (!trimmedText.startsWith(PAYLOAD_PREFIX)) {
    return {
      isPayload: false,
      text: text
    };
  }
  
  // 提取 JSON 内容（去掉前缀）
  const jsonContent = trimmedText.slice(PAYLOAD_PREFIX.length).trim();
  
  if (!jsonContent) {
    return {
      isPayload: true,
      error: '载荷内容为空'
    };
  }
  
  try {
    const payload = JSON.parse(jsonContent) as QQBotPayload;
    
    // 验证必要字段
    if (!payload.type) {
      return {
        isPayload: true,
        error: '载荷缺少 type 字段'
      };
    }
    
    // 根据 type 进行额外验证
    if (payload.type === 'media') {
      if (!payload.mediaType || !payload.source || !payload.path) {
        return {
          isPayload: true,
          error: 'media 载荷缺少必要字段 (mediaType, source, path)'
        };
      }
    }
    
    return {
      isPayload: true,
      payload
    };
  } catch (e) {
    return {
      isPayload: true,
      error: `JSON 解析失败: ${e instanceof Error ? e.message : String(e)}`
    };
  }
}



// ============================================
// 辅助函数
// ============================================

/**
 * 判断载荷是否为定时提醒类型
 */
/**
 * 判断载荷是否为媒体消息类型
 */
export function isMediaPayload(payload: QQBotPayload): payload is MediaPayload {
  return payload.type === 'media';
}
