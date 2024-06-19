// components
import ItemComponent from "./item.card.component";

// modals
import ItemCreateModal from "./item.create.modal";
import ItemUpdateModal from "./item.update.modal";
import ItemDeleteModal from "./item.delete.modal";

// contexts
import { useItemsContext } from "../../context/items.context";

export default function ItemListComponent() {
  const { itemsData } = useItemsContext();

  return (
    <>
      <section className="px-3">
        <div className="row">
          {!itemsData.length && <span className="text-muted text-center mt-5">no items found</span>}
          {!!itemsData.length &&
            itemsData.map((item) => {
              return (
                <div key={item.id} className="col-12 col-lg-4 col-md-6">
                  <ItemUpdateModal id={item.id} issuer={item.issuer} label={item.label} algorithm={item.algorithm} secret={item.secret} digits={item.digits} period={item.period} />
                  <ItemDeleteModal id={item.id} issuer={item.issuer} label={item.label} />
                  <ItemComponent id={item.id} issuer={item.issuer} label={item.label} algorithm={item.algorithm} secret={item.secret} digits={item.digits} period={item.period} />
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
