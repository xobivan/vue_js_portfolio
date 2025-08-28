<template>
  <b-card 
      tag="article"
      class="xp-card container overflow-hidden"
      id="card">  
    <b-row no-gutters class="h-100">
      <b-col md="6">
        <b-card-img src="https://repository-images.githubusercontent.com/900526062/c746b943-a751-4d4e-bb54-5a68082d346c" :alt="alt || name" class="xp-card__image rounded-3"/>     
      </b-col>
      <b-col md="6" class="xp-card__body d-flex flex-column h-100 text-start" style="padding: 0.5rem;">
        <b-card-body id="body">
          <h3 class="color-light color-darker xp-card__name" :id="name">{{ name }}</h3>
            <b-card-text class="d-flex flex-column flex-grow-1 min-h-0">
                <p v-html="content" class=" xp-card__desc secondary "></p>
            </b-card-text>
        </b-card-body>
        <span class = "year align-text-bottom" v-html="date"/>
      </b-col>
    </b-row>
  </b-card>>
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

@media(max-width: #{map-get($breakpoints, small)}){
  .xp-card__desc{display: none !important;}
  .xp-card{
    height: 100% !important;
    padding-right: 1.1rem !important;
  }
  .xp-card__body{
    padding-left: 0 !important;
  }
  .xp-card__name{
    margin-bottom: 2rem;
  }
  .year{
    margin-left: 0rem !important;
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
    height: 100% !important;
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
  margin-top: 1.75rem; 
  padding-bottom: 3rem;
}

.xp-card__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Чтобы контент был равномерно распределен */
  align-items: flex-start;
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

  flex-grow: 1;
}

.year {
  font-weight: 600;
  margin-bottom: 1.75rem;
}
</style>
