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
        <!--<div class="product-detail-item product-detail--top"></div>-->
        <div class="product-detail-item product-detail--center">
          <div class="card showcase">
            <div class="card-image">
              <figure class="img" v-if="product.owner.logo_medium">
                <div class="slide" v-bind:style="{ backgroundImage: 'url(' + product.owner.logo_medium + ')' }" ></div>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ product.owner.name }}</p>
                  <p class="subtitle is-6">{{ product.owner.city }}</p>
                </div>
              </div>
              <div class="content">
                {{ product.owner.showcase_type_lbl}} <br> {{ product.owner.category_lbl }} <br> {{ product.owner.profession }}
              </div>
            </div>
          </div>
          <br>
          <h4>Description</h4>
          <div class="product-desc">
            <div class="product-description" v-if="!!product.description" v-html="product.description"></div>
            <div class="product-description" v-if="!product.description && !!product.short_description">
              {{ product.short_description }}
            </div>
            <div class="product-description" v-if="!product.description && !product.short_description">
              Il n'y a pas de description pour ce produit :(
            </div>
          </div>
          <br>
          <h4>Détails du produit</h4>
          <div class="product-more-info">
            <div class="product-more-infos">
              <div class="field" v-if="!!product.size">
                <label class="label">Taille</label>
                {{ product.size }}
              </div>
              <div class="field" v-if="!!product.weight">
                <label class="label">Poids</label>
                {{ product.weight }}
              </div>
              <div class="field" v-if="!!product.volume">
                <label class="label">Volume</label>
                {{ product.volume }}
              </div>
              <div class="field" v-if="!!product.colors">
                <label class="label">Couleurs</label>
                {{ product.colors }}
              </div>
              <div class="field" v-if="!!product.materials">
                <label class="label">Matériaux</label>
                {{ product.materials }}
              </div>
              <div class="field" v-if="!!product.ingredients">
                <label class="label">Ingredients</label>
                {{ product.ingredients }}
              </div>
              <div class="field" v-if="!product.size && !product.color && !product.materials && !product.ingredients">
                Il n'y a pas de détail pour ce produit :(
              </div>
            </div>
          </div>
        </div>
        <div class="product-detail-item product-detail--bottom">
          <!--<button v-on:click="goBack">Back</button>-->
          <div class="go-back">
            <a class="navbar-item" v-on:click="goBack">
              <b-icon icon="arrow_back"></b-icon>
            </a>
          </div>
          <social-sharing class="social" :url="url"
            :title="title"
            :description="product.short_description"
            :quote="product.short_description"
            hashtags="produitLocal,artisanat,MadeInRéunion,lebertel"
            twitter-user="lebertel"
            media="product.images[0].thumb_medium"
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
  created () {
    window.document.title = this.product.name + ' par ' + this.product.owner.name + ' sur lebertel.'
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getProduct', to.params.id).then(res => next())
  },
  methods: {
    ...Vuex.mapActions({
      getProduct: 'getProduct'
    }),

    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
