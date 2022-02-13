<template>
  <div>
    <div class="row text-center">
      <div class="col">
        <q-btn
          class="cursor-pointer"
          round
          icon="shopping_cart"
          flat
          text-color="white"
          v-on:click="onCLickToggleDrawer"
        >
          <q-badge floating color="red" rounded v-if="count">
            {{ count }}
          </q-badge>
        </q-btn>
      </div>
      <div class="col aling-center">
        <span>
          Total:
          {{
            total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          }}
        </span>
      </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent ,computed} from 'vue';
import { useStore } from 'vuex'

export default defineComponent({
    name:"ShoppingCart",
    setup() {

        const store = useStore()

        const count = computed<number>(() => store.getters.getCountShoppingCart);

        const total = computed<number>(() => store.getters.getTotalShoppingCart);

        const onCLickToggleDrawer = () =>{
            store.commit("toggleDrawer", !store.getters.getisDrawerOpen);
        }
         
        return{
          count,
          total,
          onCLickToggleDrawer
        }
    },
})
</script>
