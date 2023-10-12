import {
    BrowserWindow,
    contextBridge as electronContextBridge,
    ipcMain as electronIpcMain,
    IpcMainInvokeEvent,
    ipcRenderer as electronIpcRenderer,
    IpcRendererEvent,
} from 'electron';

type Tail<T extends unknown[]> = T extends [any, ...infer Rest] ? Rest : [];

type UnknownFunction = (...args: any) => unknown;

type IpcRendererListener<Args extends UnknownFunction> = (
    event: IpcRendererEvent,
    ...args: Parameters<Args>
) => void;

export type GetApiType<T, S extends Record<string, UnknownFunction>> = {
    invoke: T;
    on: { [K in keyof S]: (listener: IpcRendererListener<S[K]>) => void };
};

type Api = GetApiType<Record<string, any>, Record<string, any>>;

type IpcMain<T extends Api> =
    {
        handle<K extends keyof T['invoke']>(
            channel: K,
            listener: (
                event: IpcMainInvokeEvent,
                ...args: Parameters<T['invoke'][K]>
            ) => ReturnType<T['invoke'][K]>,
        ): void;

        handleOnce<K extends keyof T['invoke']>(
            channel: K,
            listener: (
                event: IpcMainInvokeEvent,
                ...args: Parameters<T['invoke'][K]>
            ) => ReturnType<T['invoke'][K]>,
        ): void;

        send<K extends keyof T['on']>(
            window: BrowserWindow,
            channel: K,
            ...args: Tail<Parameters<Parameters<T['on'][K]>['0']>>
        ): void;

        removeHandler<T extends Api>(channel: keyof T['invoke']): void;
    };

type IpcRenderer<T extends Api> =
    {
        invoke<K extends keyof T['invoke']>(
            channel: K,
            ...args: Parameters<T['invoke'][K]>
        ): Promise<ReturnType<T['invoke'][K]>>;

        on<T extends Api, K extends keyof T['on']>(
            channel: K,
            listener: (...args: Parameters<Parameters<T['on'][K]>['0']>) => void,
        ): void;

        addEventListener<T extends Api, K extends keyof T['on']>(
            channel: K,
            listener: (...args: Parameters<Parameters<T['on'][K]>['0']>) => void,
        ): void;

        removeListener<T extends Api>(
            channel: keyof T['on'],
            listener: (...args: unknown[]) => void,
        ): void;

        off<T extends Api>(
            channel: keyof T['on'],
            listener: (...args: unknown[]) => void,
        ): void;
    };

export function GetIpcMain<T extends Api>(): IpcMain<T> & typeof electronIpcMain
{
    let ipcMain = {
        ...electronIpcMain,

        send<T extends Api, K extends keyof T['on']>(
            window: BrowserWindow,
            channel: K,
            ...args: Tail<Parameters<Parameters<T['on'][K]>['0']>>
        ): void
        {
            window.webContents.send(channel as string, ...args);
        },
    };
    return ipcMain as unknown as IpcMain<T> & typeof electronIpcMain;
}

export function GetIpcRenderer<T extends Api>(): IpcRenderer<T> & typeof electronIpcRenderer
{
    return electronIpcRenderer as unknown as IpcRenderer<T> & typeof electronIpcRenderer;
}

export const contextBridge =
    {
        exposeInMainWorld: <T extends GetApiType<any, any>>(apiKey: string, api: T,) =>
        {
            electronContextBridge.exposeInMainWorld(apiKey, api);
        },
    };