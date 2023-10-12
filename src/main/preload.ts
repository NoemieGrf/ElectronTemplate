import {
    contextBridge,
    GetIpcRenderer,
    GetApiType,
} from '../ipc/ipc';

const ipcRenderer = GetIpcRenderer<Api>();

export type Api = GetApiType<
    {
        ipcRenderToMain: (test: string) => Promise<string>;
    },
    {
        ipcMainToRender: (test: string) => Promise<void>;
    }>;

const api: Api = {
    invoke: {
        ipcRenderToMain: async (test: string) =>
        {
            return await ipcRenderer.invoke('ipcRenderToMain', test);
        },
    },
    on: {
        ipcMainToRender: (listener) =>
        {
            ipcRenderer.on('ipcMainToRender', listener);
        }
    },
};

contextBridge.exposeInMainWorld('IpcApi', api);

declare global
{
    interface Window
    {
        IpcApi: Api;
    }
}