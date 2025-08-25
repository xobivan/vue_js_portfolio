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
          <swiper-slide v-for="(visibleGrid, index) in grids" :key="index" id="xpSwitcher">
            <Title id="visibleGrid" class="container px-4 text-center" :description="visibleGrid"></Title>
          </swiper-slide>
        </swiper>
        <swiper
          :effect="'coverflow'"
          :mousewheel="true"
          :loop="true"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"     
          :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
          }"
          :breakpoints="{
            430: {
              slidesPerView: 1,
              pagination:true,
            },
            768: {slidesPerView: 2,},
            1024: {slidesPerView: 3,},
          }"
          :modules="modules"
          style="max-width: max-content;  width: 75%; height:100%"
          class="mySwiper">
          <swiper-slide
            v-if="visibleGrid==='Education'"
            class="col-12 col-md-6 d-flex justify-content-center align-items-center" >
            <div class="wrapper">
              <ExperienceColumn/>
            </div>
          </swiper-slide>
          <swiper-slide
              v-if="visibleGrid === 'Professional'"
              v-for="(repo, index) in repos"
              :key="index"
              class="col-12 col-md-6 d-flex justify-content-around align-items-center">
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
import '@/styles/slider.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination'; 
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow, Pagination, Mousewheel, EffectFlip,  } from 'swiper/modules';



export default {
  name: "Experience",

  props: {
    repos: {type: Array,required: true}
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
    }
  },
};
</script>

<style scoped lang="scss">
  @import "@/styles/constants.scss";
  .xpSwitcher {
    --swiper-navigation-sides-offset: 83rem;
    --swiper-navigation-top-offset: 8rem;
    --swiper-navigation-size: 16px;
    --swiper-navigation-color: #fff;
      margin-bottom: 5rem;
  }
  .xpSwitcher :deep(.swiper-button-prev),
  .xpSwitcher :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
    border-radius: 9999px;
    background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center;
  }
  .swiper-slide#xpSwitcher{
    width: 300px;
    height: 1rem;
  }
  $linear: map-get($colors, dark);
  #experience,#visibleGrid {
    background-color: lighten(map-get($colors, primary), 5%);
  }

  .title {
    color: map-get($colors, light);
  }

  .row {
    padding-top: 20px;
    text-align: center;
  }

  @media (min-width: #{map-get($breakpoints, small)}) {
    .left {
      text-align: right;
      border-right: 2px solid $linear;
    }
    .right {
      text-align: left;
    }
  }

  @media (max-width: #{map-get($breakpoints, small)}) {
    .right {
      margin-top: 20px;
    }
    .left:before {
      content : "";
      position: absolute;
      left    : 20%;
      bottom  : 0;
      height  : 2px;
      width   : 60%;  /* or 100px */
      border-bottom:2px solid $linear;
    }
    .xpSwitcher {
      --swiper-navigation-sides-offset: 8rem;
    }
  }

  .text-wrapper {
    &:after {
      border-bottom: 1px solid map-get($colors, dark);
    }
  }
</style>
