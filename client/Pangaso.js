import Axios from 'axios'
import React from 'react'
import Toasted from 'toastedjs'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

// components
import Svg from './components/Svg'
import Table from './components/Table'
import Modal from './components/Modal'
import Loader from './components/Loader'
import Button from './components/Button'
import Checkbox from './components/Checkbox'

// details
import IDDetail from './components/Detail/ID'
import NumDetail from './components/Detail/Num'
import TextDetail from './components/Detail/Text'
import DateDetail from './components/Detail/Date'
import BooleanDetail from './components/Detail/Boolean'
import PasswordDetail from './components/Detail/Password'
import TextareaDetail from './components/Detail/Textarea'

// fields
import NumField from './components/Form/NumField'
import DateField from './components/Form/DateField'
import TextField from './components/Form/TextField'
import BooleanField from './components/Form/BooleanField'
import TextareaField from './components/Form/TextareaField'
import PasswordField from './components/Form/PasswordField'

class Form {}

export class Pangaso {
    /**
     *
     * Initialize the pangaso instance
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
                if (error.response.status === 422) {
                    const errors = {}

                    error.response.data.forEach(error => {
                        errors[error.field] = error.message
                    })

                    error.response.data = errors

                    _this.error('Validation errors. Please fix !')
                } else {
                    _this.error(
                        error.response.data.message || 'An error occured !'
                    )
                }

                return Promise.reject(error)
            }
        )

        /**
         *
         * Here we'll register a bunch of fields that come
         * by default with Pangaso
         *
         */
        this.field('form-num', NumField)
        this.field('form-text', TextField)
        this.field('form-date', DateField)
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
        this.component('component-modal', Modal)
        this.component('component-table', Table)
        this.component('component-loader', Loader)
        this.component('component-button', Button)
        this.component('component-checkbox', Checkbox)
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

export default new Pangaso()
