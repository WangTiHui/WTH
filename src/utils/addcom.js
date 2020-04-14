import { Message } from "element-ui";

export default function addcom(pages, item) {
  //1.page为字符串（特殊页面）禁止插入**

  //2.进行组件数量与样式数量校验**

  //3.进行格式校验

  //4.特殊组件进行特殊处理
  //(1) 组件id为1、6固定放在head中，1顺序高于2，禁止拖动**
  //(2) 组件id为26、29固定放在body最底层，且只能最多有一个，且禁止拖动
  //(3) 其余组件从body最后开始插入，若存在主商品板块和限时抢购板块则插在它们的前面

  if (typeof pages === "string") {
    Message.error("当前页面不可以进行装修");
    return;
  }
  // item = JSON.parse(JSON.stringify(item));

  let component_id = item.parent_id;
  let flag = false;
   if(component_id==16){
       if(item.config_list.filter(v=>v.config.image!="").length<2) {
           return  Message.error("至少上传2张图片");
       }
   }
   if((item.parent_title_english=="GoodsFields"||item.parent_title_english=="InlineGoodsFields")
       &&item.config_list[0]["config"]["data"]["id"]==""
   ){
     return Message.error("请选择商品模板！");
   }
  if (component_id == 1) {
      console.log(pages.head,"莫安特特")
    pages.head.find(v => v.parent_id == component_id)
      ? (flag = true)
      : pages.head.unshift(filteritem(item));
  } else if (component_id == 6) {
    pages.head.find(v => v.parent_id == component_id)
      ? (flag = true)
      : pages.head.push(filteritem(item));
  } else if (component_id == 26) {
     if (pages.body.find(v => v.parent_id == 29)){
      return Message.error("限时抢购和主商品板块只能添加一个！");
    }else{
      pages.body.find(v => v.parent_id == 26)
          ? (flag = true)
          : pages.body.push(filteritem(item));
    }
  }else if(component_id == 29){
    if (pages.body.find(v => v.parent_id == 26)){
      return Message.error("限时抢购和主商品板块只能添加一个！");
    }else{
      pages.body.filter(v => v.parent_id == component_id).length <
      item.parent_num_limit
          ? pages.body.push(filteritem(item))
          : (flag = true);
    }
  }else if(pages.body.find(v => v.parent_id == 29 || v.parent_id==26)){
      pages.body.filter(v => v.parent_id == component_id).length <
      item.parent_num_limit
          ? pages.body.splice(pages.body.length-1,0,filteritem(item))
          : (flag = true);
    }else{
      pages.body.filter(v => v.parent_id == component_id).length <
      item.parent_num_limit
          ? pages.body.push(filteritem(item))
          : (flag = true);

    }

 var component_type = {
      HeaderBar:"顶部导航",
     ClassificationList:"头部侧滑",
     Carousel:"banner图",
     ModuleList:"多眼导航",
     AdvBanner:"滑动面板",
     ImageModule:"图片",
     InlineGoodsFields:"横向商品滑动",
     GoodsFields:"主商品板块",
     HeadlineBroadcast:"头条播报",
     FlashSale:"限时抢购"
  }
  if (flag) {

    Message.error(`每个页面最多添加${item.parent_num_limit}个${component_type[item["parent_title_english"]]}`);
  } else {

    Message.success("添加成功！");
    setTimeout(() => {
      let ele = document.getElementById("decoration-body");
      ele.scrollTop = ele.scrollHeight;
    }, 20);
  }
}

export function filteritem(item) {
  return {
    id: item.id,
    parent_id: item.parent_id,
    parent_component_type: item.parent_component_type,
    config_list: JSON.parse(JSON.stringify(item.config_list)),
    parent_title_english: item.parent_title_english
  };
}
