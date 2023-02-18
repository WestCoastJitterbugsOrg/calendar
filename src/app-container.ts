const appContainer = document.createElement('div');
appContainer.id = 'cwfc-container';

const appDiv = document.createElement('div');
appDiv.innerHTML = `
<style>
    .loader-container {
        display: flex;
        height: 100dvh;
        width: 100%;
        background: #fff;
    }

    .loader{
        width: 100%;
        height: 100%;
        background: linear-gradient(0.25turn, transparent, #FFF, transparent), linear-gradient(#DDD, #DDD);
        background-repeat: no-repeat;
        background-position: -100vw 0, 0 0, 15px 140px, 65px 145px;
        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        to {
            background-position: 100vw 0, 0 0, 15px 140px, 65px 145px;
        }
    }
</style>

<div class="loader-container">
    <div class="loader"></div>
</div>
`;
appContainer.appendChild(appDiv);

export { appContainer, appDiv as appTag };
