document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("uname").value;
        const password = document.getElementById("password").value;
        const STORED_HASH = "ac42f35c558201cf39c94acc90b1a65c0262e17979f90f0105621c3a2033fba0";
        const hash = await sha256(password)
        ///Default Username for maintenance workers: GodOfLoveVal
        if (username === "GodOfLoveVal" && hash === STORED_HASH) {
            const flag = await sha256(password + "::FLAG_SALT::");
            alert(`flag{${flag.slice(0, 32)}}`);
        } else {
            alert("Access denied.");
        }
    });
});

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}