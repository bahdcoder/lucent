import React from 'react'
import Button from '@components/Button'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent } from 'react-testing-library'

describe('<Button />', () => {
    const defaultProps = {
        label: '',
        className: '',
        link: false,
        type: 'primary'
    }

    it('should render properly', () => {
        const { container } = render(<Button {...defaultProps} />)

        expect(container.firstChild).toMatchInlineSnapshot(`
            <button
              class="trans-30 no-underline text-white rounded-lg px-8 h-9 flex items-center focus:outline-none bg-indigo hover:bg-indigo-dark"
            />
        `)
    })

    it('should call handler properly', () => {
        const props = {
            ...defaultProps,
            label: 'Perform Action',
            handler: jest.fn()
        }
        const { getByText } = render(<Button {...props} />)

        fireEvent.click(getByText(/Perform Action/i))

        expect(props.handler).toHaveBeenCalled()
    })

    it('should display a link component if specified', () => {
        const props = {
            ...defaultProps,
            link: true,
            to: '/resources',
            label: 'Navigate to page',
            handler: jest.fn()
        }

        const { container, getByText } = render(
            <BrowserRouter>
                <Button {...props} />
            </BrowserRouter>
        )

        expect(getByText(/Navigate to page/i)).toMatchInlineSnapshot(`
                        <a
                          class="trans-30 no-underline text-white rounded-lg px-8 h-9 flex items-center focus:outline-none bg-indigo hover:bg-indigo-dark"
                          href="/resources"
                        >
                          Navigate to page
                        </a>
                `)
        expect(container.firstChild).toBeInstanceOf(HTMLAnchorElement)
    })

    it('should add additional classes to underlying button element', () => {
        const props = {
            ...defaultProps,
            label: 'Perform Action',
            className: 'perform-action-button'
        }

        const { container } = render(<Button {...props} />)

        expect(container.firstChild).toMatchInlineSnapshot(`
                                    <button
                                      class="trans-30 no-underline text-white rounded-lg px-8 h-9 flex items-center focus:outline-none bg-indigo hover:bg-indigo-dark perform-action-button"
                                    >
                                      Perform Action
                                    </button>
                        `)
    })
})
