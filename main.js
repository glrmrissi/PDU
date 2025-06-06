function putBtn() {
    if (document.getElementById("copiar-video-btn")) return;

    const btn = document.createElement("a");
    const img = document.createElement("img");

    btn.id = "copiar-video-btn";
    btn.style.position = "fixed";
    btn.style.backgroundColor = "#fff"
    btn.style.top = "90px";
    btn.style.right = "30px";
    btn.style.borderRadius = "50px";
    btn.style.zIndex = "9999";
    btn.style.cursor = "pointer";

    img.src = browser.runtime.getURL("icons/arrow.svg");
    img.title = "Copiar link do vídeo";
    img.style.padding = "10px";
    img.style.width = "30px";
    img.style.height = "30px";
    img.style.fill = "#fff"

    btn.appendChild(img);
    document.body.appendChild(btn);
    btn.addEventListener("click", () => {
        try {
            const video = document.querySelector("video");
            const source = video?.querySelector("source");
            const url = source?.src || video?.src;
            if (url) {
                btn.href = url;
                btn.target = "_blank";
                btn.download = "tiktokembed.mp4";
            } else {
                alert("⚠️ Vídeo não encontrado.");
            }
        } catch (error) {
            alert("❌ Erro: " + error.message);
        }
    });
}

const observer = new MutationObserver(() => {
    const video = document.querySelector("video");
    const source = video?.querySelector("source");
    if (video || source) {
        putBtn();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
