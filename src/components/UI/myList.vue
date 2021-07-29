<template>
<details>
    <summary>
      <div class="border-b border-gray-300">
        <div  @click="rotateArrow()" class="hover:bg-gray-300 flex">
          <slot name="name"></slot>
          <div class="my-5 px-5 place-self-center flex flex-row flex-none">
            <p class="mx-5 font-semibold place-self-center "><slot name="grade"></slot></p>
            <img v-if="!opened" class="toggle" src="https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png" />
            <img v-if="opened" src="https://img.icons8.com/material-outlined/24/000000/collapse-arrow.png"/>
          </div>
        </div>
      </div>
      </summary>
      <div class="border-b border-gray-300">
          <slot name="content"></slot>
      </div>
    </details>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue'
export default {
  name: 'my-list',
  data() {
    return {
    }
  },
  props: {
    opened: Boolean,
  },
  setup(props) {
    const opened = ref(props.opened)
    
    const rotateArrow = () => {
      opened.value = !opened.value
    }
    return {
      rotateArrow,
      opened
    }
  }
}
</script>

<style>
summary {
	cursor: pointer;
	list-style: none; 
}
summary::-webkit-details-marker { display: none; }
</style>