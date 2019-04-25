<template>
    <div>
        <div class="min-h-screen" :class="{ flex: $route.path !== '/auth' }">
            <div v-if="$route.path !== '/auth'" class="w-1/8 bg-indigo-darker">
                <div
                    class="w-full text-white bg-indigo-darkest p-6 text-center text-lg"
                >
                    Pangaso
                </div>

                <div class="py-16 px-8">
                    <router-link
                        class="flex w-full items-center mb-8 text-white no-underline font-thin"
                        to="/"
                    >
                        <svg
                            class="fill-white w-4 h-4 mr-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z"
                            ></path>
                        </svg>
                        <span class="text-white font-thin">Dashboard</span>
                    </router-link>

                    <span
                        class="flex w-full items-center mb-8 text-white no-underline font-thin"
                    >
                        <svg
                            class="fill-indigo-lighter w-4 h-4 mr-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z"
                            ></path>
                        </svg>
                        <span class="text-indigo-lighter font-thin"
                            >Resources</span
                        >
                    </span>

                    <router-link
                        class="flex w-full mb-8 items-center text-white no-underline font-thin"
                        :to="`/resources/${resource.slug}`"
                        v-for="(resource, index) in resources"
                        :key="index"
                    >
                        <span class="w-4 h-4 mr-5"></span>
                        <span class="text-indigo-lighter font-thin">
                            {{ resource.name }}
                        </span>
                    </router-link>
                </div>
            </div>
            <div class="flex-grow">
                <div
                    v-if="$route.path !== '/auth'"
                    class="w-full text-white bg-white p-6 text-lg"
                >
                    Pangaso
                </div>
                <div class="p-12" v-if="!loading">
                    <transition name="fade" mode="out-in">
                        <router-view
                            :key="`${$route.name}(${$route.params.slug || ''})`"
                        ></router-view>
                    </transition>
                </div>
            </div>
        </div>

        <transition name="fade" mode="out-in">
            <Confirm />
        </transition>
    </div>
</template>

<script>
import Confirm from '@shared/Confirm.vue'
import { GET_RESOURCES } from '@store/modules/resources'

export default {
    components: {
        Confirm
    },
    /**
     * Dispatch action to fetch all the resources
     *
     * @return {void}
     *
     */
    mounted() {
        this.$store.dispatch(GET_RESOURCES)
    },

    /**
     * Define computed properties for this component
     *
     * @type {Object}
     *
     */
    computed: {
        /**
         * Resources
         *
         * @return {Array}
         *
         */
        resources() {
            return this.$store.state.resources.resources
        },

        /**
         * Verify if resources are still loading
         *
         * @return {Boolean}
         *
         */
        loading() {
            return this.$store.state.resources.isFetching
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
