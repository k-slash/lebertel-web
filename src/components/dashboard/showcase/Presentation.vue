<template>
  <div class="dashboardShowcasePresentation">
    <vue-form autocomplete="off" @submit.prevent="onSubmit" :state="formstate" v-model="formstate" enctype="multipart/form-data">
      <div class="dashboard-avatar">
        <VueImgInputer id="logo" name="logo" :imgSrc="user.showcase.logo_medium" v-model="file" theme="light" size="small" bottomText="logo" placeholder="logo" @onChange="updateFile"></VueImgInputer>
      </div>
      <br>
      <div class="field">
        <label class="label">Nom</label>
        <div class="control">
          <input id="name" type="text" name="name" class="input" required v-model="user.showcase.name">
        </div>
        <field-messages name="name" show="$touched || $submitted" class="form-control-feedback">
          <div>Ok !</div>
          <div slot="required">Le nom de la vitrine est requis</div>
        </field-messages>
      </div>
      <div class="field">
        <label class="label">Je suis un(une)</label>
        <el-radio-group v-model="user.showcase.showcase_type" @change="initProfessions">
          <el-radio-button label="craftsman">Artisan d'art</el-radio-button>
          <el-radio-button label="artisan">Artisan</el-radio-button>
          <el-radio-button label="merchant">Commerçant</el-radio-button>
          <el-radio-button label="association">Association</el-radio-button>
        </el-radio-group>
      </div>
      <div class="field" v-if="user.showcase.showcase_type=='craftsman'">
        <label class="label">Domaine d'activité</label>
        <el-select v-model="user.showcase.category" placeholder="Select" @change="loadProfessions">
          <el-option
            v-for="item in activities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="field" v-if="user.showcase.showcase_type=='artisan'">
        <label class="label">Catégorie</label>
        <el-radio-group v-model="user.showcase.category" @change="loadProfessions">
          <el-radio-button label="artisan_feeding">Alimentation</el-radio-button>
          <el-radio-button label="artisan_construction">Bâtiment</el-radio-button>
          <el-radio-button label="artisan_manufacturing">Fabrication</el-radio-button>
          <el-radio-button label="artisan_services">Services</el-radio-button>
        </el-radio-group>
      </div>
      <div class="field" v-if="user.showcase.showcase_type=='merchant'">
        <label class="label">Catégorie</label>
        <el-radio-group v-model="user.showcase.category" @change="loadProfessions">
          <el-radio-button label="merchant_feeding">Alimentation</el-radio-button>
          <el-radio-button label="merchant_culture">Culture</el-radio-button>
          <el-radio-button label="merchant_clothing">Vestimentaire</el-radio-button>
        </el-radio-group>
      </div>
      <div class="field" v-if="user.showcase.showcase_type=='association'">
        <label class="label">Catégorie</label>
        <el-radio-group v-model="user.showcase.category" @change="loadProfessions">
          <el-radio-button label="association_alimentaire">Alimentation</el-radio-button>
          <el-radio-button label="association_culture">Culture</el-radio-button>
          <el-radio-button label="association_humanitarian">Humanitaire</el-radio-button>
        </el-radio-group>
      </div>
      <div class="field" v-if="this.display_profession_list">
        <label class="label" v-if="user.showcase.showcase_type=='association'">Type d'association</label>
        <label class="label" v-else>Votre métier</label>
        <el-select v-model="user.showcase.profession" placeholder="Select">
          <el-option
            v-for="item in professions"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="field" v-if="this.display_profession_list">
        <label class="label" v-if="user.showcase.showcase_type=='association'">Votre type d'association n'est pas dans la liste ?</label>
        <label class="label" v-else>Votre métier n'est pas dans la liste ?</label>
        <el-switch v-model="user.showcase.display_custom_profession"></el-switch>
      </div>
      <div class="field" v-if="this.display_profession_list && user.showcase.display_custom_profession">
        <label class="label">Indiquez le</label>
        <div class="control">
          <input id="profession" type="text" name="profession" class="input" v-model="user.showcase.profession">
        </div>
      </div>
      <div class="field">
        <label class="label">Présentation</label>
        <div class="quill-editor">
          <quill-editor ref="myTextEditor"
                        v-model="user.showcase.presentation"
                        :options="editorOption">
          </quill-editor>
        </div>
      </div>
      <br>
      <div class="py-2 text-center">
        <button class="button is-medium is-primary is-fullwidth" type="submit">Mettre à jour</button>
      </div>
    </vue-form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import VueImgInputer from 'vue-img-inputer'
import Profession from '@/store/api/profession'

export default {
  components: {
    VueImgInputer
  },
  data () {
    return {
      name: 'presentation',
      content: '',
      editorOption: {
        placeholder: 'Votre présentation',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, false] }],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      },
      formstate: {},
      file: null,
      image: '',
      activities: [{
        value: 'craftsman_furniture_decoration',
        label: 'Ameublement et décoration'
      }, {
        value: 'craftsman_architecture_gardens',
        label: 'Architecture et jardins'
      }, {
        value: 'craftsman_jewellery_goldsmithing_watchmaking',
        label: 'Bijouterie, joaillerie, orfèvrerie et horlogerie'
      }, {
        value: 'craftsman_ceramic',
        label: 'Céramique'
      }, {
        value: 'craftsman_leather',
        label: 'Cuir'
      }, {
        value: 'craftsman_instrumental_factory',
        label: 'Facture instrumentale'
      }, {
        value: 'craftsman_graphic_design_printing',
        label: 'Graphisme et impression'
      }, {
        value: 'craftsman_games_toys_mechanical_works',
        label: 'Jeux, jouets et ouvrages mécaniques'
      }, {
        value: 'craftsman_luminaire',
        label: 'Luminaire'
      }, {
        value: 'craftsman_metal',
        label: 'Métal'
      }, {
        value: 'craftsman_fashion_accessories',
        label: 'Mode et accessoires'
      }, {
        value: 'craftsman_recovery',
        label: 'Restauration'
      }, {
        value: 'craftsman_show',
        label: 'Spectacle'
      }, {
        value: 'craftsman_tabletterie',
        label: 'Tabletterie'
      }, {
        value: 'craftsman_textile',
        label: 'Textile'
      }, {
        value: 'craftsman_glass',
        label: 'Verre'
      }],
      professions: [],
      display_profession_list: false
    }
  },
  methods: {
    ...Vuex.mapActions({
      updateShowcase: 'updateShowcase'
    }),
    fieldClassName: function (field) {
      if (!field) {
        return ''
      }
      if ((field.$touched || field.$submitted) && field.$valid) {
        return 'has-success'
      }
      if ((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-danger'
      }
    },

    updateFile (file) {
      this.file = file
    },

    async loadProfessions (c) {
      const p = await Profession.getListByCategory(c)
      this.professions = p.data
      this.display_profession_list = true
    },

    initProfessions (c) {
      this.professions = []
      this.display_profession_list = false
      this.user.showcase.profession = ''
      this.user.showcase.category = null
    },

    onSubmit: function () {
      if (this.formstate.$valid) {
        var formData = new FormData()
        formData.append('name', this.$store.state.user.user.showcase.name)
        formData.append('presentation', this.$store.state.user.user.showcase.presentation)
        formData.append('showcase_type', this.$store.state.user.user.showcase.showcase_type)
        formData.append('category', this.$store.state.user.user.showcase.category)
        formData.append('profession', this.$store.state.user.user.showcase.profession)
        if (this.file != null) {
          formData.append('logo', this.file)
        }
        this.updateShowcase(formData)
      }
    }
  },
  computed: {
    ...Vuex.mapGetters(['user']),
    editor () {
      return this.$refs.myTextEditor.quill
    },
    function () {
      if (this.user.showcase.showcase_type === 'craftsman') {
        console.log(this.user.showcase.category)
        this.loadProfessions(this.user.showcase.category)
      }
    }
  },
  mounted: function () {
    if (this.user.showcase.showcase_type === 'craftsman') {
      this.loadProfessions(this.user.showcase.category)
    }
  }
}
</script>
