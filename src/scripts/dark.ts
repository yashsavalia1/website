import Cookies from "js-cookie";
const setTheme = () => {
    if (getTheme() === "dark") {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

const getTheme = () => {
    const userTheme = Cookies.get("theme");
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return userTheme || systemTheme;
}

document.querySelector("#theme-switcher")!.addEventListener("click", () => {

    if (getTheme() === "dark") {
        Cookies.set("theme", "light");
        setTheme();
    } else {
        Cookies.set("theme", "dark");
        setTheme();
    }
});

export { setTheme, getTheme };
