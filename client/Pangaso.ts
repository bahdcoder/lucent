import * as React from 'react'
import Toasted from 'toastedjs'
import classnames from 'classnames'
import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

// components
import Table from './components/Table'
import Modal from './components/Modal'
import Loader from './components/Loader'
import Button from './components/Button'

// fields
import NumField from './components/Form/NumField'
import DateField from './components/Form/DateField'
import TextField from './components/Form/TextField'
import TextareaField from './components/Form/TextareaField'
import PasswordField from './components/Form/PasswordField'

class Form {}

export class Pangaso {
    /**
     *
     * Axios instance
     *
     */
    public instance: AxiosInstance

    /**
     *
     * Define the array of booting callbacks
     */
    public bootingCallbacks: Function[] = []

    /**
     *
     * Register all available fields
     *
     */
    public fields: any = {}

    /**
     *
     * Define all resources on pangaso
     *
     */
    public resources: [] = []

    /**
     *
     * Register all available routes
     *
     */
    public routes: any = []

    /**
     *
     * Register all sidebar items
     *
     */
    public sidebarItems: any = []

    /**
     *
     * Define global components that can be used anywhere
     *
     */
    public components: any = {}

    /**
     *
     * Initialize the pangaso instance
     *
     */
    public constructor() {
        /**
         *
         * Create axios instance
         *
         */
        this.instance = Axios.create({
            baseURL: '/api/'
        })

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                console.log(error.response)

                if (error.response.status === 422) {
                    const errors: any = {}

                    error.response.data.forEach((error: any) => {
                        errors[error.field] = error.message
                    })

                    error.response.data = errors

                    this.error('Validation errors. Please fix !')
                } else {
                    this.error(error.response.data.message || 'An error occured !')
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
        this.field('form-password', PasswordField)
        this.field('form-textarea', TextareaField)

        /**
         *
         * Here we'll register components to the component
         * registry
         *
         */
        this.component('component-modal', Modal)
        this.component('component-table', Table)
        this.component('component-loader', Loader)
        this.component('component-button', Button)
    }

    /**
     *
     * Make an api request
     *
     * @return {AxiosInstance}
     *
     */
    public request(): AxiosInstance {
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
    public toasted(options: any = {}) {
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
    public success(message: string) {
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
    public error(message: string) {
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

    public Form() {
        return new Form()
    }

    /**
     *
     * Boot all tool callbacks
     *
     * @return {void}
     *
     */
    public booting(boot: Function) {
        this.bootingCallbacks.push(boot)
    }

    /**
     *
     * Boot all of the boot callbacks
     *
     * @return {void}
     *
     */
    public boot(resources: string) {
        this.resources = JSON.parse(resources)

        this.bootingCallbacks.forEach((boot: Function) =>
            boot({
                route: this.route.bind(this),
                field: this.field.bind(this),
                sidebar: this.sidebar.bind(this),
                component: this.component.bind(this)
            })
        )
    }

    /**
     *
     * Use this function to set state
     *
     */
    public setState(data: any, callback?: Function) {}

    /**
     *
     * Register a field component.
     *
     * @return {void}
     *
     */
    public field(name: string, component: any) {
        this.fields[name] = component
    }

    /**
     * Define routes
     *
     * @param {string} path
     *
     * @param {React.Component} component
     *
     */
    public route(path: string, component: React.SFC) {
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
    public sidebar(Sidebar: React.SFC) {
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
    public component(key: string, component: React.SFC) {
        this.components[key] = component
    }
}

export default new Pangaso()
