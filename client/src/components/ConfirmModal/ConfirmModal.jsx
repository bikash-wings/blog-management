import ReactDOM from "react-dom";

const ConfirmModal = ({ modal, setModal, deleteBlog, updateBlog }) => {
  return ReactDOM.createPortal(
    <div
      className="modal modal-blur fade show"
      id="modal-danger"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      style={{ display: "block", paddingLeft: 0 }}
      onClick={() =>
        setModal((p) => ({ ...p, confirm: false, updateConfirm: false }))
      }
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
        role="document"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="modal-content">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() =>
              setModal((p) => ({ ...p, confirm: false, updateConfirm: false }))
            }
          />
          <div className="modal-status bg-danger" />
          <div className="modal-body text-center py-4">
            {/* Download SVG icon from http://tabler-icons.io/i/alert-triangle */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon mb-2 text-danger icon-lg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 9v4" />
              <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
              <path d="M12 16h.01" />
            </svg>
            <h3>Are you sure?</h3>
            <div className="text-secondary">
              Do you really want to {modal.confirm ? "remove" : "update"} blog?
              What you've done cannot be undone.
            </div>
          </div>
          <div className="modal-footer">
            <div className="w-100">
              <div className="row">
                <div className="col">
                  <a
                    href="#"
                    className="btn w-100"
                    data-bs-dismiss="modal"
                    onClick={() =>
                      setModal((p) => ({
                        ...p,
                        confirm: false,
                        updateConfirm: false,
                      }))
                    }
                  >
                    Cancel
                  </a>
                </div>
                {modal.confirm && (
                  <div
                    className="col"
                    onClick={() => {
                      deleteBlog();
                      setModal((p) => ({ ...p, confirm: false }));
                    }}
                  >
                    <a
                      href="#"
                      className="btn btn-danger w-100"
                      data-bs-dismiss="modal"
                    >
                      Delete Blog
                    </a>
                  </div>
                )}
                {modal.updateConfirm && (
                  <div
                    className="col"
                    onClick={() => {
                      setModal((p) => ({ ...p, updateConfirm: false }));
                      updateBlog();
                    }}
                  >
                    <a
                      href="#"
                      className="btn btn-danger w-100"
                      data-bs-dismiss="modal"
                    >
                      Update Blog
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmModal;
