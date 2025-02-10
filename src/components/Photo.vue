<script setup>
    import {defineProps} from "vue"
    const props = defineProps({
        photo: String,
    })
</script>
<template>
  <div>
    <div class="photo">
        <a>
            <img v-if="photo" :src="props.photo" alt="Profile picture" />
        </a>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Photo',
}

</script>


<style scoped lang="scss">
    .photo {

        a:focus {
            outline: none;
        }
        img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: block;
            margin-left: auto;
            margin-right: auto
        }
    }
    img {
        max-width: 100%;
    }
</style>