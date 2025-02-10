<script setup>
    import {defineProps} from 'vue';
    const props = defineProps({
        photo: String,
    })
</script>

<template>
    <section id="about">
        <AnimateOnVisible name="fadeDown" :duration="1">
            <Title :title="title" :description="description" />
        </AnimateOnVisible>

        <AnimateOnVisible name="fadeRight" :duration="1">
            <div class="section-content">
                <div class="container-fluid">
                    <div class="row justify-content-center card-mobile">
                        <Photo :photo = "props.photo"/>
                    </div>
                    <div class="row">
                        <div class="col-md-7 mr-auto card-mobile">
                            <Presentation />
                        </div>
                        <div class="col-md-4 card-mobile">
                            <PersonalCard :user="user" :links="links"/>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateOnVisible>
    </section>
</template>

<script>

    import Photo from "./Photo.vue";
    import Title from './Title.vue'
    import PersonalCard from './PersonnalCard.vue'
    import Presentation from './Presentation.vue'
    export default {
        name: 'AboutMe',
        components: {
            Title,
            PersonalCard,
            Presentation,
            Photo
        },

        data(){
            return{
                user: "Dmitry Spivak",
                links:{
                    gitHub:"https://github.com/",
                    linkedIn:"https://www.linkedin.com/",
                    instagram:"https://www.instagram.com/"
                },
                title: 'About Me',
                description:"WHO I AM",
                content:'here is content',
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '@/styles/constants.scss';

    #about {
        background-color: lighten(map-get($colors, dark), 100%);
    }

    @media(min-width: #{map-get($breakpoints, medium)}) {
        .section-content {
            width: 80%;
            margin: 0 auto;
        }
    }

    @media(max-width: #{map-get($breakpoints, medium)}) {
        .card-mobile {
            text-align: center !important;
            margin-top: 20px;
        }
    }
</style>