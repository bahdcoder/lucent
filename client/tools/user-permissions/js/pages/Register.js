import React from 'react'

class Login extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        errors: {},
        initialized: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        Lucent.request().get('/auth/init').then(({ data }) => {
            this.setState({
                initialized: true
            }, () => {
                if (data.hasAdmin) {
                    this.props.history.push('/auth/login')
                }
            })
        }).catch(() => {
            this.setState({
                initialized: true
            })
        })
    }

    login = event => {
        event.preventDefault()

        Lucent.request()
            .post('/auth/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            .then(() => {
                window.location.href = '/'
            })
            .catch(({ response }) => {
                this.setState({
                    errors: response.data
                })
            })
    }

    render() {
        const Input = Lucent.components['component-text']
        const Button = Lucent.components['component-button']
        const Loader = Lucent.components['component-loader']

        if (!this.state.initialized) return <Loader />

        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-1/4 bg-white rounded-lg shadow px-8 py-4 -mt-48">
                    <h2 className="text-center mt-6 font-semibold uppercase tracking-widest">
                        Welcome to Lucent Admin
                    </h2>
                    <p className='text-xs text-center w-full flex justify-center mb-8'>Create the default administrator user</p>
                    <form onSubmit={this.login}>
                        <div className="flex flex-col">
                            <label className="font-medium" htmlFor="email">
                                Name
                            </label>
                            <Input
                                name="name"
                                className="w-full"
                                placeholder="Full name"
                                value={this.state.name}
                                handler={this.handleChange}
                                error={this.state.errors['name']}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium" htmlFor="email">
                                Email
                            </label>
                            <Input
                                name="email"
                                className="w-full"
                                placeholder="Email"
                                value={this.state.email}
                                handler={this.handleChange}
                                error={this.state.errors['email']}
                            />
                        </div>

                        <div className="flex flex-col mt-3">
                            <label className="font-medium" htmlFor="password">
                                Password
                            </label>
                            <Input
                                name="password"
                                type="password"
                                className="w-full"
                                placeholder="Password"
                                value={this.state.password}
                                handler={this.handleChange}
                            />
                        </div>

                        <div className="flex my-6">
                            <Button label="Get Started" className='w-full justify-center' />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
