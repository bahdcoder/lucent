import Axios from 'axios'
import React from 'react'
import Toasted from 'toastedjs'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

// components
import Svg from './components/Svg'
import File from './components/File'
import Text from './components/Text'
import Table from './components/Table'
import Modal from './components/Modal'
import Loader from './components/Loader'
import Button from './components/Button'
import Select from './components/Select'
import Combobox from './components/Combobox'
import Checkbox from './components/Checkbox'

// details
import IDDetail from './components/Detail/ID'
import NumDetail from './components/Detail/Num'
import TextDetail from './components/Detail/Text'
import DateDetail from './components/Detail/Date'
import FileDetail from './components/Detail/File'
import SelectDetail from './components/Detail/Select'
import BooleanDetail from './components/Detail/Boolean'
import PasswordDetail from './components/Detail/Password'
import TextareaDetail from './components/Detail/Textarea'

// fields
import NumField from './components/Form/NumField'
import DateField from './components/Form/DateField'
import TextField from './components/Form/TextField'
import FileField from './components/Form/FileField'
import SelectField from './components/Form/SelectField'
import BooleanField from './components/Form/BooleanField'
import TextareaField from './components/Form/TextareaField'
import PasswordField from './components/Form/PasswordField'

// filters
import DateFilter from './components/Filter/Date'
import SelectFilter from './components/Filter/Select'
import BooleanFilter from './components/Filter/Boolean'

class Form {}

export class Lucent {
    /**
     *
     * Initialize the Lucent instance
     *
     */
    constructor() {
        /**
         *
         * Create axios instance
         *
         */
        this.instance = Axios.create({
            baseURL: '/api/'
        })

        /**
         *
         * Initialize global fields
         *
         */
        this.fields = {}

        /**
         *
         * Initialize global component registry
         *
         */
        this.components = {}

        /**
         *
         * Initialize global filters registry
         *
         */
        this.filters = {}

        /**
         *
         * Initialize booting callbacks for all plugins/tools
         *
         */
        this.bootingCallbacks = []

        /**
         *
         * Define all routes
         *
         */
        this.routes = []

        /**
         *
         * Define all detail components
         *
         */
        this.details = {}

        /**
         *
         * Initialize all sidebar items
         *
         */
        this.sidebarItems = []

        /**
         *
         * Save an instance of the real `this`
         *
         */
        let _this = this

        /**
         *
         * Register an HTTP interceptor to format errors
         * and flash default error.
         *
         */
        this.instance.interceptors.response.use(
            response => response,
            error => {
                try {
                    if (error.response.status === 422) {
                        _this.error('Validation errors. Please fix !')
                        const responseErrors = {}
                        const { resourceErrors } = error.response.data

                        if (resourceErrors) {
                            for (const resourceError in resourceErrors) {
                                if (
                                    resourceErrors.hasOwnProperty(resourceError)
                                ) {
                                    const errors = resourceErrors[resourceError]

                                    if (resourceError === 'topLevelErrors') {
                                        errors.forEach(error => {
                                            responseErrors[error.field] =
                                                error.message
                                        })
                                    } else {
                                        if (
                                            resourceErrors[resourceError]
                                                .length &&
                                            resourceErrors[resourceError]
                                                .length > 0 &&
                                            Array.isArray(
                                                resourceErrors[resourceError][0]
                                            )
                                        ) {
                                            responseErrors[resourceError] = []

                                            resourceErrors[
                                                resourceError
                                            ].forEach(error => {
                                                const formattedErrors = {}

                                                error.forEach(e => {
                                                    formattedErrors[e.field] =
                                                        e.message
                                                })

                                                responseErrors[
                                                    resourceError
                                                ].push(formattedErrors)
                                            })
                                        } else {
                                            responseErrors[resourceError] = {}

                                            errors.forEach(error => {
                                                responseErrors[resourceError][
                                                    error.field
                                                ] = error.message
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        error.response.data = responseErrors
                    } else {
                        _this.error(
                            error.response.data.message || 'An error occured !'
                        )
                    }
                } catch (e) {
                    console.log(e)
                }

                return Promise.reject(error)
            }
        )

        /**
         *
         * Here we'll register a bunch of fields that come
         * by default with Lucent
         *
         */
        this.field('form-num', NumField)
        this.field('form-text', TextField)
        this.field('form-date', DateField)
        this.field('form-file', FileField)
        this.field('form-select', SelectField)
        this.field('form-boolean', BooleanField)
        this.field('form-password', PasswordField)
        this.field('form-textarea', TextareaField)

        /**
         *
         * Here we'll register a bunch of components to be used
         * to display the details of resource fields on
         * the details page
         *
         */
        this.detail('detail-id', IDDetail)
        this.detail('detail-num', NumDetail)
        this.detail('detail-text', TextDetail)
        this.detail('detail-date', DateDetail)
        this.detail('detail-file', FileDetail)
        this.detail('detail-select', SelectDetail)
        this.detail('detail-boolean', BooleanDetail)
        this.detail('detail-textarea', TextareaDetail)
        this.detail('detail-password', PasswordDetail)

        /**
         *
         * Here we'll register components to the component
         * registry
         *
         */
        this.component('component-svg', Svg)
        this.component('component-link', Link)
        this.component('component-file', File)
        this.component('component-text', Text)
        this.component('component-modal', Modal)
        this.component('component-table', Table)
        this.component('component-loader', Loader)
        this.component('component-button', Button)
        this.component('component-select', Select)
        this.component('component-checkbox', Checkbox)
        this.component('component-combobox', Combobox)

        /**
         *
         * Here we'll register filters to the filter registry
         */
        this.filter('filter-date', DateFilter)
        this.filter('filter-select', SelectFilter)
        this.filter('filter-boolean', BooleanFilter)
    }

    /**
     *
     * Make an api request
     *
     * @return {AxiosInstance}
     *
     */
    request = () => {
        return this.instance
    }

    /**
     *
     * Get a toasted instance
     *
     * @param {Object} options
     *
     * @return {Toasted}
     *
     */
    toasted = (options = {}) => {
        return new Toasted({
            duration: 4000,
            theme: 'bubble',
            position: 'bottom-right',
            className: classnames('shadow-lg rounded-lg text-white px-8 py-2', {
                'bg-green': options.type === 'success',
                'bg-red': options.type === 'error'
            }),
            ...options
        })
    }

    /**
     *
     * Toast a success message
     *
     * @return {void}
     *
     */
    success = message => {
        return this.toasted({
            type: 'success'
        }).show(message)
    }

    /**
     *
     * Toast a error message
     *
     * @return {void}
     *
     */
    error = message => {
        return this.toasted({
            type: 'error'
        }).show(message)
    }

    /**
     *
     * Get a form instance
     *
     * @return {Form}
     *
     */

    Form() {
        return new Form()
    }

    /**
     *
     * Boot all tool callbacks
     *
     * @param {Function} boot
     *
     * @return {void}
     *
     */
    booting = boot => {
        this.bootingCallbacks.push(boot)
    }

    /**
     *
     * Boot all of the boot callbacks
     *
     * @param {Array} resources
     *
     * @return {void}
     *
     */
    boot = resources => {
        this.resources = JSON.parse(resources)

        let _this = this

        this.bootingCallbacks.forEach(boot =>
            boot({
                route: _this.route.bind(_this),
                field: _this.field.bind(_this),
                sidebar: _this.sidebar.bind(_this),
                component: _this.component.bind(_this)
            })
        )
    }

    /**
     *
     * Use this function to set state
     *
     */
    setState(data, callback) {}

    /**
     *
     * Register a field component.
     *
     * @return {void}
     *
     */
    field = (name, component) => {
        this.fields[name] = component

        return this
    }

    /**
     * Define routes
     *
     * @param {string} path
     *
     * @param {React.Component} component
     *
     */
    route = (path, component) => {
        this.routes.push({
            path,
            component
        })

        this.setState({ routes: this.routes })
    }

    /**
     *
     * Set sidebar items
     *
     * @return {void}
     *
     */
    sidebar = Sidebar => {
        this.sidebarItems.push(Sidebar)

        this.setState({ sidebarItems: this.sidebarItems })
    }

    /**
     *
     * Register global components
     *
     * @param {string} key
     *
     * @param {React.SFC} component
     *
     * @return {void}
     *
     */
    component = (key, component) => {
        this.components[key] = component
    }

    /**
     *
     * Register global filters
     *
     * @param {string} key
     *
     * @param {React.SFC} filter
     *
     * @return {void}
     *
     */
    filter = (key, filter) => {
        this.filters[key] = filter
    }

    /**
     *
     * Register global detail components
     *
     * @param {string} key
     *
     * @param {React.SFC} component
     *
     * @return {void}
     *
     */
    detail = (key, detail) => {
        this.details[key] = detail
    }
}

export default new Lucent()
