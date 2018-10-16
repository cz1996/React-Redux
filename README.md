详情见：<a target = "_blank" href='https://blog.csdn.net/cccz1996/article/details/81985829' >https://blog.csdn.net/cccz1996/article/details/81985829<a/>


## React-Redux和React-Router入门Demo代码讲解##
## 写在前面 ##
**基础框架**
		&nbsp;&nbsp;&nbsp;&nbsp;create-react-app脚手架新建项目，React-Router，React-Redux。

**简介**
		&nbsp;&nbsp;&nbsp;&nbsp;网上有很多React-Router和React-Redux的教程，但是一般都是分开讲解的，没有整合起来一起使用的例子，对于新手来说十分不友好。今天抽空写了一个简单的Demo讲解React-Router和React-Redux。

**阅读对象**
		&nbsp;&nbsp;&nbsp;&nbsp;适用于了解React但对React-Router和React-Redux不怎么了解的新手，大神就不用看了。

----------

## 正文 ##

**1、新建项目**
安装create-react-app
```
npm install -g create-react-app
```
安装好create-react-app之后，执行

```
create-react-app my-app
```
可以直接`npm run start`执行，新建项目如果有报错，可网上查阅，基本都是差包、配置和版本的问题。删除没必要的文件，只保留`index.js`和`registerServiceWorker.js`。
**2、整理文件目录**
在src目录下新建`app`，`reducers`，`router`文件夹。然后按照自己的需求新建js文件。我的目录如下：
![这里写图片描述](https://img-blog.csdn.net/20180823173847463?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjY3oxOTk2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
**3、使用React-Router**
修改src > router > Root.js文件：

```
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import View from '../app/components/View'
 
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={View} />
      </div>
    </Router>
  </Provider>
)
 
Root.propTypes = {
  store: PropTypes.object.isRequired
}
 
export default Root
```
Provider ：在Router外面包裹一层Provider，是为了传入store，store能够在各个组件中能被使用。
**4、使用Redux**

 - 1、修改src > reducers> action.js文件：

```
export const CHANGE = "CHANGE"

export const changeColor = (currColor) => ({ type: CHANGE,color:currColor })
```
存放action的文件，至于action，store和reducer的关系可以自己百度学习，这里不讲原理，只做一个demo讲解使用方法。

 - 2、修改src > reducers> index.js文件：

```
function color(state = {color: ''}, action) {
  switch (action.type) {
    case 'CHANGE':
      console.log(action.color)
      return { color: action.color }
    default:
    console.log(action.color)
      return state
  }
}

export default color;
```
存放reducer的文件，根据action的类型判断执行相应的操作，结果是返回一个新的state对象。
**5、完成组件**

 - 1、修改src > components> Header.js文件：
 
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './components.css'

class Header extends Component{
    render(){
        return(
            <div className="header" style={{color:this.props.color}}>
                这里是Header部分
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        color: state.color
    }
}

Header = connect(mapStateToProps)(Header)

export default Header
```
Header部分的style使用的是`style={{color:this.props.color}}`。`this.props.color`和`mapStateToProps`里的返回值对应。connect函数可以有两个参数，一个是处理state，另一个是处理action，这里省略了action，因为这个组件没有处理action。`mapStateToProps`接受一个state参数，返回页面需要使用的数据，在store的`state.color`改变时，能够自动刷新页面。这里的`state`和react组件的`this.state`不一样，具体不分析。

 - 2、修改src > components> Buttonarea.js文件：

```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeColor } from '../../reducers/action'
import './components.css'

class Buttonarea extends Component {
  handleSwitchColor (color) {
    if (this.props.onSwitchColor) {
        this.props.onSwitchColor(color)
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.handleSwitchColor.bind(this,'blue')} className="buttonareaclass blue">蓝色</button>
        <button onClick={this.handleSwitchColor.bind(this,'red')} className="buttonareaclass red">红色</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSwitchColor: (color) => {
          dispatch(changeColor(color))
      }
  }
}

Buttonarea = connect(null,mapDispatchToProps)(Buttonarea)

export default Buttonarea
```
注意：onClick不能直接调用`mapDispatchToProps`里的`onSwitchColor`函数，那只会在初始化的时候调用一次，之后就不会调用了。当connect函数只需要`mapDispatchToProps`参数时，不能直接省略第一个参数，而需要加上null，不然也会报错。

 - 3、修改全局index.js；
 

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux' 
import Root from './router/Root';
import todoApp from './reducers/index'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(todoApp)

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
```
创建store，并传到Root里面。

 - 4、其他组件。

**6、结果**
<center class="half">
	<img src="https://img-blog.csdn.net/20180823180803211?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjY3oxOTk2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="50%"/><img src="https://img-blog.csdn.net/20180823180809502?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NjY3oxOTk2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" width="50%"/>
</center>

**7、代码**
github仓库：[https://github.com/cz1996/React-Redux](https://github.com/cz1996/React-Redux)

**8、总结**
当整个Router和Redux流程熟悉之后，自己写一个demo，然后再去参考网上的原理解释会轻松很多。不然只能是看的云里雾里，我觉得最好的入门方法就是自己写一个例子，不需要懂原理，参考着写一遍代码，就会对他的整体有了解，再去看原理就好很多了。
