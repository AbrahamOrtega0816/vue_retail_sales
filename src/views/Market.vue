<template>
  <div>
    <div class="q-pa-md">
      <div class="row q-col-gutter-lg">
        <div
          class="col-1 col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3"
          v-for="(product, index) in products_filtered"
          :key="index"
        >
          <q-card class="my-card">
            <q-img 
              height="200"
              :ratio="16 / 9"
              :title="product.attributes.name"
              :src="product.attributes.image_medium_url">
            </q-img>
            <q-card-section>
              <div class="row">
                <div class="col">
                  <span class="text-h6 ellipsis d-block">{{
                    product.attributes.name
                  }}</span>
                </div>
              </div>
              <div class="row q-pt-10">
                <div class="col">
                  <span class="flex flex-center text-h6">{{
                    (product.attributes.price * count_product[index]).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col flex flex-center">
                  <q-input
                    class="text-center"
                    v-model="count_product[index]"
                    v-if="show_count_product[index]"
                    dense
                  >
                    <template v-slot:prepend>
                     <q-btn 
                      v-on:click="count_product[index] > 1 ? count_product[index] = count_product[index] - 1 :
                      count_product[index] = 1"
                      round dense flat icon="remove" />
                    </template>

                    <template v-slot:append>
                      <q-btn 
                       v-on:click="count_product[index] = count_product[index] + 1"
                      round dense flat icon="add" />
                    </template>
                  </q-input>

                  <q-btn
                   :disable="!product.attributes.price"
                    v-on:click="show_count_product[index] = true;"
                    v-else
                    push
                    rounded
                    color="teal"
                    label="Comprar"
                   />
                </div>
                <div v-if="show_count_product[index]" class="col-3 text-center">
                  <q-btn
                    v-on:click="show_count_product[index] = false;count_product[index] = 1"
                    push
                    color="white"
                    text-color="teal"
                    round
                    icon="clear"
                    ><q-tooltip>Cancelar</q-tooltip></q-btn
                  >
                </div>
                <div v-if="show_count_product[index]" class="col-3 text-center">
                  <q-btn
                    v-on:click="addProductToShoppingCart(product.id,index)"
                    push
                    color="white"
                    text-color="teal"
                    round
                    icon="add_shopping_cart"
                    ><q-tooltip>Añadir</q-tooltip></q-btn
                  >
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/models/market.model";
import { marketService } from "@/services";
import { ProductCart } from "@/store";
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {

    const store = useStore()

    let products = ref<Array<Product>>([]);

    let products_filtered = ref<Array<Product>>([]);

    let show_count_product = ref<Array<boolean>>([]);
    let count_product = ref<Array<number>>([]);

    const search = computed<string>(()=> store.getters.getSearch);

    const filterListProdust = (value:string)=>{
      products_filtered.value = products.value.filter((product) => {
        return product.attributes.name.toLowerCase().includes(value.toLowerCase())
      });
      products_filtered.value.forEach(() =>{
        show_count_product.value.push(false);
        count_product.value.push(1);
      });
    }

    watchEffect(() => filterListProdust(search.value));


    const getListProducts = async () => {
      await marketService
        .getProducts()
        .then((response) => {
          const {
            data: { data },
          } = response;
          products.value = data;
          products.value.forEach(() =>{
            show_count_product.value.push(false);
            count_product.value.push(1);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
    };

    const addProductToShoppingCart = (id:string,index:number) => {

      const product_select = products.value.filter((p)=> p.id === id)[0]

      const product : ProductCart = {
        amount: count_product.value[index],
        product_name: product_select.attributes.name || "None" ,
        product_img: product_select.attributes.image_medium_url || "",
        product_id: id || "",
        price:product_select.attributes.price
      };

      store.commit('addProduct',product);

      count_product.value[index] = 1;
      show_count_product.value[index] = false;
    }
    
    onMounted(() => {
      getListProducts();
    });

    return {
      products_filtered,
      show_count_product,
      count_product,
      addProductToShoppingCart
    };
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
.q-pt-10 {
  padding-top: 10px;
}
.d-block {
  display: block;
}
.text-right {
  text-align: right;
}
</style>
