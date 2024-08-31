// const { default: Quill } = require("quill");
// const path = require('path');
// alert('ddd')
// class ImageProcessor {
//     constructor(quill, option) {
//         // super(quill, option);
//         this.quill = quill;

//         const toolbar = quill.getModule('toolbar');
//         toolbar.addHandler('image', this.ImageFormat);
//     }
//     ImageFormat() {
//         let dialogContainer = document.createElement('div');
//         dialogContainer.innerHTML = "225641";
//         this.quill.container.appendChild(dialogContainer)
//     }
// }
// todo 定义tooltip,弹出对话框
// let quill;
// let option;
// function ImageProcessor(quill,option) {

// }

class ImageHost {
    quillLocal;
    option_Local;
    constructor(quill, option) {
        this.quillLocal = quill;
        this.optionLocal = option;
        this.#replaceImageHandler();
    }
    #replaceImageHandler(){
        const toolbar = this.quillLocal.getModule('toolbar');
        toolbar.addHandler('image', ()=>{this.ImageFormatter.call(this)});
    }
    ImageFormatter() {
        const modeDialog = [
            '<dialog id="my_modal_3" class="modal" open>',
                '<div class="modal-box">',
                    '<form method="dialog">',
                        '<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>',
                    '</form>',
                    '<h3 class="text-lg font-bold">Hello!</h3>',
                    '<p class="py-4">Press ESC key or click on ✕ button to close</p>',
                    '<button class="btn btn-outline btn-info btn-wide">Info</button>',
                    '<button class="btn btn-outline btn-success btn-wide">Success</button>',
                '</div>',
            '</dialog >',
        ].join('');
        // alert('ddd')
        const dialogContainer = document.createElement('div')
        this.quillLocal.container.appendChild(dialogContainer)
        dialogContainer.innerHTML = modeDialog;
    }
}
//todo 创建class类型的模块，模块修改image handler,新的handler为模块中的方法充当



module.exports = ImageHost;