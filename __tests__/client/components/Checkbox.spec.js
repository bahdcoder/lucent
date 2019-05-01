import React from 'react'
import Checkbox from '@components/Checkbox'
import { render, fireEvent } from 'react-testing-library'

describe('<Checkbox />', () => {
    const defaultProps = {
        id: 'published',
        value: 'published',
        checked: false,
        handler: jest.fn()
    }

    it('should render correctly', () => {
        const { container } = render(<Checkbox {...defaultProps} />)

        expect(container.firstChild).toMatchInlineSnapshot(`
            <input
              class="checkbox"
              id="published"
              type="checkbox"
              value="published"
            />
        `)
    })
})
