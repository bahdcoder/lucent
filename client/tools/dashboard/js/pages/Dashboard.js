import React from 'react'

class Dashboard extends React.Component {
    render() {
        const Button = Lucent.components['component-button']

        return (
            <div className="max-w-3xl mx-auto">
                <div className="w-full px-8 py-6 bg-white rounded shadow">
                    <h3 className="mt-5 mb-4 text-2xl font-medium uppercase tracking-widest">
                        Welcome to Lucent Admin
                    </h3>
                    <p className="font-light mb-5">
                        Let's get you started with building your application dashboard in no time.
                    </p>

                    <Button link external to='https://google.com' label='View the docs' className='mt-12 w-48' />
                </div>
            </div>
        )
    }
}

export default Dashboard
