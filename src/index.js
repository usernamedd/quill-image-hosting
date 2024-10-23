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
// Delta = require('quill-delta');

class ImageHost {
    quillLocal;
    option_Local;
    url;
    my_modal_3;
    constructor(quill, option) {
        this.quillLocal = quill;
        this.optionLocal = option;
        this.#replaceImageHandler();
        this.#InitUrlInputDialog();
    }
    #replaceImageHandler() {
        const toolbar = this.quillLocal.getModule('toolbar');
        toolbar.addHandler('image', () => { this.ImageFormatter.call(this) });
    }
    #localModeHandler() {
        // alert('local');
        // let button_close = document.getElementById("close_mode_selection_dalog");
        // button_close.click();
        this.#showOrHideModeSelectionDialog(false);

        let fileInput = this.quillLocal.container.querySelector(
            'input.ql-image[type=file]',
        );
        if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('style', 'display:none;');
            fileInput.setAttribute(
                'accept',
                this.quillLocal.uploader.options.mimetypes.join(', '),
            );
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', () => {
                const range = this.quillLocal.getSelection(true);
                this.quillLocal.uploader.upload(range, fileInput.files);

                fileInput.value = '';
                this.#uploadLocalFiles(fileInput.files[0]);

            });
            this.quillLocal.container.appendChild(fileInput);
        }
        fileInput.click();
    }
    async #uploadLocalFiles(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://postimage.org/upload', {
                method: 'GET',
                // body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            document.getElementById('result').innerHTML = `<a href="${data.url}">Image uploaded! Click here to view.</a>`;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    #ImageHostModeHandler() {
        this.#showOrHideModeSelectionDialog(false);
        this.#ShowOrHideUrlInputDialog(true);
    }
    #submitUrl() {
        ////检查URL合法性
        //关闭URLInputDialog
        this.#ShowOrHideUrlInputDialog(false);
        //创建image对象并插入到文档中
        let range = this.quillLocal.getSelection(true);
        let value = this.url;//prompt('What is the image URL');
        // let update = this.quillLocal.getContents().retain(range.index).delete(range.length).insert({value});
        // this.quillLocal.updateContents(update, Quill.sources.USER);
        this.quillLocal.insertEmbed(range.index, 'image', value, Quill.sources.USER);
        this.quillLocal.setSelection(
            range.index + 1,
            Quill.sources.USER,
        );
        // this.quillLocal.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
    #createModeDialog() {
        const modeDialog = [
            '<div class="modal fade" id="my_modal_3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>',
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
            '</div>',
            '<div class="modal-body">',
            '<button class="btn btn-outline btn-info btn-wide" id="local_mode">本地图片</button>',
            '<button class="btn btn-outline btn-success btn-wide" id="image_host">远程图片</button>',
            '</div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>',
            '<button type="button" class="btn btn-primary">Save changes</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
        // alert('ddd')
        let modeSelectionDialog = document.getElementById("my_modal_3");
        if (!modeSelectionDialog) {
            const dialogContainer = document.createElement('div')
            this.quillLocal.container.appendChild(dialogContainer)
            dialogContainer.innerHTML = modeDialog;
            //binding local button click to handler
            const button = document.getElementById('local_mode');
            button.removeEventListener('click', this.handleClick);
            button.addEventListener('click', this.#localModeHandler.bind(this));
            //binding image host button click ot handler
            const hostButton = document.getElementById('image_host');
            hostButton.addEventListener('click', this.#ImageHostModeHandler.bind(this));
            my_modal_3=new bootstrap.Modal(document.getElementById('my_modal_3'));//cache it
            this.#showOrHideModeSelectionDialog(true);
        } else {
            this.#showOrHideModeSelectionDialog(true);
        }
    }
    ImageFormatter() {
        this.#createModeDialog();
    }
    #urlInputChangedHandler(event) {
        this.url = event.target.value; // Update variable on input change
    }
    /**
     * 初始化输入url对话框
     */
    #InitUrlInputDialog() {
        const urlDialog = 
        `
            <div class="modal fade" id="modal_url_input" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <span class="block text-lg font-semibold text-gray-800 mb-4">input url</span>

                        <label for="name" class="block text-sm font-medium text-gray-700">URL</label>
                        <input type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" id="url_input"
                        placeholder="Enter the image url">

                        <button class="btn ml-1 btn-primary mt-4" id="submit_url">确认</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        `;
        const dialogContainer = document.createElement('div');
        this.quillLocal.container.appendChild(dialogContainer);
        dialogContainer.innerHTML = urlDialog;
        document.getElementById("submit_url").addEventListener("click", this.#submitUrl.bind(this));
        //binding url_input
        const self = this;
        document.getElementById('url_input').addEventListener("input", (e) => { self.#urlInputChangedHandler(e); });
    }
    #showOrHideModeSelectionDialog(show) {
        if (show === true) {
            my_modal_3.show();
        } else {
            my_modal_3.hide();
        }
    }
    #ShowOrHideUrlInputDialog(control) {
        if (control === true) {
            modal_url_input.classList.remove('hidden');
        } else {
            modal_url_input.classList.add('hidden');
        }
    }
    #IsUrlInputDialogShown() {
        const dialog = document.getElementById('modal_url_input');
        return !dialog.classList.contains('hidden');
    }
}
//todo 创建class类型的模块，模块修改image handler,新的handler为模块中的方法充当



module.exports = ImageHost;