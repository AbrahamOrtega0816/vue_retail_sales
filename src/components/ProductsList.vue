<template>
  <div>
    <div class="row pt-40" v-for="(product, index) in shoppingCartList" :key="index">
      <div class="col-3 text-center">
        <img
          class="img-product cursor-pointer"
          height="100"
          :title="product.product_name"
          :src="product.product_img"
          :ratio="16 / 9"
        />
      </div>
      <div class="col-9 pl-20">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-2">
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white">
                    x{{ product.amount }}
                  </q-avatar>
                </q-item-section>
              </div>
              <div class="col-10">
                <span class="text-h6 ellipsis d-block">{{
                  product.product_name
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-12">
                <span class="text-h6">{{
                    (product.price * product.amount).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                }}</span>
          </div>
          <div class="col-12">
              <div class="row">
                  <div class="col-9">
                     <q-input
                    class="text-center"
                    v-model="product.amount"
                    label="Cantidad"
                    dense
                  >
                    <template v-slot:prepend>
                     <q-btn 
                      v-on:click="product.amount > 1 ? product.amount = Number(product.amount) - 1 :
                      product.amount = 1"
                      round dense flat icon="remove" />
                    </template>

                    <template v-slot:append>
                      <q-btn 
                       v-on:click="product.amount = Number(product.amount) + 1"
                      round dense flat icon="add" />
                    </template>
                     </q-input>
                  </div>
                  <div class="col-3">
                      <q-btn v-on:click="onClickDeleteProduct(product.product_id)"
                      round color="red" icon="delete" />
                  </div>
              </div>
       
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { ProductCart } from "../store/index";

export default defineComponent({
  setup() {
    const store = useStore();

    const shoppingCartList = computed<Array<ProductCart>>(()=> store.getters.getShoppingCart);

    const onClickDeleteProduct = (id:string) =>{
       store.commit("deleteProductOfShoppingCart", id);
    }

    return {
      shoppingCartList,
      onClickDeleteProduct
    };
  },
});
</script>

<style  lang="scss" scoped>
.img-product {
  border-radius: 60px;
  max-width: 100px;
}
.text-center {
  text-align: center;
}
.d-block {
  display: block;
}
.pl-20{
    padding-left: 20px;
}
.pt-40{
    padding-top: 40px;
}
</style>
