<template>
<div id="app">
    <div id="cover"></div>
    <Header></Header>  
    <todo></todo>
    <Footer></Footer> 
</div>
</template>

<script>
import Header from './todo/header.vue'  //1.导入Header组件
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default{
    components:{    //2.声明Header组件
        Header,
        Footer,
        Todo,
    }
}
</script>


<style lang="stylus" scoped>  //scoped指定样式只应用于该组件内；lang="stylus"指定哪个组件进行解析
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    }
    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom 0   
        background-color #999 
        opacity 0.2
        z-index -1
    }
</style>