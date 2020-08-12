import Vue from 'vue';
import { Tab, Tabs, Dialog, NavBar, Skeleton, DatetimePicker, Popup, Calendar, Toast, Loading } from 'vant';

Vue.component(Tab.name, Tab)
Vue.component(Tabs.name, Tabs)
Vue.component(Dialog.Component.name, Dialog.Component)
Vue.component(NavBar.name, NavBar)
Vue.component(Skeleton.name, Skeleton)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)
Vue.component(Calendar.name, Calendar)
Vue.component(Loading.name, Loading)

Vue.prototype.$toast = Toast;