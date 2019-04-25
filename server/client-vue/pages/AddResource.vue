<template>
    <div v-if="form">
        <h2 class="font-thin text-3xl mb-8">
            {{ editing ? 'Edit' : 'New' }} {{ resource.name }}
        </h2>

        <div class="w-full mt-6 bg-white rounded-lg">
            <div
                class="w-full border-b flex items-center border-grey-light py-6 px-12"
                v-for="(field, index) in resource.fields"
                :key="index"
            >
                <label class="w-1/4 text-lg font-thin text-grey-dark">
                    {{ field.name }}
                </label>

                <div class="w-2/4 flex flex-col">
                    <input
                        :type="getType(field)"
                        :placeholder="field.name"
                        :ref="field.attribute"
                        :name="field.attribute"
                        :class="
                            classnames(FORM_CONTROL, 'w-full', {
                                'border-2 border-red focus:border-red': form.errors.has(
                                    field.attribute
                                )
                            })
                        "
                        v-model="form.fields[field.attribute]"
                        v-if="
                            ['Text', 'Password', 'Num', 'Date'].includes(
                                field.type
                            )
                        "
                    />
                    <textarea
                        cols="3"
                        rows="3"
                        :placeholder="field.name"
                        v-if="field.type === 'Textarea'"
                        :class="
                            classnames(FORM_CONTROL, 'w-full py-5 h-auto', {
                                'border-2 border-red focus:border-red': form.errors.has(
                                    field.attribute
                                )
                            })
                        "
                        v-model="form.fields[field.attribute]"
                    ></textarea>
                    <span
                        v-if="form.errors.has(field.attribute)"
                        class="text-xs text-red font-thin"
                    >
                        {{ form.errors.get(field.attribute) }}
                    </span>
                </div>
            </div>
        </div>

        <div class="p-8 flex justify-end bg-grey-lighter shadow">
            <button :class="`${PRIMARY_BUTTON} mr-6`">
                {{
                    editing
                        ? 'Update & Continue Editing'
                        : 'Create & Add another'
                }}
            </button>
            <button
                @click="editing ? update() : create()"
                :class="`${PRIMARY_BUTTON}`"
            >
                {{ `${editing ? 'Update' : 'Create'} ${resource.name}` }}
            </button>
        </div>
    </div>
</template>

<script>
import FlatPickr from 'flatpickr'
import format from 'date-fns/format'
import { GET_RESOURCE } from '@store/modules/resources'

export default {
    /**
     *
     * Define the data for this resource
     *
     * @return {Object}
     *
     */
    data: () => ({
        form: null,
        editing: false,
        loadingResouce: false
    }),

    /**
     *
     * Define form as soon as form is mounted.
     *
     * @return {null}
     *
     */
    mounted() {
        const fields = {}

        /**
         *
         * Define if this component is in editing mode
         *
         * @var {Boolean}
         *
         */
        this.editing = this.$route.name === 'updateResource'

        /**
         *
         * Loop through fields for this resource and set the attribute on form.
         */
        this.resource.fields.forEach(field => {
            fields[field.attribute] = ''
        })

        /**
         * Get date fields
         *
         * @type {Array}
         *
         */
        const dateFields = this.getDateFields()

        const dateFormat = field => `YYYY-MM-DD ${field.enableTime ? 'mm:ss' : ''}`

        if (this.editing) {
            this.loadingResouce = true

            this.$store
                .dispatch(GET_RESOURCE, {
                    slug: this.resource.slug,
                    primaryKey: this.$route.params.resource
                })
                .then(response => {
                    Object.keys(fields).forEach(field => {
                        fields[field] = response.data[field]
                    })

                    this.form = new Pangaso.Form(fields)

                    this.loadingResouce = false

                    setTimeout(() => {
                        dateFields.forEach(field => {
                            const flatPickrOptions = {
                                defaultDate:
                                    response.data[field.attribute] ||
                                    new Date(),
                                enableTime: field.enableTime
                            }

                            FlatPickr(this.$refs[field.attribute], flatPickrOptions)

                            this.form.fields[field.attribute] = format(flatPickrOptions.defaultDate, dateFormat(field))
                        })
                    }, 0)
                })
        } else {
            this.form = new Pangaso.Form(fields)

            setTimeout(() => {
                dateFields.forEach(field => {
                    FlatPickr(this.$refs[field.attribute], {
                        defaultDate: new Date(),
                        enableTime: field.enableTime
                    })

                    this.form.fields[field.attribute] = format(new Date(), dateFormat(field))
                })
            }, 0)
        }
    },

    methods: {
        /**
         * Get a valid input type for a field
         *
         * @return {string}
         *
         */
        getType(field) {
            switch (field.type) {
                case 'Num':
                    return 'number'
                default:
                    return field.type.toLowerCase()
            }
        },

        /**
         *
         * Submit form to create resource
         *
         * @return {null}
         *
         */
        create() {
            this.form.post({
                url: `/resources/${this.resource.slug}`,
                then: () => {
                    this.$router.push(`/resources/${this.resource.slug}`)
                }
            })
        },

        /**
         *
         * Update an existing resource
         *
         * @return {null}
         *
         */
        update() {
            this.form.put({
                url: `/resources/${this.resource.slug}/${
                    this.$route.params.resource
                }`,
                then: () => {
                    this.$router.push(`/resources/${this.resource.slug}`)
                }
            })
        },

        /**
         *
         * Initialize all date fields with flatpickr
         *
         * @return {void}
         *
         */
        getDateFields() {
            return this.resource.fields.filter(field => field.type === 'Date')
        }
    }
}
</script>
