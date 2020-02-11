import React from 'react'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = event => {
        event.preventDefault()

        Lucent.request()
            .post('/auth/login', {
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
        const Link = Lucent.components['component-link']
        const Button = Lucent.components['component-button']

        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-96 bg-white rounded-lg shadow px-6 py-4 -mt-48">
                    <h2 className="text-center my-3 font-semibold uppercase text-3xl tracking-widest">
                        Lucent
                    </h2>
                    <form onSubmit={this.login}>
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

                        <div className="flex justify-between my-6">
                            <Link to="/auth/forgot-password">
                                Forgot your password?
                            </Link>
                            <Button label="Sign in" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
