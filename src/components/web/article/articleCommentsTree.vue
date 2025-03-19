<script setup lang="ts">
import type { CommentTreeType } from "@/types/comments";
import { dateCurrentFormat } from "@/utils/date";
import { nextTick, ref } from "vue";
import { createCommentApi, userDeleteCommentApi } from "@/api/comments";
import { Message } from "@arco-design/web-vue";
import { userStore } from "@/stores/user-store";
// import F_label from "@/components/common/f_label.vue";
// import {relationOptions} from "@/options/options";
import { IconDelete } from "@arco-design/web-vue/es/icon";
import commentsTree from '@/components/web/article/articleCommentsTree.vue'
import router from "@/router";
// import {goUser} from "@/utils/go_router";

const store = userStore()

interface Props {
  list: CommentTreeType[]
  line?: number
}

const emits = defineEmits(["ok"])
const props = defineProps<Props>()

function apply(item: CommentTreeType) {
  item.isApply = !item.isApply
  if (!item.isApply) {
    return
  }
  nextTick(() => {
    const div = document.querySelector(`.apply_comment_ipt_${item.id} input`) as HTMLInputElement
    div.focus()
  })
}

async function applyComment(item: CommentTreeType) {
  if (item.applyContent?.trim() === "") {
    Message.warning("请输入回复内容")
    return
  }

  const res = await createCommentApi({
    content: item.applyContent as string,
    article_id: item.article_id,
    comment_id: item.id,
    user_id: item.creator,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok")
}

function ok() {
  emits("ok")
}



async function remove(item: CommentTreeType) {
  const res = await userDeleteCommentApi(item.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok")
}

const goUserDetail = (id: number) => {
  router.push({ name: 'userDetail', query: { id } })
}
</script>

<template>
  <a-comment class="comment_tree_com" :content="item.content" v-for="item in props.list"
    :datetime="dateCurrentFormat(item.created_at)">
    <template #actions>
      <span class="action">
        <IconHeart /> 点赞
      </span>
      <span class="action" @click="apply(item)">
        <i class="iconfont icon-pinglun1"></i> 回复{{ item.subComments?.length }}
      </span>
      <a-popconfirm content="确定要删除此评论吗？" @ok="remove(item)">
        <span class="action" v-if="item.creator === store.userInfo.id">
          <i>
            <IconDelete></IconDelete>
          </i>
          删除
        </span>
      </a-popconfirm>

    </template>
    <template #author>
      <span>{{ item.nickname }}</span>
    </template>
    <template #avatar>
      <a-avatar :image-url="item.avatar" @click="goUserDetail(item.creator)"></a-avatar>
    </template>
    <div class="apply_comment" v-if="item.isApply">
      <a-input v-model="item.applyContent" :class="`apply_comment_ipt_${item.id}`"
        :placeholder="`回复${item.nickname}`"></a-input>
      <a-button type="primary" @click="applyComment(item)">回复</a-button>
    </div>
    <commentsTree :line="props.line as number + 1" @ok="ok" :list="item.subComments" v-if="item.subComments?.length">
    </commentsTree>
  </a-comment>
</template>

<style lang="less">
.comment_tree_com {
  .action {
    cursor: pointer;

    &:hover {
      color: rgb(var(--arcoblue-5));
    }

    &.active {
      color: rgb(var(--arcoblue-6));
    }
  }

  .apply_comment {
    display: flex;
    align-items: center;

    .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>