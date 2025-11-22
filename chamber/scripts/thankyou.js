// scripts/thankyou.js

(function () {
    const params = new URLSearchParams(window.location.search);

    const first = params.get("first") || "";
    const last = params.get("last") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const org = params.get("organization") || "";
    const timestamp = params.get("timestamp") || "";

    const outFirst = document.getElementById("out-first");
    const outLast = document.getElementById("out-last");
    const outEmail = document.getElementById("out-email");
    const outPhone = document.getElementById("out-phone");
    const outOrg = document.getElementById("out-org");
    const outTimestamp = document.getElementById("out-timestamp");

    if (outFirst) outFirst.textContent = first || "Not provided";
    if (outLast) outLast.textContent = last || "Not provided";
    if (outEmail) outEmail.textContent = email || "Not provided";
    if (outPhone) outPhone.textContent = phone || "Not provided";
    if (outOrg) outOrg.textContent = org || "Not provided";

    if (outTimestamp) {
        if (timestamp) {
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                outTimestamp.textContent = date.toLocaleString();
            } else {
                outTimestamp.textContent = timestamp;
            }
        } else {
            outTimestamp.textContent = "Not provided";
        }
    }
})();