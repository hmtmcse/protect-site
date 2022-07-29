import hotkeys from "hotkeys-js";

export default class ProtectSite {

    disableCtrlWithKey(keyCode: any, form: any) {
        form.addEventListener("keydown", (event: any) => {
            if (event.ctrlKey && event.which === keyCode) {
                event.preventDefault();
                return false
            }
            if (event.metaKey && event.which === keyCode) {
                event.preventDefault();
                return false
            }
        })
    }

    disableSetOfKeys() {
        let keymap = {
            "save": 83, "selectAll": 65, "copy": 67, "cut": 88, "paste": 86, "viewSource": 85, "print": 80
        }
        for (let code of Object.values(keymap)) {
            this.disableCtrlWithKey(code, window)
            this.disableCtrlWithKey(code, document)
        }
    }

    disableHotkeys() {
        let keys = ""
        keys += "f12, f11,"
        keys += "ctrl+shift+i, ctrl+shift+j, shift+f5, shift+f6, shift+f9, shift+f12,"
        keys += "command+option+j, command+option+i, command+shift+c, command+option+c, command+option+k, command+option+z, command+option+e,"
        keys += "ctrl, ctrl+s, ctrl+a, ctrl+c, ctrl+x, ctrl+v, ctrl+u, ctrl+p"
        hotkeys(keys, (event, handler) => {
            event.preventDefault()
            return false
        })
    }

    disableContextMenu() {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            return false
        });
    }

    disableSelection() {
        const disableSelect = (event: any) => {
            event.preventDefault()
            return false
        }
        document.onselectstart = disableSelect
        document.onmousedown = disableSelect
        let css = document.createElement('style');
        document.head.appendChild(css);
        let cssStyle = "* {"
        cssStyle += "-moz-user-select: none !important;"
        cssStyle += "-ms-user-select: none !important;"
        cssStyle += "user-select: none !important;"
        cssStyle += "}"
        css.innerText = cssStyle;
    }


    init() {
        this.disableHotkeys()
        this.disableSetOfKeys()
        this.disableContextMenu()
        this.disableSelection()
    }
}


new ProtectSite().init()