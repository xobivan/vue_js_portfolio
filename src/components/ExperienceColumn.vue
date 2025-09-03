<template>
  <b-card 
      tag="article"
      class="xp-card container overflow-hidden"
      id="card"
      :class="{ open: deviceWidth<=767 && visible }">  
    <b-row no-gutters class="h-100">
      <b-col md="6">
        <b-card-img :src="src" :alt="alt || name" class="xp-card__image rounded-3" id="img"/>     
      </b-col>
      <b-col md="6" class="xp-card__body d-flex flex-column  h-100 text-start">
        <b-row no-gutters class="h-100">
            <b-collapse visible>
              <a :href="url" target="_blank">
                <h3 class="color-light color-darker xp-card__name" :id="name">{{ name }}</h3>
              </a>
            </b-collapse>
        </b-row>
        <b-row no-gutters class="h-100">
        <b-card-body id="body">
            <b-collapse v-if="deviceWidth<=767" v-model="visible" class="my-collapse" :style="{ '--block-height': blockHeight + 'px' }">
              <b-card-text>
                  <p v-html="content" class=" xp-card__desc secondary"></p>
              </b-card-text>
            </b-collapse>
            <b-card-text v-else class="d-flex flex-column flex-grow-1 min-h-0">
                <p v-html="content" class=" xp-card__desc secondary "></p>
            </b-card-text>
          </b-card-body>
        </b-row>
        <b-row no-gutters class="h-100">
          <span class = "year" v-html="date"/>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    name: "ExperienceColumn",
    props: {
      name: {type: String, required: true},
      content: {type: String, required: true},
      date: {type: String, required: false,},
      url:{type: String, required: true,},
      owner: {type: String, required: true,},
      src: {type: String, required: false, default: ''},
      alt: {type: String, required: false, default: ''},

      //for mobile view
      isMobileDescriptionVisible: {type: Boolean, required: true},
      index: { type: Number, required: true},
      activeIndex: { type: Number, required: true}
    },
    data(){
      return{
        visible: false,
        deviceWidth: window.innerWidth,
      }
    },
    watch:{
      isMobileDescriptionVisible(newVal, oldVal){
        if(this.index!=this.activeIndex){return}
        console.log(`isMobileDescriptionVisible value has changed from ${oldVal} to ${newVal}`);
        this.visible = newVal;
      },
    },
  };
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

@media(max-width: #{map-get($breakpoints, small)}){
  .my-collapse {
    --collapse-duration: 240ms;
    transition: height var(--collapse-duration) ease;
    transition-duration: var(--collapse-duration);
    will-change: height;
  }

  .xp-card .h-100 { height: auto !important; }

  .xp-card {
    --img-closed: 500px;  /* подгони под макет */
    --img-open:   445px;  /* подгони под макет */
  }

    /* сама картинка — плавно меняем max-height */
  .xp-card__image {
    width: 100%;
    height: auto;                 /* важно: не 100% */
    max-height: var(--img-closed);
    object-fit:cover;          /* без обрезки; хочешь кроп — оставь cover */
    transition: max-height 240ms ease;
  }
  .xp-card.open .xp-card__image {
    max-height: var(--img-open);
  }

  .xp-card__body{
    position: relative;
    padding-left: 0 !important;
  }
  .xp-card__name{
    margin-bottom: 2rem;
    margin-left: 0!important;
  }
  .year{
    position: relative!important;
    margin-left: 0rem !important;
    margin-bottom: 0 !important;
  }
  #body{
    padding-left: 0;
  }
}

@media(max-width: #{map-get($breakpoints, medium)}){
  .xp-card{height: 100% !important;}
  .year{
    position: absolute;
    bottom: 0;
    margin-left: 1rem;
  }
  .xp-card__image{
    padding-top: 2rem !important;
    padding-bottom: 1.5rem !important;
    margin:0 !important;
    /* height: 100% !important; */
  }
}

@media(min-width: #{map-get($breakpoints, medium)}){
  .xp-card{height: 100% !important;}
  .year{
    position: absolute;
    bottom: 0;
    margin-left: 1rem;
  }
}

.color-light {
  color: map-get($colors, light);
}
.color-darker {
  color: map-get($colors, dark);
}
.primary {
  color: map-get($colors, primary);
}
.secondary {
  color: map-get($colors, secondary);
}

.xp-card {
  width: 100%;
  max-width: 100%;
  height: 100%;;
  display: flex;
}
.h-100 { height: 100%; }     
.min-h-0 { min-height: 0; }

.xp-card__name{
  margin-bottom: 0;
  margin-left: 1rem;
}

.xp-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  margin-top: 0rem; 
}

.xp-card__body {
  display: flex;
  object-fit: cover;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 0;
}
.xp-card__desc {
  margin: 0;
  font-size: 1.7rem;
  line-height: 1.45;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 5;
  text-overflow: ellipsis;
  flex-grow: 1;
}
h3{
  line-height: 1.7rem;
}

.year {
  position: absolute;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

a{
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
}
</style>
