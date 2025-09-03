<template>
  <section id="experience">
    <AnimateOnVisible name="fadeDown" :duration="1">
      <Title class="title" :title="title" />
    </AnimateOnVisible>

    <div class="container-fluid">
      <div class="row">
        <!-- toggle grids Professional/Education -->
        <swiper
          @slideChange="() => { visibleGrid === 'Professional' ? visibleGrid = 'Education' : visibleGrid = 'Professional' }"
          :effect="'flip'"
          :navigation="true"
          :grabCursor="true"
          :slidesPerView="1"
          :flipEffect="{ slideShadows: false }"
          :modules="modules"
          class="xpSwitcher"
        >
          <swiper-slide v-for="(grid, index) in grids" :key="index" class="xpSwitcher-slide">
            <Title id="visibleGrid" class="container px-4 text-center" :description="grid" />
          </swiper-slide>
        </swiper>

        <!-- main slider -->
        <swiper
          @slideChange="onSlideChange"
          :preventClicks="false"
          :preventClicksPropagation = "false"
          :effect="'coverflow'"
          :pagination="true"
          :mousewheel="true"
          :loop="false"
          :grabCursor="false"
          :centeredSlides="true"
          :coverflowEffect="{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: false }"
          :breakpoints="{
            430: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024:{ slidesPerView: 1 },
            1200:{ slidesPerView: 2, pagination: false },
            1500:{ slidesPerView: 3, pagination: false },
          }"
          :modules="modules"
          style="max-width: max-content; width: 75%; height: 100%;"
          class="mySwiper"
        >
          <!-- Education -->
          <swiper-slide
            v-if="visibleGrid === 'Education'"
            v-for="(education, index) in educations"
            :key="`edu-${index}`"
            class="xpSwiperSlide"
            @pointerdown="onDown"
            @pointermove="onMove"
            @pointerup="onUp"
            @lostpointercapture="onCancel"
          >
            <div class="pressable">
              <ExperienceColumn
                class="col-12 col-md right"
                v-if="education.isVisible == true"
                :name="education.title"
                :content="education.description"
                :date="education.year"
                :src="education.logoUrl"
                :is-mobile-description-visible="isMoblieDescriptionVisible"
                :index="index"
                :active-index="activeIndex"
              />
            </div>
          </swiper-slide>

          <!-- Professional -->
          <swiper-slide
            v-if="visibleGrid === 'Professional'"
            v-for="(repo, index) in repos"
            :key="`repo-${index}`"
            class="xpSwiperSlide"
            @pointerdown="onDown"
            @pointermove="onMove"
            @pointerup="onUp"
            @lostpointercapture="onCancel"
          >
            <div class="pressable">
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
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "./Title.vue";
import ExperienceColumn from "./ExperienceColumn.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import { Navigation, EffectCoverflow, Pagination, Mousewheel, EffectFlip } from "swiper/modules";
export default {
  name: "Experience",
  props: {
    repos: { type: Array, required: true },
    educations: { type: Array, required: true },
  },
  components: { Title, ExperienceColumn, Swiper, SwiperSlide },
  setup() {
    return { modules: [Navigation, EffectCoverflow, Pagination, Mousewheel, EffectFlip] };
  },
  data() {
    return {
      title: "Experience",
      grids: ["Professional", "Education"],
      visibleGrid: "Professional",

      // for events
      THRESHOLD: 10,
      startX: 0,
      startY: 0,
      isMoblieDescriptionVisible: false,
      isPressed: false,
      isSwipe: false,
      pointerId: null,
      activeIndex: 0
    };
  },
  methods: {
    onDown(e) {
      if (e.target.closest('a')) return;
      this.isPressed = true;
      this.isSwipe = false;
      this.startX = e.clientX ?? e.pageX;
      this.startY = e.clientY ?? e.pageY;
      this.pointerId = e.pointerId ?? null;

      e.currentTarget.setPointerCapture?.(this.pointerId);

      e.currentTarget.classList.add("pressed");
    },

    onMove(e) {
      if (!this.isPressed || this.isSwipe) return;
      if (e.target.closest('a')) return;
      const x = e.clientX ?? e.pageX;
      const y = e.clientY ?? e.pageY;

      //euclidean distance
      const moved = Math.hypot(x - this.startX, y - this.startY) > this.THRESHOLD;

      //if event was swipe - remomes press effect
      if (moved) {
        this.isSwipe = true;
        e.currentTarget.classList.remove("pressed");
      }
    },

    onUp(e) {
      if (this.pointerId != null) {
        e.currentTarget.releasePointerCapture?.(this.pointerId);
      }
      e.currentTarget.classList.remove("pressed");

      if (e.target.closest('a')) return;

      if (!this.isSwipe) {
        console.log("tap: event triggered!");
        this.isMoblieDescriptionVisible = !this.isMoblieDescriptionVisible;
      } else {
        console.log("swipe: event canceled");
      }

      this.isPressed = false;
      this.isSwipe = false;
      this.pointerId = null;
    },

    onCancel(e) {
 
      e.currentTarget.classList.remove("pressed");
      this.isPressed = false;
      this.isSwipe = false;
      this.pointerId = null;
    },
    onSlideChange(swiper){

      this.activeIndex = swiper.activeIndex
      this.isMoblieDescriptionVisible = false;
    },

  },
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

.xpSwitcher {
  position: relative;
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

$linear: map-get($colors, dark);
#experience,
#visibleGrid {
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
  .right {
    text-align: left;
  }
  .xpSwiperSlide .pressable {
    transform: scale(1);
    transition: transform 180ms ease;
    will-change: transform;
    transform-origin: center;
  }
  .xpSwiperSlide.pressed .pressable {
    transform: scale(0.98);
  }

}

@media (min-width: #{map-get($breakpoints, small)}) {
  .right {
    margin-top: 20px;
  }
  .left:before {
    content: "";
    position: absolute;
    left: 20%;
    bottom: 0;
    height: 2px;
    width: 60%;
    border-bottom: 2px solid $linear;
  }
  .xpSwitcher {
    --swiper-navigation-sides-offset: 30%;
  }
}

@media (max-width: #{map-get($breakpoints, medium)}) {
  .xpSwiperSlide {
    justify-items: center;
  }
  .xpSwitcher {
    --swiper-navigation-sides-offset: 25%;
  }
}

@media (min-width: #{map-get($breakpoints, medium)}) {
  .xpSwiperSlide {
    justify-items: center;
    margin-bottom: 1.5rem;
  }
  .xpSwitcher {
    --swiper-navigation-sides-offset: 40%;
  }
}

@media (min-width: #{map-get($breakpoints, large)}) {
  .xpSwitcher {
    --swiper-navigation-sides-offset: 43%;
  }
}

.text-wrapper {
  &:after {
    border-bottom: 1px solid map-get($colors, dark);
  }
}
</style>
