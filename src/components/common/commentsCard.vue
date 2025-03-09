<script setup lang="ts">
import { watch, ref } from 'vue';
import type { commentsRes } from '@/types/comments'
import { adminGetArticleDetailApi } from '@/api/article'
import { getUserApiDetail } from '@/api/user'
import type { articleRes } from '@/types/artrcle'
import type { whoamiResponse } from '@/types/user';
import { dataTemFormat } from '@/utils/date'
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  articleId: number;
  creator: number;
  currentComment: commentsRes;
}

const props = defineProps<Props>()
const userInfo = ref<whoamiResponse>()
const articleInfo = ref<articleRes>()
const getList = async () => {
  if (!props.articleId) return
  if (!props.creator) return
  const userRes = await getUserApiDetail(props.creator)
  if (userRes.code) return
  userInfo.value = userRes.data
  const articleRes = await adminGetArticleDetailApi(props.articleId)
  if (articleRes.code) return
  articleInfo.value = articleRes.data
  console.log(articleInfo.value)
  console.log(userInfo.value)
}
const like = ref(false);
const star = ref(false);
const onLikeChange = () => {
  like.value = !like.value;
};
const onStarChange = () => {
  star.value = !star.value;
};


// 监听两个 props 的变化
watch(
  [() => props.articleId, () => props.creator],
  () => {
    getList()
  },
  { immediate: true } // 可选参数：是否在组件挂载时立即执行
)
</script>


<template>
  <div class="commentCard">
    <div class="articleSection" @click="router.push(`/article/detail?id=${articleInfo?.id}`)">
      文章标题：{{ articleInfo?.title }}
    </div>
    <div class="commentSection">
      <a-comment :author="userInfo?.user.nickname" :content="props.currentComment?.content"
        :datetime="dataTemFormat(props.currentComment?.created_at || '2006-06-06', 'current')">
        <template #actions>
          <span class="action" key="heart" @click="onLikeChange">
            <span v-if="like">
              <IconHeartFill :style="{ color: '#f53f3f' }" />
            </span>
            <span v-else>
              <IconHeart />
            </span>
            {{ 83 + (like ? 1 : 0) }}
          </span>
          <span class="action" key="star" @click="onStarChange">
            <span v-if="star">
              <IconStarFill style="color: '#ffb400' " />
            </span>
            <span v-else>
              <IconStar />
            </span>
            {{ 3 + (star ? 1 : 0) }}
          </span>
          <span class="action" key="reply">
            <IconMessage /> Reply
          </span>
        </template>
        <template #avatar>
          <a-avatar>
            <img alt="avatar" :src="userInfo?.user.avatar" />
          </a-avatar>
        </template>
      </a-comment>
    </div>
  </div>
</template>

<style lang="less">
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}

.articleSection {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: @primary-6;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
  }
}
</style>