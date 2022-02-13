<template>
  <div class="row w-100">
    <div class="col-6">
      <span class="text-h6">
        Total:
        {{
          total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        }}
      </span>
    </div>
    <div v-if="total > 0"
    class="col-6 text-right">
         <q-btn v-on:click="pay"
         color="secondary" icon-right="paid" label="Pagar" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useQuasar } from 'quasar';

export default defineComponent({
  setup() {

    const $q = useQuasar()

    const store = useStore();

    const total = computed<number>(() => store.getters.getTotalShoppingCart);

     const pay = ()=> {
        store.commit("toggleDrawer",false)
        store.commit("payShoppingCart")
        $q.notify({
          message: 'Gracias Por Su Compra',
          icon: 'price_check',
          color:"teal",
        })
      }

    return {
      total,
      pay
    };
  },
});
</script>

<style lang="scss" scoped>
.w-100{
    width: 100%;
}
.text-right{
    text-align: right;
}
</style>
