/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                "blue": {
                    450: "#367CBD"
                },
                "gray": {
                    primary: "#656565",
                    darker: "#454545",
                    light: "#d4d4d4"
                }
            }
        },
    },
    plugins: [],
}