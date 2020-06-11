export default [
  {
    type: "tabbar",
    config: {
      active_icon:
        "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/952f174c8ebead1955e8f11d2b5d6dba.png",
      unactive_icon:
        "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/f7eaed84388af223eb21a42b29539398.png",
      business_id: 1
    },
    pages: {
      head: [
        {
          id: "2",
          parent_id: "1",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/f697c3763a0fff29ba8d93bca680e73e.png",
                title: "消息",
                function: {
                  id: "4",
                  type: "static",
                  title: "消息",
                  image: "",
                  data: { name: "messagemain" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/d5f3dcfe7f10c387338e8e9d8510df79.png",
                title: "购物车",
                function: {
                  id: "7",
                  type: "static",
                  title: "淘宝购物车",
                  image: "",
                  data: { name: "cart" }
                }
              }
            }
          ],
          parent_title_english: "HeaderBar"
        },
        {
          id: "7",
          parent_id: "6",
          parent_component_type: "basic",
          config_list: [
            {
              type: "checkbox",
              config: {
                data: [
                  {
                    id: "356",
                    name: "女装",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2oX82HL9TBuNjy0FcXXbeiFXa-2053469401.png"
                  },
                  {
                    id: "375",
                    name: "美食",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2PFV2HL9TBuNjy0FcXXbeiFXa-2053469401.png"
                  },
                  {
                    id: "391",
                    name: "美妆",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2QybZHL1TBuNjy0FjXXajyXXa-2053469401.png"
                  },
                  {
                    id: "411",
                    name: "居家",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2FCJnHFGWBuNjy0FbXXb4sXXa-2053469401.png"
                  },
                  {
                    id: "424",
                    name: "男装",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2n7WyHN9YBuNjy0FfXXXIsVXa-2053469401.png"
                  },
                  {
                    id: "439",
                    name: "鞋品",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2g79yHN9YBuNjy0FfXXXIsVXa-2053469401.png"
                  },
                  {
                    id: "452",
                    name: "数码家电",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB230SXHL9TBuNjy1zbXXXpepXa-2053469401.png"
                  },
                  {
                    id: "465",
                    name: "母婴",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2QMv0ay6guuRjy1XdXXaAwpXa-2053469401.png"
                  },
                  {
                    id: "475",
                    name: "箱包",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB27Cw.HwaTBuNjSszfXXXgfpXa-2053469401.png"
                  },
                  {
                    id: "486",
                    name: "文娱车品",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB21.plHQKWBuNjy1zjXXcOypXa-2053469401.png"
                  },
                  {
                    id: "495",
                    name: "配饰",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2i36ZazfguuRjy1zeXXb0KFXa-2053469401.png"
                  },
                  {
                    id: "505",
                    name: "内衣",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2cnZWzfiSBuNkSnhJXXbDcpXa-2053469401.png"
                  },
                  {
                    id: "514",
                    name: "家装家纺",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2uI3VzcyYBuNkSnfoXXcWgVXa-2053469401.png"
                  },
                  {
                    id: "525",
                    name: "户外运动",
                    icon:
                      "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/TB2rrnsHH9YBuNjy0FgXXcxcXXa-2053469401.png"
                  }
                ]
              }
            }
          ],
          parent_title_english: "ClassificationList"
        }
      ],
      body: [
        {
          id: "10",
          parent_id: "9",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/6374a1878cbe0f354b9196c1ad5c0714.png",
                title: "",
                function: {
                  id: "13",
                  type: "channel",
                  title: "聚划算",
                  image:
                    "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/juhuasuan.png",
                  data: { url: "https://jhs.m.taobao.com" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/16063ed15f46173ae241e03aae7a0400.png",
                title: "",
                function: {
                  id: "6",
                  type: "static",
                  title: "今日疯抢榜",
                  image: "",
                  data: { name: "hotlist" }
                }
              }
            }
          ],
          parent_title_english: "Carousel"
        },
        {
          id: "35",
          parent_id: "28",
          parent_component_type: "function",
          config_list: [],
          parent_title_english: "HeadlineBroadcast"
        },
        {
          id: "14",
          parent_id: "11",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/1c956506bfae08ed2bce3d28ccc7b6eb.png",
                title: "淘宝",
                function: {
                  id: "17",
                  title: "淘宝联盟",
                  type: "module",
                  image: "",
                  data: { id: "17" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/7b836efeb2b947dbe39aa555c6881277.png",
                title: "天猫专场",
                function: {
                  id: "11",
                  type: "channel",
                  title: "天猫精选",
                  image:
                    "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/tianmaojingxuan.png",
                  data: { url: "http://jx.tmall.com/" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/ada2b81855c5bb1f53194817e78c8805.png",
                title: "天猫国际",
                function: {
                  id: "9",
                  type: "channel",
                  title: "天猫国际",
                  image:
                    "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/tianmaoguoji.png",
                  data: { url: "https://www.tmall.hk/" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/46f4386342e7f42fd8c80ccf0dc28e94.png",
                title: "帮抖",
                function: {
                  id: "2",
                  type: "static",
                  title: "帮抖",
                  image: "",
                  data: { name: "tikTok" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/9ccbefe0172cd1a6717d9d9433ad398b.png",
                title: "淘宝直播",
                function: null
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/3a154087df4b3ab7e2acf8094ec56a55.png",
                title: "9.9包邮",
                function: {
                  id: "11",
                  title: "9.5包邮",
                  type: "module",
                  image: "",
                  data: { id: "11" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/17c86a4e3d93992237a0be3886b5e580.png",
                title: "限时抢购",
                function: null
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/00c727b488cd1e5cb26ce5f9f810d18d.png",
                title: "超级搜索",
                function: {
                  id: "1",
                  type: "static",
                  title: "超级搜索",
                  image: "",
                  data: { name: "supersearch" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/0bed310a83d11825129536df03082a14.png",
                title: "qq",
                function: { name: "h5链接", url: "http://www.qq.com" }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/2309ec1d3cdb272a615eea28008e3446.png",
                title: "微信",
                function: { name: "h5链接", url: "http://www.wechat.com" }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/509ae89859faea1daf6e6630f8b4cd8c.png",
                title: "朋友圈",
                function: null
              }
            }
          ],
          parent_title_english: "ModuleList"
        },
        {
          id: "17",
          parent_id: "16",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/38585d1b700087a56e146b42e4b26bdc.png",
                title: "",
                function: null
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/16063ed15f46173ae241e03aae7a0400.png",
                title: "",
                function: {
                  id: "5",
                  type: "static",
                  title: "素材",
                  image: "",
                  data: { name: "sucai" }
                }
              }
            }
          ],
          parent_title_english: "AdvBanner"
        },
        {
          id: "23",
          parent_id: "18",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/872b83421fec03d2c3cf6b15aac79bbf.png",
                title: "",
                function: {
                  id: "11",
                  title: "9.5包邮",
                  type: "module",
                  image: "",
                  data: { id: "11" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/dcbf3bc52512eb9f8512982d72eafe9e.png",
                title: "",
                function: {
                  id: "7",
                  title: "好单库",
                  type: "module",
                  image: "",
                  data: { id: "7" }
                }
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/e0cb0dea09d459f664625587a8ce0868.png",
                title: "",
                function: {
                  id: "17",
                  title: "淘宝联盟",
                  type: "module",
                  image: "",
                  data: { id: "17" }
                }
              }
            }
          ],
          parent_title_english: "ImageModule"
        },
        {
          id: "20",
          parent_id: "18",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/a569f409533cb3f2a70398ce5de2b8db.png",
                title: "",
                function: null
              }
            },
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/d7ce1d4974267a975a7dd4a31fb217aa.png",
                title: "",
                function: {
                  id: "6",
                  type: "static",
                  title: "今日疯抢榜",
                  image: "",
                  data: { name: "hotlist" }
                }
              }
            }
          ],
          parent_title_english: "ImageModule"
        },
        {
          id: "25",
          parent_id: "24",
          parent_component_type: "basic",
          config_list: [{ type: "select", config: { id: "11" } }],
          parent_title_english: "InlineGoodsFields"
        },
        {
          id: "19",
          parent_id: "18",
          parent_component_type: "basic",
          config_list: [
            {
              type: "image",
              config: {
                image:
                  "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/16063ed15f46173ae241e03aae7a0400.png",
                title: "",
                function: {
                  id: "6",
                  type: "static",
                  title: "今日疯抢榜",
                  image: "",
                  data: { name: "hotlist" }
                }
              }
            }
          ],
          parent_title_english: "ImageModule"
        },
        {
          id: "36",
          parent_id: "29",
          parent_component_type: "function",
          config_list: [],
          parent_title_english: "FlashSale"
        }
      ]
    }
  },
  {
    type: "tabbar",
    config: {
      active_icon:
        "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/99bed7e7999bf6b17777bd09ab25ee20.png",
      unactive_icon:
        "https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/20191029/b4092b783a785971c58c556553b2d28e.png",
      business_id: 0
    },
    pages: "me"
  }
];
