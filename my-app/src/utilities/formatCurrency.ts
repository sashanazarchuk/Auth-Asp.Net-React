const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "UAH",         // Sets the currency to  UAH
    style: "currency",       // Specifies the formatting style as currency
    currencyDisplay: "code", // Displays the currency code (e.g., UAH) alongside the value
});

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number); // Formats the given number as UAH currency
}