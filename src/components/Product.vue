<template>
  <div class="product">
    <div class="columns">
      <div class="column is-two-thirds image">
        <agile :arrows="false" :speed="750"
            :timing="'linear'" :fade="true"
            :autoplay="false" :pauseOnHover="true">
            <div v-for="image in product.images" class="slide product" v-bind:style="{ backgroundImage: 'url(' + image.thumb_big + ')' }" >
              <div class="product-infos">
                <h1 class="product-name">{{ product.name }}</h1>
                <h4 class="product-price">{{ product.price }} €</h4>
              </div>
            </div>
        </agile>
      </div>
      <div class="column product-detail">
        <!--<div class="product-detail-item product-detail--top">…</div>-->
        <div class="product-detail-item product-detail--center">
          <h4>Intro</h4>
          <div class="product-description" v-if="!!product.description" v-html="product.description"></div>
          <div class="product-description" v-if="!product.description && !!product.short_description">
            {{ product.short_description }}
          </div>
          <div class="product-description" v-if="!product.description && !product.short_description">
            Il n'y a pas de description pour ce produit :(
          </div>
          <br>
          <h4>Détails du produit</h4>
          <div class="field" v-if="!!product.size">
            <label class="label">Taille</label>
            {{ product.size }}
          </div>
          <div class="field" v-if="!!product.colors">
            <label class="label">Couleurs</label>
            {{ product.colors }}
          </div>
          <div class="field" v-if="!!product.materials">
            <label class="label">Matériaux</label>
            {{ product.materials }}
          </div>
          <div class="field" v-if="!product.size && !product.color && !product.materials">
            Il n'y a pas de détail pour ce produit :(
          </div>
        </div>
        <div class="product-detail-item product-detail--bottom">
          <social-sharing class="social" :url="url"
            :title="title"
            :description="product.description"
            :quote="product.description"
            hashtags="produitLocal,artisanat,MadeInRéunion,lebertel"
            twitter-user="lebertel"
            inline-template>
            <div>
              <network class="navbar-item" network="facebook">
                <span class="icon" style="color: #3b5998;">
                  <i class="fa fa-facebook"></i>
                </span>
              </network>
              <network class="navbar-item" network="linkedin">
                <span class="icon" style="color: #007bb6;">
                  <i class="fa fa-linkedin"></i>
                </span>
              </network>
              <network class="navbar-item" network="twitter">
                <span class="icon" style="color: #55acee;">
                  <i class="fa fa-twitter"></i>
                </span>
              </network>
              <network class="navbar-item" network="pinterest">
                <span class="icon" style="color: #BD081C;">
                  <i class="fa fa-pinterest"></i>
                </span>
              </network>
            </div>
          </social-sharing>
        </div>

      </div>
    </div>
    <!--<section class="hero is-milk-jam is-medium">
      <div class="hero-body showcase">
        <div class="container">
          <article class="media showcase">
            <div class="media-left">
            </div>
            <div class="media-right">
              <h1 class="title menu-title">{{ product.name }}</h1>
            </div>
          </article>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script>
import Vuex from 'vuex'
import store from '@/store'

export default {
  data () {
    return {
      title: this.$store.state.product.product.name + ' par ' + this.$store.state.product.product.owner.name,
      url: window.location.href
    }
  },
  computed: {
    ...Vuex.mapGetters(['product'])
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getProduct', to.params.id).then(res => next())
  },
  methods: {
    ...Vuex.mapActions({
      getProduct: 'getProduct'
    })
  }
}
</script>
