interface animations {
    toggler: {
        open: string,
        close: string;
    },
    target: {
        open: string,
        close: string;
    };

}

const toggle = (toggler: string, target: string, closest: string = null, className: string = "open", animationsObj: animations = null): void => {
    const togglers = document.querySelectorAll(toggler);

    if (togglers.length === 0) return;

    const targets = document.querySelectorAll(target);

    if (targets.length === 0) return;

    togglers.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.toggle(className);
            if (closest) element.closest(closest)?.classList.toggle(className)

            if (animationsObj) {
                if (element.classList.contains(className)) (element as HTMLElement).style.animation = animationsObj.toggler.open;
                else (element as HTMLElement).style.animation = animationsObj.toggler.open;
            }
            targets.forEach(el => {
                el.classList.toggle(className);
                if (animationsObj) {
                    if (el.classList.contains(className)) (el as HTMLElement).style.animation = animationsObj.target.open;
                    else (el as HTMLElement).style.animation = animationsObj.target.open;
                }
            });
        });
    });
};

export default toggle;