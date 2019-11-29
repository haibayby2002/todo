<template>
    <div>
        <ul>
            <li v-for="todoThing in todoThings" v-bind:key="todoThing.id">
                <todo-item v-bind:title="todoThing.title" v-bind:id="todoThing.id" v-bind:state="todoThing.state"></todo-item>
                
            </li>
        </ul>
    </div>
</template>

<script>
import TodoItem from "./Todos/TodoItem";
export default {
    name: 'todos',
    components: {TodoItem},
    data: function(){
        return{
            todoThings: [
                {title: 'Hello', id:1, state: 0},
                {title: 'Hi', id:2, state: 0},
                {title: 'How are you', id:3, state: 0},
            ],
            reviewThing: Object,
            historyThing: Object,
        }
    }
}
</script>

<style scoped>

</style>