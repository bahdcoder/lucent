<template>
    <div
        class="w-full border-b flex items-center border-grey-light py-6 px-12"
        v-for="(field, index) in fields"
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
</template>

<script>
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

    props: {
        editing: {
            default: false,
            required: false
        },
        fields: {
            default: () => [],
            required: false
        }
    },

    methods: {
        
    }
}
</script>
