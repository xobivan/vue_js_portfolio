<template>
  
  <div>
    <h3 class="color-light"></h3>
    <div class="resume-item">
      <div class="year color-darker"></div>
      <div class="resume-description">
        <strong class="color-light"v-html="title"></strong>
      </div>
        <br></br>
        <a :href="url" target="_blank" rel="noopener noreferrer">
            <strong class="color-light" v-html="name"></strong>
          <div class="color-darker" v-html="content"></div>
          <div class = "year" v-html="date"></div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "ExperienceColumn",
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: false,
    },
    url:{
      type: String,
      required: true,
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

.resume-item {
  margin-bottom: 25px;
  p {
    font-size: 1.5rem;
    margin-top: 0;
  }
  .resume-description {
    font-size: 1.7rem;
  }
  .year {
    font-weight: 600;
    margin-bottom: 5px;
  }
}
.color-light {
  color: map-get($colors, light);
}
.color-darker {
  color: map-get($colors, dark);
}
a {
  text-decoration: none;
  
}
</style>
