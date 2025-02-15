const countryCodes = {
    AUD: "AU",
    BGN: "BG",
    BRL: "BR",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    CZK: "CZ",
    DKK: "DK",
    GBP: "GB",
    HKD: "HK",
    HRK: "HR",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    ISK: "IS",
    JPY: "JP",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NOK: "NO",
    NZD: "NZ",
    PHP: "PH",
    PLN: "PL",
    RON: "RO",
    RUB: "RU",
    SEK: "SE",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    USD: "US",
    ZAR: "ZA"
};
const input = document.querySelector("#text");
const output = document.querySelector("#ans");
const IMGURL = "https://flagsapi.com";
const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_WkTjy1o3TXOqpmAJTJgt3lnrr9edpN6pTVhJlLTQ";
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const img1 = document.querySelector("#from-img");
const img2 = document.querySelector("#to-img");
const select1 = document.querySelector("select[name='from-select']");
const select2 = document.querySelector("select[name='to-select']");
let countryvals = [];

(async function initialize() {
    let a = await fetch(URL);
    let b = await a.json();
    countryvals = b.data;
    output.value=countryvals["INR"].toFixed(3);
    for (let it in countryCodes) {
        const opt = document.createElement("option");
        opt.value = it;
        opt.innerText = it;
        if (it === "USD") opt.selected = true;

        select1.appendChild(opt);

        const opt2 = document.createElement("option");
        opt2.value = it;
        opt2.innerText = it;
        if (it === "INR") opt2.selected = true;
        select2.appendChild(opt2);
    }
    select1.addEventListener("change", (evt) => {
        let cnt = countryCodes[evt.target.value];
        img1.src = `${IMGURL}/${cnt}/flat/64.png`;
        fromText.innerText = evt.target.value;
        changeOutputVal();
        input.value = 1;
    });

    select2.addEventListener("change", (evt) => {
        let cnt = countryCodes[evt.target.value];
        img2.src = `${IMGURL}/${cnt}/flat/64.png`;
        toText.innerText = evt.target.value;
        changeOutputVal();
        input.value = 1;
    });

    function changeOutputVal() {
        const val1 = select1.value;
        const val2 = select2.value;
        if (input.value < 0) input.value = 1;
        let temp = ((countryvals[val2]) * input.value) / (countryvals[val1]);
        output.value = temp.toFixed(3);
    }

    document.querySelector("button").addEventListener("click", (evt) => {
        evt.preventDefault();
        changeOutputVal();
    });
})();
