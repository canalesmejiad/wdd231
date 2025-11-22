document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const map = {
        first: "out-first",
        last: "out-last",
        email: "out-email",
        phone: "out-phone",
        organization: "out-organization",
        timestamp: "out-timestamp"
    };

    Object.keys(map).forEach(key => {
        const el = document.getElementById(map[key]);
        if (el) {
            const value = params.get(key) || "Not provided";
            el.textContent = value;
        }
    });
});