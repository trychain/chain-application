// package
import react from "react";

// components
import LoadingComponent from "../components/loading.component";

// contexts
import { useAuthContext } from "./auth.context";

// helpers
import apiRequestHelper from "../helpers/api-request.helper";
import idGeneratorHelper from "../helpers/id-generator.helper";
import reactHotToastHelper from "../helpers/react-hot-toast.helper";
import * as applicationStorage from "../helpers/storage.helper";

export const ItemsContext = react.createContext();

export function ItemsProvider({ children }) {
  // context
  const { userData } = useAuthContext();

  // states
  const [isLoaded, setIsLoaded] = react.useState(false);
  const [itemsData, setItemsData] = react.useState([]);

  react.useEffect(() => {
    setTimeout(() => {
      apiRequestHelper({
        endpoint: "/code",
        method: "GET",
      })
        .then(async (response) => {
          const localApplicationQueues = await applicationStorage.fetchQueues();

          if (!localApplicationQueues.length) {
            await applicationStorage.replaceItems(response.data);
            setItemsData(response.data);
            return;
          }
        })
        .catch(() => {});
    }, 1 * 60 * 1000);
  }, []);

  react.useEffect(() => {
    apiRequestHelper({
      endpoint: "/code",
      method: "GET",
    })
      .then(async (response) => {
        const localApplicationQueues = await applicationStorage.fetchQueues();

        if (!localApplicationQueues.length) {
          await applicationStorage.replaceItems(response.data);
          setItemsData(response.data);
          return;
        }

        for (const action of localApplicationQueues) {
          if (action.type === "ITEM_CREATE") {
            const actionItem = await applicationStorage.fetchItem({
              id: action.target,
            });

            if (!actionItem) {
              await applicationStorage.deleteQueue({
                id: action.id,
              });
            }

            apiRequestHelper({
              endpoint: "/code",
              method: "POST",
              body: {
                issuer: actionItem.issuer,
                label: actionItem.label,
                algorithm: actionItem.algorithm,
                secret: actionItem.secret,
                digits: actionItem.digits,
                period: actionItem.period,
              },
            })
              .then(async (response) => {
                await applicationStorage.deleteQueue({
                  id: action.id,
                });

                await applicationStorage.deleteItem({
                  id: action.target,
                });

                await applicationStorage.createItem({
                  id: response.data.id,
                  issuer: response.data.issuer,
                  label: response.data.label,
                  secret: response.data.secret,
                  algorithm: response.data.algorithm,
                  digits: response.data.digits,
                  period: response.data.period,
                });
              })
              .catch(async () => {
                if (error.status !== 0) {
                  await applicationStorage.deleteQueue({
                    id: action.id,
                  });
                }
              });
          }
          if (action.type === "ITEM_UPDATE") {
            const actionItem = await applicationStorage.fetchItem({
              id: action.target,
            });

            if (!actionItem) {
              await applicationStorage.deleteQueue({
                id: action.id,
              });
            }

            apiRequestHelper({
              endpoint: "/code/" + action.target,
              method: "PUT",
              body: {
                issuer: actionItem.issuer,
                label: actionItem.label,
                algorithm: actionItem.algorithm,
                secret: actionItem.secret,
                digits: actionItem.digits,
                period: actionItem.period,
              },
            })
              .then(async (response) => {
                await applicationStorage.deleteQueue({
                  id: action.id,
                });

                await applicationStorage.deleteItem({
                  id: action.target,
                });

                await applicationStorage.createItem({
                  id: response.data.id,
                  issuer: response.data.issuer,
                  label: response.data.label,
                  secret: response.data.secret,
                  algorithm: response.data.algorithm,
                  digits: response.data.digits,
                  period: response.data.period,
                });
              })
              .catch(async () => {
                if (error.status !== 0) {
                  await applicationStorage.deleteQueue({
                    id: action.id,
                  });
                }
              });
          }
          if (action.type === "ITEM_DELETE") {
            apiRequestHelper({
              endpoint: "/code/" + action.target,
              method: "DELETE",
            })
              .then(async (response) => {
                await applicationStorage.deleteQueue({
                  id: action.id,
                });
              })
              .catch(async (error) => {
                if (error.status !== 0) {
                  await applicationStorage.deleteQueue({
                    id: action.id,
                  });
                }
              });
          }
        }

        apiRequestHelper({
          endpoint: "/code",
          method: "GET",
        })
          .then(async (response) => {
            await applicationStorage.replaceItems(response.data);
            setItemsData(response.data);
          })
          .catch(async () => {
            const itemsList = await applicationStorage.fetchItems();
            setItemsData(itemsList);
          });
      })
      .catch(async () => {
        const itemsList = await applicationStorage.fetchItems();
        setItemsData(itemsList);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [userData]);

  function searchItems() {}

  async function createItem({ issuer, label, algorithm, secret, digits, period }) {
    return new Promise((resolve, reject) => {
      apiRequestHelper({
        endpoint: "/code",
        method: "POST",
        body: {
          issuer: issuer,
          label: label,
          algorithm: algorithm,
          secret: secret,
          digits: digits,
          period: period,
        },
      })
        .then(async (response) => {
          await applicationStorage.createItem({
            id: response.data.id,
            issuer: response.data.issuer,
            label: response.data.label,
            secret: response.data.secret,
            algorithm: response.data.algorithm,
            digits: response.data.digits,
            period: response.data.period,
          });

          setItemsData([
            ...itemsData,
            {
              id: response.data.id,
              issuer: response.data.issuer,
              label: response.data.label,
              secret: response.data.secret,
              algorithm: response.data.algorithm,
              digits: response.data.digits,
              period: response.data.period,
            },
          ]);

          resolve(response);
        })
        .catch(async (error) => {
          if (error.status === 400) {
            reject(error);
            return;
          }

          const localApplicationItems = await applicationStorage.fetchItems();
          const localApplicationQueue = await applicationStorage.fetchQueues();

          const actionId = idGeneratorHelper({
            length: 14,
          });

          const itemId = idGeneratorHelper({
            length: 24,
          });

          await applicationStorage.createItem({
            id: itemId,
            issuer: issuer,
            label: label,
            algorithm: algorithm,
            secret: secret,
            period: period,
            digits: digits,
          });

          await applicationStorage.createQueue({
            id: actionId,
            type: "ITEM_CREATE",
            target: itemId,
          });

          setItemsData([
            ...itemsData,
            {
              id: itemId,
              issuer: issuer,
              label: label,
              algorithm: algorithm,
              secret: secret,
              period: period,
              digits: digits,
            },
          ]);

          resolve({
            status: 201,
            success: true,
            message: "item created successfully",
          });
        });
    });
  }
  async function updateItem({ id, issuer, label, algorithm, secret, digits, period }) {
    return new Promise((resolve, reject) => {
      apiRequestHelper({
        endpoint: "/code/" + id,
        method: "PUT",
        body: {
          issuer: issuer,
          label: label,
          algorithm: algorithm,
          secret: secret,
          digits: digits,
          period: period,
        },
      })
        .then(async (response) => {
          await applicationStorage.updateItem({
            id: response.data.id,
            issuer: response.data.issuer,
            label: response.data.label,
            secret: response.data.secret,
            algorithm: response.data.algorithm,
            digits: response.data.digits,
            period: response.data.period,
          });

          const itemsDataMap = itemsData.map((item) => {
            if (item.id === id) {
              return {
                id: response.data.id,
                issuer: response.data.issuer,
                label: response.data.label,
                secret: response.data.secret,
                algorithm: response.data.algorithm,
                digits: response.data.digits,
                period: response.data.period,
              };
            }

            return item;
          });

          setItemsData([...itemsDataMap]);

          resolve(response);
        })
        .catch(async (error) => {
          if (error.status === 400) {
            reject(error);
            return;
          }

          const localApplicationItems = await applicationStorage.fetchItems();
          const localApplicationQueue = await applicationStorage.fetchQueues();

          const actionId = idGeneratorHelper({
            length: 14,
          });

          await applicationStorage.createQueue({
            id: actionId,
            type: "ITEM_UPDATE",
            target: id,
          });

          await applicationStorage.updateItem({
            id: id,
            issuer: issuer,
            label: label,
            algorithm: algorithm,
            secret: secret,
            digits: digits,
            period: period,
          });

          const itemsDataMap = itemsData.map((item) => {
            if (item.id === id) {
              return {
                id: id,
                issuer: issuer,
                label: label,
                algorithm: algorithm,
                secret: secret,
                digits: digits,
                period: period,
              };
            }

            return item;
          });

          setItemsData([...itemsDataMap]);

          resolve({
            status: 201,
            success: true,
            message: "item updated successfully",
          });
        });
    });
  }

  async function deleteItem({ id }) {
    return new Promise((resolve, reject) => {
      apiRequestHelper({
        endpoint: "/code/" + id,
        method: "DELETE",
      })
        .then(async (response) => {
          await applicationStorage.deleteItem({
            id: id,
          });

          const itemDataFilter = itemsData.filter((item) => {
            return item.id !== id;
          });

          setItemsData([...itemDataFilter]);

          resolve(response);
        })
        .catch(async (error) => {
          if (error.status === 400) {
            reject(error);
            return;
          }

          const localApplicationItems = await applicationStorage.fetchItems();
          const localApplicationQueue = await applicationStorage.fetchQueues();

          const actionId = idGeneratorHelper({
            length: 14,
          });

          await applicationStorage.deleteItem({
            id: id,
          });

          await applicationStorage.createQueue({
            id: actionId,
            type: "ITEM_DELETE",
            target: id,
          });

          const itemDataFilter = itemsData.filter((item) => {
            return item.id !== id;
          });

          setItemsData([...itemDataFilter]);

          resolve({
            status: 201,
            success: true,
            message: "item deleted successfully",
          });
        });
    });
  }

  if (!isLoaded) {
    return <LoadingComponent text="Loading items" />;
  }

  return (
    <ItemsContext.Provider
      value={{
        itemsData: itemsData,
        createItem: createItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsContext() {
  const context = react.useContext(ItemsContext);
  return context;
}
