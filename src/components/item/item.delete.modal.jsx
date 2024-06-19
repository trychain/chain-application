// packages
import react from "react";

// contexts
import { useItemsContext } from "../../context/items.context";

// hooks
import useModalManager from "../../hooks/modal-manager.hook";

// helpers
import reactHotToastHelper from "../../helpers/react-hot-toast.helper";

export default function ItemDeleteModal({ id, issuer, label }) {
  // contexts
  const { deleteItem } = useItemsContext();

  // states
  const [formBlock, setFormBlock] = react.useState();

  // hooks
  const [, hideItemDeleteModal] = useModalManager({
    id: `model_delete_${id}`,
  });

  async function handleDelete(event) {
    event.preventDefault();

    const toast = reactHotToastHelper({
      text: "loading",
    });
    setFormBlock(true);

    deleteItem({
      id: id,
    })
      .then((response) => {
        hideItemDeleteModal();

        toast.success({
          text: response.message,
        });
      })
      .catch((error) => {
        toast.error({
          text: error.message,
        });
      })
      .finally(() => {
        setFormBlock(false);
      });
  }
  return (
    <form onSubmit={handleDelete}>
      <div className="modal fade" id={`model_delete_${id}`} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Delete {issuer}: {label}
              </h5>
              <button type="button" className="btn-close" onClick={hideItemDeleteModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>by pressing on delete button you will remove the code and you cannot</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" onClick={hideItemDeleteModal}>
                Close
              </button>
              <button disabled={formBlock} type="submit" className="btn btn-sm btn-primary">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
