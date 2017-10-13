<template>
  <div class="dashboardProductList">
    <h1 class="title menu-title">Mes produits</h1>
    <b-table
      :data="products"
      :paginated="true"
      :per-page="10"
      :pagination-simple="false">

      <template scope="product">
        <b-table-column label="Nom">
          {{ product.row.name }}
        </b-table-column>

        <b-table-column label="Prix">
          {{ product.row.price }} €
        </b-table-column>

        <b-table-column label="Description">
          {{ product.row.description }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="sentiment_very_dissatisfied"
                size="is-large">
              </b-icon>
            </p>
            <p>Vous n'avez pas de produit.</p>
          </div>
        </section>
      </template>
    </b-table>
    <!-- <div class="columns is-multiline">
      <div class="column is-3" v-model="product.products"
        v-for="item in product.products"
        v-bind:item="item"
        v-bind:key="item.id">
        <article class="media">
          <div class="media-content">
            <p class="image is-128">
              <img :src="item.image">
            </p>
          </div>
          <div class="media-right">
            <button class="delete" @click="deleteImage" :id="item.id"></button>
          </div>
        </article>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      formstate: {}
    }
  },
  computed: {
    ...Vuex.mapGetters(['product', 'products'])
  },
  methods: {
    ...Vuex.mapActions({
      listProduct: 'listProduct'
    })
  }
}
</script>
