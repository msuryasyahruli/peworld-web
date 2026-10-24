import React, { useCallback, useEffect, useId, useState } from "react";

const Modal = ({
  children,
  btnTitle,
  modalTitle,
  buttonClassName = "",
  closeOnBackdrop = true,
  show,
  onOpen,
  onClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = typeof show === "boolean";
  const isOpen = isControlled ? show : internalIsOpen;
  const modalId = useId();
  const titleId = `${modalId}-title`;

  const openModal = () => {
    if (!isControlled) setInternalIsOpen(true);
    onOpen?.();
  };

  const closeModal = useCallback(() => {
    if (!isControlled) setInternalIsOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, isOpen]);

  return (
    <>
      <button
        type="button"
        className={`btn ${buttonClassName}`.trim()}
        onClick={openModal}
      >
        {btnTitle}
      </button>

      {isOpen && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitle ? titleId : undefined}
            onClick={(event) => {
              if (
                event.target instanceof Element &&
                event.target.closest('[data-dismiss="modal"]')
              ) {
                closeModal();
                return;
              }

              if (
                closeOnBackdrop &&
                event.target === event.currentTarget
              ) {
                closeModal();
              }
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  {modalTitle && (
                    <h5 className="modal-title" id={titleId}>
                      {modalTitle}
                    </h5>
                  )}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={closeModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">{children}</div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </>
  );
};

export default Modal;
