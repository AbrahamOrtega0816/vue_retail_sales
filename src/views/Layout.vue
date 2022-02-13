<template>
  <div>
    <q-layout view="lHh lpr lFf" container class="shadow-2 h-100">
      <q-header elevated class="bg-teal-5">
        <q-toolbar>
          <q-toolbar-title>
            <q-btn round dense flat icon="storefront" class="q-mr-xs" />
            Market !
          </q-toolbar-title>
           <Search/>
          <q-space />
          <ShoppingCart />
        </q-toolbar>
      </q-header>

      <q-drawer
        side="right"
        v-model="isDrawerOpen"
        overlay
        bordered
        :width="450"
        :breakpoint="500"
        class="bg-white"
      >
      <div class="container">
        <q-scroll-area class="fit">
            <div class="q-pa-sm">
              <ProductsList />
            </div>
          </q-scroll-area>
          <div class="to-pay">
            <Pay />
          </div>
      </div>
      </q-drawer>

      <q-page-container>
        <q-page class="q-pa-md">
          <slot></slot>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import Pay from "@/components/Pay.vue";
import Search from "@/components/Search.vue";
import { useStore } from "vuex";
import ProductsList from "@/components/ProductsList.vue";

export default defineComponent({
  components: { ShoppingCart, Pay, Search, ProductsList },
  name: "Layout",
  setup() {
    const store = useStore();

    const isDrawerOpen = computed<boolean>({
      get() {
        return store.getters.getisDrawerOpen;
      },
      set(val) {
        store.commit("toggleDrawer", val);
      },
    });

    return {
      isDrawerOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100vh;
}
.container {
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
}
.container .to-pay {
  padding: 10px;
  display: flex;
}
</style>