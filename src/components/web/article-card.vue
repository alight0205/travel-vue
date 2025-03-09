<!-- src/components/ArticleItem.vue -->
<script setup lang="ts">
import { defineProps } from 'vue'
import type { articleRes} from '@/types/artrcle'
import dayjs from 'dayjs'

const props = defineProps<{
  data: articleRes // 根据实际类型定义
  index: number
}>()

const formatTime = (time: string) => {
  return dayjs.unix(Number(time)).format('YYYY-MM-DD HH:mm')
}
</script>

<template>
  <div class="article_item">
    <div class="user_info">
      <div class="info_left">
        <a-avatar :image-url="data.user_avatar" />
        <span class="username">{{ data.user_name }}</span>
      </div>
      <span class="info_right">{{ formatTime(data.published_at) }}</span>
    </div>
    
    <div class="article_info">
      <div class="article_cover_wrapper">
        <a-image
          class="article_cover"
          :src="data.cover"
          :preview="false"
        />
      </div>
      <div class="article_desc">
        <h3 class="title">{{ data.title }}</h3>
        <p class="content">{{ data.desc }}</p>
        <div class="stats">
          <span>阅读 {{ data.read_num }}</span>
          <span>点赞 {{ data.like_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 迁移原有样式到这里 */
.article_item {
  padding: 16px;
  background: var(--color-bg-2);
  border-radius: 8px;
  margin-bottom: 12px;
  
  .user_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    
    .info_left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .article_info {
    display: flex;
    gap: 16px;
    
    .article_cover_wrapper {
      width: 200px;
      height: 110px;
      /* 保持原有图片样式 */
    }
    
    .article_desc {
      flex: 1;
      /* 保持原有描述样式 */
    }
  }
}
</style>