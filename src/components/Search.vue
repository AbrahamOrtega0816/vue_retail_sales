<template>
    <div>
        <q-input dark dense standout v-model="text" input-class="text-right" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {

        const store = useStore();
        
        const text = computed<string>({
            get() {
                return store.getters.getSearch;
            },
            set(val) {
                store.commit("searchProduct", val);
            },
        });

        return{
         text
        }
    },
})
</script>
