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

        <b-table-column label="Date" centered>
          {{ new Date(product.row.date_created).toLocaleDateString() }}
        </b-table-column>

        <b-table-column label="Description">
          {{ product.row.description }}
        </b-table-column>

        <b-table-column label="           " class="on-right space">
          <router-link :to="{ name: 'dashboard.product.edit', params: { id: product.row.id } }" class="button rounded is-primary">
            <i class="material-icons">mode_edit</i>
          </router-link>
          <button class="button rounded is-danger" @click="confirmCustomDelete">
            <i class="material-icons">delete_forever</i>
          </button>
        </b-table-column>
        <b-table-column>

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
    ...Vuex.mapGetters(['products'])
  },
  methods: {
    confirmCustomDelete () {
      this.$dialog.confirm({
        title: 'Supprimer le produit ?',
        message: 'Êtes-vous sûr de vouloir <b>supprimer</b> le produit ? Cette action est irréversible.',
        cancelText: 'Annuler',
        confirmText: 'Supprimer le produit',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$toast.open('Account deleted!')
      })
    }
  }
}
</script>
