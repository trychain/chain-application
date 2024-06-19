// packages
import localForage from "localforage";

// helpers
import idGenerator from "./id-generator.helper";

export const localForageInstance = localForage.createInstance({
  name: "application-database",
  storeName: "local-applcation",
  version: 1,
});

export async function fetchSettings() {
  const _applicationSettings = (await localForageInstance.getItem("local-application-settings")) ?? {
    itemBeautifier: false,
    logsSaver: false,
    fastCopier: false,
    darkMode: false,
  };

  return _applicationSettings;
}

export async function createSettings({ itemBeautifier, logsSaver, fastCopier,darkMode }) {
  await localForageInstance.setItem("local-application-settings", {
    itemBeautifier: itemBeautifier,
    logsSaver: logsSaver,
    fastCopier: fastCopier,
    darkMode: darkMode,
  });
}

export async function fetchAuthorization() {
  const _applicationAuth = await localForageInstance.getItem("local-application-auth");

  return _applicationAuth;
}

export async function createAuthorization({ token }) {
  await localForageInstance.setItem("local-application-auth", token);
}

export async function deleteAuthorization() {
  await localForageInstance.removeItem("local-application-auth");
}

export async function replaceItems(items) {
  await localForageInstance.setItem("local-application-items", items);
}

export async function fetchItems() {
  const _applicationItems = (await localForageInstance.getItem("local-application-items")) ?? [];

  return _applicationItems;
}

export async function fetchItem({ id }) {
  const _applicationItems = (await localForageInstance.getItem("local-application-items")) ?? [];

  const _applicationItemsFilter = _applicationItems.filter((item) => {
    return item.id === id;
  })[0];

  return _applicationItemsFilter;
}

export async function createItem({ id, issuer, label, secret, algorithm, digits, period }) {
  const _applicationItems = (await localForageInstance.getItem("local-application-items")) ?? [];

  const _applicationItemsSpread = [
    ..._applicationItems,
    {
      id: id,
      issuer: issuer,
      label: issuer,
      secret: secret,
      algorithm: algorithm,
      digits: digits,
      period: period,
    },
  ];

  await localForageInstance.setItem("local-application-items", _applicationItemsSpread);
}

export async function updateItem({ id, issuer, label, secret, algorithm, digits, period }) {
  const _applicationItems = (await localForageInstance.getItem("local-application-items")) ?? [];

  const _applicationItemsFilter = _applicationItems.map((item) => {
    if (item.id === id) {
      return {
        id: id,
        issuer: issuer,
        label: label,
        secret: secret,
        algorithm: algorithm,
        digits: digits,
        period: period,
      };
    }

    return item;
  });

  await localForageInstance.setItem("local-application-items", _applicationItemsFilter);
}

export async function deleteItem({ id }) {
  const _applicationItems = (await localForageInstance.getItem("local-application-items")) ?? [];

  const _applicationItemsFilter = _applicationItems.filter((item) => {
    return item.id !== id;
  });

  await localForageInstance.setItem("local-application-items", _applicationItemsFilter);
}

export async function fetchQueues() {
  const _applicationQueues = (await localForageInstance.getItem("local-application-queues")) ?? [];

  return _applicationQueues;
}

export async function fetchQueue() {
  const _applicationQueues = (await localForageInstance.getItem("local-application-queues")) ?? [];

  const _applicationQueuesFilter = _applicationQueues.filter((queue) => {
    return queue.id === id;
  })[0];

  return _applicationQueuesFilter;
}

export async function createQueue({ id, type, target }) {
  const _applicationQueues = (await localForageInstance.getItem("local-application-queues")) ?? [];

  const _applicationQueuesSpread = [
    ..._applicationQueues,
    {
      id: id,
      type: type,
      target: target,
    },
  ];

  await localForageInstance.setItem("local-application-queues", _applicationQueuesSpread);
}

export async function deleteQueue({ id }) {
  const _applicationQueues = (await localForageInstance.getItem("local-application-queues")) ?? [];

  const _applicationQueuesFilter = _applicationQueues.filter((queue) => {
    return queue.id !== id;
  });

  await localForageInstance.setItem("local-application-queues", _applicationQueuesFilter);
}
