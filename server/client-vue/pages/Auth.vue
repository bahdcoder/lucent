<template>
    <div class="p-6 flex justify-center">
        <div
            class="w-full max-w-xs-1/2 bg-white shadow rounded-lg p-8 mx-auto mt-24"
        >
            <h3 class="text-2xl text-center font-thin mb-6 text-90">
                Welcome back!
            </h3>

            <svg
                class="block mx-auto mb-6"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="2"
                viewBox="0 0 100 2"
            >
                <g id="Page-1" fill="none" fill-rule="evenodd">
                    <g
                        id="08-login"
                        fill="#D8E3EC"
                        transform="translate(-650 -371)"
                    >
                        <path id="Rectangle-15" d="M650 371h100v2H650z"></path>
                    </g>
                </g>
            </svg>

            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label for="email" class="font-bold">Email Address</label>
                    <input
                        type="text"
                        class="w-full text-grey-darkest my-3 h-10 px-3 rounded-lg border border-grey focus:outline-none focus:border-indigo focus:border-2"
                    />
                </div>

                <div class="mb-3">
                    <label for="email" class="font-bold">Password</label>
                    <input
                        type="password"
                        class="w-full text-grey-darkest my-3 h-10 px-3 rounded-lg border border-grey focus:outline-none focus:border-indigo focus:border-2"
                    />
                </div>

                <div class="flex my-1 justify-between">
                    <div>
                        <input id="remember" type="checkbox" />
                        <label for="remember">Remember Me</label>
                    </div>

                    <router-link
                        class="no-underline text-indigo font-bold"
                        to="/passwords/reset"
                        >Forgot your password?</router-link
                    >
                </div>

                <button
                    type="submit"
                    class="w-full bg-indigo hover:bg-indigo-dark text-white rounded-lg mt-6 h-9 focus:outline-none"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        /**
         *
         * Submit the login form
         *
         * @return {null}
         *
         */
        submit() {
            this.$router.push('/')
        }
    }
}
</script>
