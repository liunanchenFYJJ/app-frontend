<template>
    <div>
        <router-view/>
        <e-footer :navilist="footerlist"></e-footer>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      footerlist: [
        {
          class: 'fa fa-home',
          title: '首页'
        },
        {
          class: 'fa fa-paper-plane',
          title: '发现'
        },
        {
          class: 'fa fa-folder',
          title: '订单'
        },
        {
          class: 'fa fa-user',
          title: '我的'
        }
      ]
    };
  }
};
</script>