# Cross World

在一个开放的世界中漫游、聊天。

类似游戏：Minecraft、VR Chat

## 整体设计

1. 用户操作
   1. 指定世界`World`，用用户名、密码登录，并且在登录时可以指定`TAG`
   2. 用户被带入这个世界
      1. 如果指定的`TAG`存在，那么就传送到`TAG`旁边
      2. 如果不存在，那么就随机传送，并且可以放置这个`TAG`到指定位置
   3. 用户接收世界信息
      1. 连接`WebSocket`
      2. 下载地图，查找当前区块的附近一共9个区块的信息，称为`附近区块`
      3. 接收附近区块内所有块的动态改变信息
      4. 接收附近区块内用户的所有操作
2. 用户形象
   1. 默认形象：胶囊/球（暂定？）
   2. 上传模型改变形象
   3. 跳起可以1.5格高，蹲下变成1格高
3. 模型（暂时无）
   1. 用户可以上传自定义模型（不允许过大）
   2. 静态模型可以放在地图内
   3. 给自己加上动态模型（有难度）
4. 地形
   1. 地形单位为“实体”，按照摆放位置分组
   2. 初始地形为三层
   3. 
5. 动作操作
   1. W/S/A/D/Shift/Space移动、跳跃、潜伏
   2. 触屏玩家用摇杆和十字星/点击（参考MC）
   3. 玩家的所有操作反映在本地的世界渲染，也上传世界
   4. 操作按照动作帧处理
   5. 动作帧
      1. 用户位置（由用户本地计算得出）
      2. 摄像头状态
      3. 其他
6. `TAG`
   1. 每一个`TAG`就是一个留言板/聊天室
   2. 关注的`TAG`可以接收消息
   3. `TAG`
7. 权限
   1. 分级
      1. 游客
      2. 注册者
      3. 玩家
      4. 管理员
      5. 站长
   2. 按照编号分配等级
8. MODS
   1. MOD加载系统
      1. 通过`websocket`服务器传输mod，游戏整体静态文件不变
      2. 当然也可以打包在静态文件中
      3. mod可以动态加载
      4. mod必须前后端配合
   2. MOD的执行
      1. 后端
         1. 流水线结构：按照序列执行
         2. 每一个环节都可以接触到服务器对每个用户的往来`ws`信息
         3. 每个环节接触到的是上一个环节的数据
      2. 前端
         1. 格式：module，可import
         2. 包含：
            1. 钩子：直接监听事件
               1. on load
               2. on receive
               3. on render
               4. on input
               5. ...
            2. 版本...等信息
      3. 文件
         1. `mod/xxx/xxx_frontend.js`
         2. `mod/xxx/xxx_backend.js`
   3. 基础MOD
      1. `TAG`MOD
         1. `TAG`可以作为MOD存在
      2. 地形MOD
         1. 读取到用户对地形的改变
         2. 改变地形
         3. 定时保存地形
      3. 操作MOD
         1. 读取用户的操作
         2. 操作广播
   4. 生存MOD（暂无）
      1. 可以对玩家造成伤害
      2. 被杀死的玩家所增加的地形被消除
   5. 公共`TAG`（暂无）
      1. 在公共`TAG`
   6. 时间MOD
      1. 提供一个移动的主光源

## 开发流程

1. 前端
   - [ ] 构建场景
   - [ ] 开发消息系统
   - [ ] MOD系统
2. 后端
   - [ ] NodeJS框架
   - [ ] `WebSocket`
   - [ ] MOD框架