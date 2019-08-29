# API 文档

api 接口的话其实看源码更方便, 这里就简单提供一些常用的 api 文档, 方便自己批量上传等, 接口返回格式为:

| 参数名 |   成功   |   失败   |
| :----: | :------: | :------: |
|  code  |   200    |   -200   |
|  data  | 成功数据 |   null   |
|  msg   |   null   | 错误提示 |

## 导入动漫

- 链接:`/animate`
- 请求方式:`post`
- 需要登录:`是`

用 json 提交的数据, 具体格式如下:

```json
{
  "title": "进击的巨人", // 标题
  "slug": "av000001", // 别名, 唯一标识符
  "status": "publish", // 状态, 可选项:"draft", "publish", "reject"
  "information": {
    "introduce": "", // 简介
    "staff": "", // 工作人员
    "actor": "", // 声优
    "firstPlay": "20160606", // 首播日期 YYYYMMDD
    "isUpdate": false, // 是否连载
    "updateDay": 0, // 周几播放, 0~6:周日~周六
    "rateStar": 8, // 评分星级
    "rateCount": 1000, // 评分人数
    "impression": "", // 印象
    "eposideCount": 0 // 总集数
  },
  "play": {
    "kind": "mp4", // 播放类型, 三选一 ["mp4", "m3u8", "php"]
    "noPrefix": false, // 不使用设置的等级前缀
    "level": 0, // 等级限定
    "linkPrefix": "", // 链接前缀
    "downTitle": "百度云", // 下载标题
    "downLink": "https://baidu.com" // 下载链接
  },
  "eposide": [
    {
      "season": "第一季", // 季数
      "list": [
        {
          "title": "第一集", // 标题
          "link": "http://playxxxx", // 链接
          "danmu": 654785 // 弹幕ID
        }
      ]
    }
  ],
  "cover": {
    "vertical": "", // 竖向大图
    "horizontal": "" // 横向大图
  },
  "category": {
    "area": Schema.Types.ObjectId, // 地区分类, 填写对应的分类ID
    "kind": Schema.Types.ObjectId, // 类型分类
    "year": Schema.Types.ObjectId, // 年份分类
    "tag": ["百合", "萌妹子"] // 标签
  }
}
```
