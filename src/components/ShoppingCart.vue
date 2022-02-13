<template>
    <div>
        <div class="row">
            <div class="col">
              <q-btn round icon="shopping_cart cursor-pointer" flat text-color="white"  v-on:click="onCLickToggleDrawer">
                 <q-badge floating color="red" rounded v-if="count">
                    {{count}}
                </q-badge>
              </q-btn>
            </div>
            <div class="col">
               Total: {{
                    (total).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                }}
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
