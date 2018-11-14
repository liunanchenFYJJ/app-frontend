import ShopItem from './ShopItem';

ShopItem.install = function (Vue) {
  Vue.component(ShopItem.name, ShopItem);
};

export default ShopItem;