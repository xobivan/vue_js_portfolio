<template>
  <section id="experience">
    <AnimateOnVisible name="fadeDown" :duration="1">
      <Title class="title" :title="title"/>
    </AnimateOnVisible>
    <div class="container-fluid">
      <div class="row">
        <swiper @slideChange="()=>{visibleGrid ==='Professional'? visibleGrid='Education':visibleGrid='Professional'}"
        :effect="'flip'"
        :navigation="true"
        :grabCursor="true"
        :slidesPerView="1"
        :flipEffect="{
          slideShadows: false,
        }"
        :modules="modules"
        class="xpSwitcher">   
          <swiper-slide v-for="(visibleGrid, index) in grids" :key="index" class="xpSwitcher-slide">
            <Title id="visibleGrid" class="container px-4 text-center" :description="visibleGrid"></Title>
          </swiper-slide>
        </swiper>
        <swiper
          :effect="'coverflow'"
          :pagination="true"
          :mousewheel="true"
          :loop="false"
          :grabCursor="true"
          :centeredSlides="true"     
          :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
          }"
          :breakpoints="{
            430: {slidesPerView: 1,},
            768: {slidesPerView: 1,},
            1024: {slidesPerView: 1,},
            1200:{slidesPerView: 2, pagination: false},
            1500:{slidesPerView: 3, pagination: false},
            
          }"
          :modules="modules"
          style="max-width: max-content;  width: 75%; height:100%;"
          class="mySwiper">
          <swiper-slide
            class="xpSwiperSlide"
            v-if="visibleGrid==='Education'"
            v-for="(education, index) in educations"
            :key="index"
              @pointerdown = "pointerdown"
              @pointermove="pointermove"
              @pointerup = "pointerup">
            <ExperienceColumn
              class="col-12 col-md right"
              v-if="education.isVisible == true"
              :name="education.title"
              :content="education.description"
              :date="education.year"
              :src="education.logoUrl"
              />
          </swiper-slide>
          <swiper-slide
              class="xpSwiperSlide"
              v-if="visibleGrid === 'Professional'"
              v-for="(repo, index) in repos"
              :key="index"
              @pointerdown = "pointerdown"
              @pointerup = "pointerup">
            <ExperienceColumn
              class="col-12 col-md right"
              :name="repo.name.replace(/-/g, ' ')"
              :content="repo.description || 'No description available'"
              :date="new Date(repo.created_at).getFullYear()"
              :url="repo.html_url"
              :owner="repo.owner.login"
              :src="repo.socialPreview"
              :alt="repo.name"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "./Title.vue";
import ExperienceColumn from "./ExperienceColumn.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination'; 
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow, Pagination, Mousewheel, EffectFlip,  } from 'swiper/modules';

export default {
  name: "Experience",

  props: {
    repos: {type: Array,required: true},
    educations: {type: Array,required: true}
  },
  components: {
    Title,
    ExperienceColumn,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, EffectCoverflow, Pagination, Mousewheel, EffectFlip, ],
    };
  },
  data(){
    return{
      title:"Experience",
      grids:["Professional", "Education"],
      visibleGrid:"Professional",
      SWIPE_THRESHOLD: 10,
      startX: null,
      endX: null,
      isSwipe: null,
      dragging: false,
    }
  },

  methods:{
    pointerdown(e){
      this.isSwipe = false;
      this.dragging = true;
      this.startX = e.clientX??e.pageX;
      e.currentTarget.classList.add("pressed");
      console.log("pressed", e.pageX);
      

    },
    pointerup(e){
      this.endX = e.clientX??e.pageX;
      const dx = Math.abs(this.endX-this.startX);
      if(dx>this.SWIPE_THRESHOLD){
        this.isSwipe = true;
        console.log("event canceled!");
      } else {
        this.isSwipe = false;
        console.log("event triggered!");
      }
      e.currentTarget.classList.remove("pressed"); 
      console.log("released", e.pageX);
    },
  }

};
</script>

<style scoped lang="scss">
  @import "@/styles/constants.scss";
  .xpSwitcher{
    position : relative;
    width: max-content;
    height: 3rem;
    margin: 0 auto 2rem;
    --swiper-navigation-size: 16px;
    --swiper-navigation-color: #fff;
  }
  .xpSwitcher.swiper,
  .mySwiper.swiper {
    padding: 0 !important;
    box-sizing: content-box;
  }
  .xpSwitcher :deep(.swiper-button-prev),
  .xpSwitcher :deep(.swiper-button-next) {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 9999px;
    background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center;
  }

  $linear: map-get($colors, dark);
  #experience,#visibleGrid {
    background-color: lighten(map-get($colors, primary), 5%);
  }

  .title {
    color: map-get($colors, light) !important;
  }

  .row {
    padding-top: 20px;
    text-align: center;
  }

  @media (max-width: #{map-get($breakpoints, small)}) {
    .left {
      text-align: right;
      border-right: 2px solid $linear;
    }
    .right {text-align: left;}
    .xpSwiperSlide{
      transition: scale 150ms ease !important;
      will-change: scale;
    }
    .xpSwiperSlide.pressed{scale: 0.98;}
  }

  @media (min-width: #{map-get($breakpoints, small)}){
    .right {margin-top: 20px;}
    .left:before {
      content : "";
      position: absolute;
      left    : 20%;
      bottom  : 0;
      height  : 2px;
      width   : 60%;  /* or 100px */
      border-bottom:2px solid $linear;
    }
    .xpSwitcher {--swiper-navigation-sides-offset: 30%;}
  }
    @media (max-width: #{map-get($breakpoints, medium)}) {
      .xpSwiperSlide{justify-items: center;}
      .xpSwitcher {--swiper-navigation-sides-offset: 25%;}
    }
    @media (min-width: #{map-get($breakpoints, medium)}) {
      .xpSwiperSlide{justify-items: center; margin-bottom: 1.5rem;}
      .xpSwitcher {--swiper-navigation-sides-offset: 40%;}
    }    
    @media (min-width: #{map-get($breakpoints, large)}) {
      .xpSwitcher {--swiper-navigation-sides-offset: 43%;}
    }  

  .text-wrapper {
    &:after {border-bottom: 1px solid map-get($colors, dark);}
  }
</style>
