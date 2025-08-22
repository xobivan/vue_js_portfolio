<template>
  <b-card 
      style="width: 50%;
              height : 100%; 
              margin: 1rem;"
      tag="article"
      class="container d-flex justify-content-center align-items-center overflow-hidden"
      id="card">  
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="src" alt="Image" class="rounded-0"/>     
      </b-col>
      <b-col md="6">
        <b-card-body :title="name">
            <b-card-text class="d-flex flex-column flex-grow-1">
              <div class="d-flex flex-column flex-grow-1">
                <p v-html="content"></p>
              </div>
            </b-card-text>
            <span class = "year mt-auto align-bottom" v-html="date" style="font-weight:600; margin-bottom: 5px;"/>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
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
      },
      owner: {
        type: String,
        required: true,
      },
      src: {
        type: String,
        required: false,
        default: ''
      },
      alt: {
        type: String,
        required: false,
        default: ''
      },

    },
  };
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

.color-light {
  color: map-get($colors, light);
}
.color-darker {
  color: map-get($colors, dark);
}
a {
  text-decoration: none;
  
}
a:hover {
  text-decoration: none;
}

</style>
