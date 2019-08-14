---
home: true
---

<div class='bg'>
  <img class='bg-cover' :src="$withBase('/bg.png')">
</div>

<div class="content">
            <h1 class='title'>Qin Video</h1>
            <p class='info'>基于nodejs的动漫CMS系统</p>
            <div class="list">
              <router-link to="/docs/" class="action-button">使用文档</router-link>
               <a class='link-button' href='http://demo.qinvideo.org'>前端演示</a>
               <a class='link-button' href='http://demo.qinvideo.org/qinmei'>后端演示</a>
            </div>
          </div>

<style>
.bg{
  position:absolute;
  width:100vw;
  height:100vh;
  left:0;
  top:0;
}
.bg-cover{
  height:100%;
  background-position:center;
  background-size:cover;
  position:absolute;
  top:0;
  right:0;
  user-select:none;
}
.hero{
  display:none;
}

.content{
  position:relative;
  min-height:60vh;
  line-height:1;
  z-index:99;
  display:flex;
  flex-direction:column;
  justify-content: center;
}

.title{
  font-size:48px;
}
.info{
  font-size:22px;
}
.list{
  margin-top:40px;
}
.action-button{
    padding: 8px 20px 10px 20px;
    font-size: 16px;
    border-radius: 40px;
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    margin-right:15px;
}

.link-button{
    padding: 8px 20px 10px 20px;
    font-size: 16px;
    border-radius: 40px;
    color: rgba(0,0,0,0.65);
        border: 1px solid transparent;
    box-shadow: 0 2px 0 rgba(0,0,0,0.015);
    background-color: #fff;
    border-color: #d9d9d9;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    margin-right:15px;
}
</style>
