<template>
  <b-card 
      tag="article"
      class="xp-card container overflow-hidden"
      id="card">  
    <b-row no-gutters class="h-100">
      <b-col md="6" style="margin-bottom: 1.75rem; margin-top: 1.25rem; padding-bottom: 0.5rem;">
        <b-card-img :src="src" :alt="alt || name" class="xp-card__image rounded-3"/>     
      </b-col>
      <b-col md="6" class="h-100" style="padding: 0.5rem;">
        <b-card-body class="xp-card__body d-flex flex-column h-100 ">
          <h3 class="color-light color-darker">{{ name }}</h3>
            <b-card-text class="d-flex flex-column flex-grow-1 min-h-0">
                <p v-html="content" class=" xp-card__desc secondary "></p>
            </b-card-text>
            <span class = "year mt-auto align-bottom" v-html="date"/>
        </b-card-body>
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
    },
  };
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";
@import "@/styles/slider.css";

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
  max-width: 520px;
  height: 360px;
  margin: 0.5rem;
  display: flex;
}
.h-100 { height: 100%; }     
.min-h-0 { min-height: 0; }


.xp-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.xp-card__body {
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.xp-card__desc {
  margin: 0;
  font-size: 2rem;
  line-height: 1.45;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 5;
  text-overflow: ellipsis;

}

.year {
  font-weight: 600;
  margin-bottom: 4px;
}
</style>
