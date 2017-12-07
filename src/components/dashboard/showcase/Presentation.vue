<template>
  <div class="dashboardShowcasePresentation">
    <div class="avatar-logo-center">
      <el-upload
        class="avatar-logo-uploader"
        :action="url"
        :headers="headers"
        :data="data"
        :before-upload="getFile"
        :on-success="handleAvatarSuccess"
        :show-file-list="true">
        <img v-if="user.showcase.logo" :src="user.showcase.logo_medium" class="avatar-logo">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <el-form :model="user" label-position="top" ref="form">
      <el-form-item label="Nom" prop="showcase.name" :rules="[
          { required: true, message: 'Le nom de votre vitrine est requis', trigger: 'blur' }
        ]"
      >
        <el-input v-model="user.showcase.name" auto-complete="off"></el-input>
      </el-form-item>
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
      <el-form-item label="Présentation" prop="showcase.presentation" class="quill-editor">
        <quill-editor ref="presentation"
                      name="presentation"
                      v-model="user.showcase.presentation"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop="saveShowcasePresentation('form')" class="el-large-button" round>Mettre à jour</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Profession from '@/store/api/profession'
import conf from '@/conf'

const token = localStorage.getItem('id_token')

export default {
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
      url: conf.API_URL + 'user/uploadShowcaseLogo/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: {},
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

    getFile (file) {
      this.data.user = this.user.profile.user
      this.data.logo = file
      this.data.name = this.user.showcase.name
      this.data.presentation = this.user.showcase.presentation
      this.data.showcase_type = this.user.showcase.showcase_type
      this.data.category = this.user.showcase.category
      this.data.profession = this.user.showcase.profession
    },

    handleAvatarSuccess (res, file) {
      this.user.showcase.logo_medium = URL.createObjectURL(file.raw)
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

    saveShowcasePresentation (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'name': this.user.showcase.name,
            'presentation': this.user.showcase.presentation,
            'showcase_type': this.user.showcase.showcase_type,
            'category': this.user.showcase.category,
            'profession': this.user.showcase.profession
          }
          this.updateShowcase(data)
        } else {
          this.$toast.open({
            message: 'Veuillez vérifier les données saisies',
            type: 'is-danger'
          })
          return false
        }
      })
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
