<template>
    <div>
        <input type="text" v-bind:value="cusvalue" v-on:input="$emit('cusinput', $event.target.value)">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'CustomInput',
  props: ['cusvalue']
};
</script>

