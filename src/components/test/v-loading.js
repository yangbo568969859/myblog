import Vue from 'vue';
import LoadingComponent from './loading.vue';

const LoadingConstructor = Vue.extend(LoadingComponent);

Vue.directive('loading', {
  bind(el, binding) {
    const instance = new LoadingConstructor({
      el: document.createElement('div'),
      data: {}
    })
    el.appendChild(instance.$el)
    el.instance = instance;
    Vue.nextTick(() => {
      el.instance.visible = binding.value;
    })
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value;
    }
  },
  unbind(el) {
    const mask = el.instance.$el;
    if (mask.parentNode) {
      mask.parentNode.removeChild(mask);
    }
    el.instance.$destroy;
    el.instance = undefined;
  }
})