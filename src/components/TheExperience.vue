<template>>
  <section id="experience">
    <AnimateOnVisible name="fadeDown" :duration="1">
      <Title class="title" :title="title" :description="descritption"/>
    </AnimateOnVisible>

    <div class="container px-4 text-center">
      <b-button-group>
        <b-button color="primary":variant="visibleGrid === 'Education' ? 'primary' : 'outline-primary'" @click="visibleGrid='Education'">Education</b-button>
        <b-button :variant="visibleGrid === 'Professional' ? 'primary' : 'outline-primary'" @click="visibleGrid='Professional'">Professional</b-button>
      </b-button-group>
    </div>
    <div class="container-fluid">
      <div class="row">
        <Title class="container px-4 text-center" :title="visibleGrid"></Title>
          <swiper
            :loop="true"
            :effect="'coverflow'"
            :grabCursor="true"
            :centeredSlides="true"
            :slidesPerView="'3'"
            :coverflowEffect="{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }"
            :pagination="true"
            :modules="modules"
            style="width: 70%; height:100%"
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
              class="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <ExperienceColumn
              class="col-12 col-md right"
              :name="repo.name"
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
import { EffectCoverflow, Pagination } from 'swiper/modules';


export default {
  name: "Experience",
  props: {
    repos: {
      type: Array,
      required: true
    }
  },
  components: {
    Title,
    ExperienceColumn,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectCoverflow, Pagination],
    };
  },
  data(){
    return{
      title:"Experience",
      descritption:"My achievements",
      visibleGrid: "Professional",
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

$linear: map-get($colors, dark);

#experience {
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
}

.text-wrapper {
  &:after {
    border-bottom: 1px solid map-get($colors, dark);
  }
}
</style>
