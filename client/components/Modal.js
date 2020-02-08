import React from 'react'

// components
import Button from './Button'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#app')

const Modal = ({
    open = false,
    title = '',
    renderFooter,
    renderContent,
    action,
    cancel
}) => (
    <ReactModal
        isOpen={open}
        className="mx-auto mt-16 focus:outline-none justify-center w-full h-full"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 bg-gray-modal"
    >
        <div className="bg-white rounded shadow w-full max-w-lg mx-auto">
            <div className="p-8">
                <h4 className="font-medium text-xl mb-8">{title}</h4>
                {renderContent && renderContent()}
            </div>
            <footer className="w-full flex bg-gray-200 justify-end rounded-b-lg px-8 py-4">
                {renderFooter && renderFooter()}
                {!renderFooter && (
                    <React.Fragment>
                        <button
                            onClick={cancel}
                            className="bg-transparent mr-6 text-grey-dark focus:outline-none"
                        >
                            Cancel
                        </button>
                        <Button {...action} />
                    </React.Fragment>
                )}
            </footer>
        </div>
    </ReactModal>
)

export default Modal
