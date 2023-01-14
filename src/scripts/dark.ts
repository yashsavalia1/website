const setTheme = () => {
    if (getTheme() === "dark") {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        
    }
}

const getTheme = () => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return userTheme || systemTheme;
}

const themeSwitcherInit = () => {
    document.querySelector("#theme-switcher")!.addEventListener("click", () => {

        if (getTheme() === "dark") {
            localStorage.setItem("theme", "light");
            setTheme();
        } else {
            localStorage.setItem("theme", "dark");
            setTheme();
        }
    });
}

export { setTheme, getTheme, themeSwitcherInit };
