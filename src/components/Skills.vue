<script setup>
    import { defineProps } from "vue";
    import Title from './Title.vue'

    const props = defineProps({
        images: Array,
    })
</script>

<template>

    <section id="skills">
        <AnimateOnVisible name="fadeDown" :duration="1">
            <Title :title="title" :description="description"></Title>
        </AnimateOnVisible>
        <div class="section-content">
            <div class="container-fluid">
                <div class="row d-flex flex-wrap align-items-center">
                    <div v-if="!images || images.length === 0">Loading images...</div>
                    <div v-else class="col-6 col-md-2 m-auto pb-4" v-for="(image, index) in props.images" :key="index">
                        <AnimateOnVisible name="bounce">
                                <img id="imgLogo" class="img-responsive mx-auto d-block" :src="image" alt="Images"/>
                        </AnimateOnVisible>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Skills',
        components: {
            Title,
        },
        
        data(){
            return{
                title: 'SKILLS',
                description:'WHAT I ACTUALLY CAN',
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '@/styles/constants.scss';

    #skills {
        background-color: lighten(map-get($colors, dark), 100%);
    }

    @media(min-width: #{map-get($breakpoints, medium)}) {
        .section-content {
            width:90%;
            margin: 0 auto;
        }
    }

    img{
        max-width: 120px;
    }

    .altCaption{
        color: map-get($colors, secondary);
        margin-top: 1rem;
    }
</style>