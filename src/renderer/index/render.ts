
import './style.css' // 引入一下让webpack识别到来打包

function OnIpcMessage(message: string): void
{
    console.log(message);

    // create button
    let appDiv: HTMLElement | null = document.getElementById('app');
    if (appDiv === null)
        return;

    let htmlButtonElement = document.createElement('button');
    htmlButtonElement.innerText = 'Send Msg To Main';
    appDiv.appendChild(htmlButtonElement);

    htmlButtonElement.addEventListener('click', ()=>
    {
        window.IpcApi.invoke.ipcRenderToMain('This is message from renderer process to main process');
    });
}

window.IpcApi.on.ipcMainToRender((_, message) => {
    OnIpcMessage(message);
});