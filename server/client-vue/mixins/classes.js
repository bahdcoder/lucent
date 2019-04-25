import classnames from 'classnames'

export default {
    /**
     *
     * Define reusable classes for elements
     *
     * @type {Function}
     *
     */
    data: () => ({
        PRIMARY_BUTTON:
            'trans-30 text-white bg-indigo-light focus:outline-none px-8 h-9 rounded-lg hover:bg-indigo-dark',
        FORM_CONTROL:
            'bg-white focus:outline-none text-grey-darkest my-3 border border-grey h-10 px-3 rounded-lg shadow focus:outline-none focus:border-indigo focus:border-2',
        DANGER_BUTTON:
            'trans-30 text-white bg-red-light focus:outline-none px-8 h-9 rounded-lg hover:bg-red-dark'
    }),
    methods: {
        classnames(...all) {
            return classnames(...all)
        }
    }
}
