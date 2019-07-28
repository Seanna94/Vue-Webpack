<template>
    <div class="helper">
      <span class="left">{{unFishedTodoLength}} items left</span>  
      <span class="tabs">
        <span 
          v-for="state in states"
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
        >
         {{state}}
        </span>
       
      </span>
      <span class="clear" @click="clearAllCompleted">Clear completed</span>
    </div>

</template>

<script>
export default {
    props:{ //父组件通过 props 向下传递数据给子组件；子组件通过 events 给父组件发送消息。
        todos:{
            type:Array,
            required:true
        },
        filter:{
            type:String,
            required:true,
        }
    },
    computed:{ //计算
        unFishedTodoLength(){  //计算状态为没有完成的数组的长度
            return this.todos.filter(todo => !todo.completed).length
        }

    },
     data(){
        return {
            states: ['all','active','completed']
        }
    },
    methods:{
          toggleFilter(state){
            this.$emit('togole',state)
        },
        clearAllCompleted(){
            this.$emit('clearAllCompleted')
        }
    }
}
</script>

<style lang="stylus" scoped>
.helper
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing antialiased
.left, .clear, .tabs
    padding 0 10px
.left .clear
    width 150px
.left
    text-align center
.clear
    text-align right
    cursor pointer
.tabs
    width 200px
    display flex
    justify-content space-between
    *
        display inline-block
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived
            border-color rgba(175,47,47,0.4)
            border-radius 5px
</style>