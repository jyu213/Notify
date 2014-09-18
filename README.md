## Notify.js

html5 Notifications 组件。  

### 用法
#### 初始化对象

        var notification = new Notify('hello notication',{
                'body': 'this is descript'
            })

#### 参数说明
* title: **必需**。字符串类型。 通知标题
* options
    - icon: 图片链接，用于通知的图标: 
    - body: '': 
    - tag: 字符串。作为可使用的检索，替换，删除的通知的 ID: 
    - lang: 指定通知的语言类型。必须遵守[ BCP 47 规范](http://tools.ietf.org/html/bcp47): 
    - onShowCallback: 当通知出现时回调函数 
    - onErrorCallback: 当通知出现错误时回调函数 
    - onCloseCallback: 一旦用户或者浏览器关闭通知时回调函数 
    - onClickCallback: 当用户点击通知的回调函数 
    - timeout: 自动关闭通知窗口时间。单位秒

#### 全局对象
* isSupport: 是否支持 Notification 属性
* isPermission: 检测浏览器是否开启 Notification 支持
* requestPermission: 用来请求询问显示通知的权限(接收3个回调函数)
    - permissionGranted: 同意后回调函数
    - permissionDenied: 拒绝后回调函数
    - permissionDefault: 其它操作后回调函数（如关闭）

### 浏览器支持
[点击查看](http://caniuse.com/#feat=notifications)浏览器支持情况

### 申明
缘起于[github Notify.js](https://github.com/alexgibson/notify.js)提供思路。
