<template>
    <div>
        <h2 class="font-thin text-3xl mb-2">{{ resource.title }}</h2>

        <div class="flex justify-between items-center">
            <div class="w-1/5 flex items-center">
                <svg
                    class="absolute ml-3 z-20 text-grey fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    aria-labelledby="search"
                    role="presentation"
                >
                    <path
                        fill-rule="nonzero"
                        d="M14.32 12.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387a8 8 0 1 1 1.414-1.414zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                    ></path>
                </svg>
                <input
                    v-model="search"
                    placeholder="Search"
                    type="text"
                    class="w-full text-grey-darkest my-3 h-10 pr-3 pl-10 rounded-lg shadow focus:outline-none focus:border-indigo focus:border-2"
                />
            </div>
            <router-link
                :to="`/resources/${resource.slug}/new`"
                class="trans-30 no-underline bg-indigo hover:bg-indigo-dark text-white rounded-lg px-8 h-9 flex items-center focus:outline-none"
            >
                Create {{ resource.name }}
            </router-link>
        </div>

        <div class="w-full bg-white rounded-t-lg shadow mt-4">
            <div class="h-16 flex justify-between items-center px-6">
                <input
                    v-model="allSelected"
                    @click="markAllAsSelected"
                    type="checkbox"
                />

                <div class="flex items-center justify-end w-1/3">
                    <select v-if="resource.actions.length > 0 && selected.length > 0" :class="`${FORM_CONTROL} w-2/4`" v-model="selectedAction">
                        <option value='' selected disabled>Select an action</option>
                        <option v-for="action in resource.actions" :value="action.id" :key="action.id">
                            {{ action.name }}
                        </option>
                    </select>

                    <button type="button" @click="runActionConfirm" v-if="resource.actions.length > 0 && selected.length > 0" :class="classnames('ml-3 focus:outline-none cursor-pointer trans-30 h-10 flex items-center justify-center rounded-lg px-3', { 'bg-indigo hover:bg-indigo-dark': selectedAction, 'bg-indigo-lighter cursor-not-allowed': !selectedAction })">
                        <svg width="20" height="20" class="fill-current text-white font-bold h-10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 41.999 41.999" style="enable-background:new 0 0 41.999 41.999;" xml:space="preserve" ><g><path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z M7.5,39.095V2.904l26.239,18.096L7.5,39.095z" class="active-path" /></g> </svg>
                    </button>

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        role="presentation"
                        aria-labelledby="delete"
                        v-if="selected.length > 0"
                        @click="deleteConfirm(selected)"
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-current text-grey ml-8 cursor-pointer hover:text-indigo-dark"
                    >
                        <path
                            fill-rule="nonzero"
                            d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div
                class="px-6 h-12 bg-grey-lighter border-t border-b border-grey-light flex items-center"
            >
                <span class="w-12"></span>
                <span
                    :key="index"
                    v-for="(field, index) in resource.fields"
                    :class="
                        `w-1/${resource.fields.length +
                            1} text-xs font-bold text-grey-darker`
                    "
                >
                    {{ field.name.toUpperCase() }}
                </span>
            </div>

            <div
                class="flex item-center px-6 w-full h-14 border-b border-grey-light hover:bg-grey-lighter"
                v-for="(item, index) in data"
                :key="index"
            >
                <span class="w-12 flex items-center">
                    <input
                        v-model="selected"
                        type="checkbox"
                        :value="item[resource.primaryKey]"
                    />
                </span>
                <span
                    :key="index"
                    v-for="(field, index) in resource.fields"
                    :class="
                        `w-1/${resource.fields.length +
                            1} flex items-center font-thin text-grey-darkest`
                    "
                >
                    {{ item[field.attribute] }}
                </span>

                <span class="flex items-center justify-end flex-grow">
                    <router-link
                        :to="`/resources/${resource.slug}`"
                        class="text-grey cursor-pointer hover:text-indigo-dark"
                    >
                        <svg
                            width="22"
                            height="18"
                            role="presentation"
                            viewBox="0 0 22 16"
                            class="fill-current"
                            aria-labelledby="view"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                            ></path>
                        </svg>
                    </router-link>
                    <router-link
                        :to="
                            `/resources/${resource.slug}/${
                                item[resource.primaryKey]
                            }/edit`
                        "
                        class="text-grey ml-3 cursor-pointer hover:text-indigo-dark"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            role="presentation"
                            class="fill-current"
                            aria-labelledby="edit"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z"
                            ></path>
                        </svg>
                    </router-link>

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        role="presentation"
                        aria-labelledby="delete"
                        xmlns="http://www.w3.org/2000/svg"
                        @click="deleteConfirm([item[resource.primaryKey]])"
                        class="fill-current text-grey ml-3 cursor-pointer hover:text-indigo-dark"
                    >
                        <path
                            fill-rule="nonzero"
                            d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                        ></path>
                    </svg>
                </span>
            </div>
        </div>

        <div
            class="flex text-grey-dark w-full justify-between rounded-b-lg pr-6 bg-grey-lighter shadow"
        >
            <paginate
                prev-text="«"
                next-text="»"
                no-li-surround
                :force-page="page"
                :page-count="pageCount"
                container-class="paginator"
                page-link-class="paginator__link"
                :click-handler="handlePageChange"
                active-class="paginator__active-link"
                disabled-class="paginator--disabled"
                next-link-class="paginator__next-link"
                prev-link-class="paginator__prev-link"
                break-view-class="paginator__break-view"
            />

            <p class="text-grey-dark flex items-center">
                {{ currentPageStart }} - {{ currentPageEnd }}
                <span class="text-lg px-2">of</span> {{ total }}
            </p>
        </div>
    </div>
</template>

<script>
import { FETCH_RESOURCE, POST_RUN_ACTION, DELETE_RESOURCES } from '@store/modules/resources'

export default {
    /**
     *
     * Define computed properties for this component
     *
     */
    computed: {
        /**
         *
         * Get the total page count
         *
         * @return {Number}
         *
         */
        pageCount() {
            return Math.ceil(this.total / this.resource.perPage)
        },

        /**
         *
         * Get the starting value of the current page
         *
         * @return {Number}
         *
         */
        currentPageStart() {
            return this.resource.perPage * this.page - this.resource.perPage + 1
        },

        /**
         *
         * Get the ending value of the current page
         *
         * @return {Number}
         *
         */
        currentPageEnd() {
            return Math.round(this.total - this.currentPageStart) <=
                this.resource.perPage
                ? this.total
                : this.currentPageStart + this.resource.perPage - 1
        }
    },

    /**
     *
     * Define the data for this resource
     *
     * @return {Object}
     *
     */
    data: () => ({
        search: '',
        selectAll: false,
        selected: [],
        allSelected: false,
        selectedAction: '',
        page: 1,
        data: [],
        total: 0
    }),

    /**
     *
     * Fetch resource details when resource component mounted.
     *
     * @return {void}
     *
     */
    mounted() {
        /**
         *
         * Set the default page
         *
         */
        this.page = parseInt(this.$route.query.page || 1, 10)

        /**
         *
         * Fetch the data for this resource
         *
         */
        this.fetchData()

        /**
         *
         * Listen to when the delete resource event is confirmed.
         *
         */
        Bus.$on('DeleteResourcesConfirmed', items => {
            this.delete(items)
        })

        /**
         * 
         * Listen to when the run action event is confirmed
         * 
         */
        Bus.$on('RunActionConfirmed', action => {
            this.runAction(action)
        })
    },

    /**
     *
     * The methods for this component
     *
     * @type {Object}
     *
     */
    methods: {
        /**
         *
         * Mark all items as selected
         *
         * @return {void}
         *
         */
        markAllAsSelected() {
            this.allSelected = !this.allSelected

            this.selected = this.allSelected
                ? this.data.map(item => item[this.resource.primaryKey])
                : []
        },

        /**
         *
         * Fetch resources data
         *
         * @return {null}
         *
         */
        fetchData() {
            this.$store
                .dispatch(FETCH_RESOURCE, {
                    slug: this.$route.params.slug,
                    page: this.page
                })
                .then(({ data }) => {
                    this.data = data.data
                    this.total = data.total
                })
        },

        /**
         *
         * Trigger delete confirm modal
         *
         * @param {item} array an array of all resource ids to be deleted.
         *
         * @return {void}
         *
         */
        deleteConfirm(items) {
            Bus.$emit('DeleteResources', items)
        },

        /**
         *
         * Delete a resource
         *
         * @return {null}
         *
         */
        delete(primaryKeys) {
            this.$store
                .dispatch(DELETE_RESOURCES, {
                    resources: primaryKeys,
                    slug: this.resource.slug
                })
                .then(() => {
                    this.selected = []

                    this.allSelected = false
                    
                    this.fetchData()
                })
        },

        /**
         *
         * Handle page changed event
         *
         * @return {void}
         *
         */
        handlePageChange(page) {
            this.page = page

            this.selected = []

            this.allSelected = false

            this.fetchData()

            this.$router.push(`${this.$route.path}?page=${page}`)
        },

        /**
         * 
         * Trigger confirmation modal for action
         * 
         * @return {void}
         * 
         */
        runActionConfirm() {
            const action = this.resource.actions.find(action => action.id === this.selectedAction)
            
            Bus.$emit('RunAction', { ...action, count: this.selected.length })
        },

        /**
         * Run an action on selected resource records
         * 
         * @return {void}
         * 
         */
        runAction(action) {
            this.$store.dispatch(POST_RUN_ACTION, {
                resources: this.selected,
                action: this.selectedAction,
                slug: this.$route.params.slug
            }).then(() => {
                /**
                 * 
                 * Reset the selected action to default
                 * 
                 */
                this.selectedAction = ''

                /**
                 * 
                 * Mark all selected as not selected
                 */
                this.selected = []

                /**
                 * 
                 * Set all selected to false
                 * 
                 */
                this.allSelected = false

                /**
                 * 
                 * Fetch a new set of data
                 * 
                 */
                this.fetchData()
            })
        }
    },

    /**
     * Watch properties
     *
     * @type {Object}
     *
     */
    watch: {
        /**
         * Watch the selectAll property
         *
         * @return {null}
         *
         */
        selected(selected) {
            this.allSelected = selected.length === this.data.length
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
