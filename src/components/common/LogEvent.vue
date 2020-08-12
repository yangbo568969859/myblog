<template>
  <div class="vc-trace" @click="triggerClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Trace",
  props: {
    type: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    from: {
      type: String,
      default: ""
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  triggerClick() {
    console.log(this.type);
    console.log(this.name);
  }
};
</script>