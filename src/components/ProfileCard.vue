<script setup>
  import {defineProps} from "vue";
  const props = defineProps({
    background: String, 
  })
</script>
<template>
  
  <header class="header parallax" :style="{ backgroundImage: `url(${props.background})`}">
    <div class="name">
      <div class="wrapper-name">
        <animate-on-visible name="fadeRight" ::duration="1">
          <h1>{{user}}</h1>
        </animate-on-visible>
        <hr />
        <animate-on-visible name="fadeLeft" ::duration="1">
          <p>Software Engineer</p>
        </animate-on-visible>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ProfileCard',

  data(){
    return{
      user: "Dmitry Spivak",
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

.header {
  padding: 20px;
  background-color: map-get($colors, dark);
}

.parallax {

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 400;

  .wrapper-name {
    width: 250px;
  }

  h1 {
    font-size: 2.3rem;
    padding: 2px 10px;
    text-align: center;
    text-transform: uppercase;
    color: whitesmoke;
  }

  p {
    font-size: 1.5rem;
    text-align: center;
    margin: 5px auto;
    color: whitesmoke;
  }

  hr {
    border: 1px solid whitesmoke;
  }
}

@media (min-width: #{map-get($breakpoints, small)}) {
  .name {
    .wrapper-name {
      width: 55%;
    }
    h1 {
      font-size: 2.8rem;
      padding: 4% 8%;
    }
    p {
      font-size: 2rem;
    }
  }
}
@media (min-width: #{map-get($breakpoints, medium)}) {
  .name {
    .wrapper-name {
      width: 450px;
    }
    h1 {
      font-size: 4rem;
      padding: 4% 10%;
    }
    p {
      font-size: 2.5rem;
    }
  }
}
@media only screen and (max-device-width: 1024px) {
  .parallax {
    background-attachment: scroll;
  }
}
</style>
