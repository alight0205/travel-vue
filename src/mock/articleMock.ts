import type { articleRes } from '@/types/artrcle'
import {userListMock} from '@/mock/userMock'
import {siteListMock} from '@/mock/siteMock'
import {articleCommentsMockList} from '@/mock/commentsMock'
import {tagListMock} from '@/mock/tagMock'
export const initArticleFormMock = <articleRes>{
    id: 0,
    // 文章标题，必填
    title: "",
    // 文章描述，选填，文章的简短描述
    desc: "",
    // 封面图片，选填，文章的封面图URL
    cover: "",
    // 文章内容，必填
    content: "",
    // 阅读数，必填，文章的初始阅读数
    read_num: 0,
    // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
    is_banner: 0,
    // 创建时间，必填，文章的创建时间（ISO 8601格式）
    created_at: "",
    // 更新时间，必填，文章的更新时间（ISO 8601格式）
    updated_at: "",
    user_id:0,
    // 标签信息
    tags:[],
    // 审核状态（0-未通过，1-已通过，默认为1）
    examine_status: 1, 
}


export const articleMockList = <articleRes[]>[
    {
        id: 1,
        // 文章标题，必填
        title: "测试标题1",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介1，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "http://image.fengfengzhidao.com/gvb_1009/20231123092743__1123-h.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")adasdasdasdasdasdasdasdasdasdasdasda',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 1, 
    },
    {
        id: 2,
        // 文章标题，必填
        title: "测试标题2",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介2，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/jx/wallhaven-jxm1mw.jpg",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1746926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1746926630",
        // 省份代码
        province_code: 370000,
        // 城市代码
        city_code: 370200,
        // 省份代码
        site : siteListMock[2],
        // 用户信息
        user: userListMock[2],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[3],
            tagListMock[4],
            tagListMock[5]
        ],
        examine: 1, 
    },
    {
        id: 3,
        // 文章标题，必填
        title: "测试标题3",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介3，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 1, 
    },
    {
        id: 4,
        // 文章标题，必填
        title: "测试标题4",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介4，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 0, 
    },
    {
        id: 5,
        // 文章标题，必填
        title: "测试标题5",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介5，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 0, 
    },
    {
        id: 6,
        // 文章标题，必填
        title: "测试标题6",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介6，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 1, 
    },
    {
        id: 7,
        // 文章标题，必填
        title: "测试标题7",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介7，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 0, 
    },
    {
        id: 8,
        // 文章标题，必填
        title: "测试标题8",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介8，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 0, 
    },
    {
        id: 9,
        // 文章标题，必填
        title: "测试标题9",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介9，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 1, 
    },
    {
        id: 10,
        // 文章标题，必填
        title: "测试标题10",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介10，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 1, 
    },
    {
        id: 11,
        // 文章标题，必填
        title: "测试标题11",
        // 文章描述，选填，文章的简短描述
        desc: "这是一个测试简介11，包含简介介绍，是文章的内容的概括和预览。",
        // 封面图片，选填，文章的封面图URL
        cover: "https://w.wallhaven.cc/full/ex/wallhaven-exj7kl.png",
        // 文章内容，必填
        content: '# 在线 MarkDown 编辑器\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\nMarkdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。\nMarkdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。\nMarkdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。\nMarkdown 编写的文档后缀为 `.md` 或 `.markdown`。\n## MarkDown 效果及格式示例\n**目录 (Table of Contents)**\n[TOCM]\n[TOC]\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")',
        // 阅读数，必填，文章的初始阅读数
        read_num: 500,
        // 是否为首页横幅，选填，1表示是首页横幅，0表示不是
        is_banner: 1,
        // 创建时间，必填，文章的创建时间（ISO 8601格式）
        created_at: "1546926630",
        // 更新时间，必填，文章的更新时间（ISO 8601格式）
        updated_at: "1546926630",
        // 省份代码
        site : siteListMock[1],
        // 用户信息
        user: userListMock[1],
        // 评论列表
        comments: articleCommentsMockList,
        // 标签信息
        tag:[
            tagListMock[0],
            tagListMock[1]
        ],
        examine: 1, 
    },
    
]