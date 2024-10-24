# quill-image-hosting
insert image from an image hosting or local file
# concept
## mode selection modal
模式选择对话框，用于和用户交互，让用户选择本地模式与图床模式。

# manual
> 命令“npm run build”会执行完整的构建。

> 命令“npm run build:css”会生成css文件
# todo
> 试验：得到模式选择对话框模板。包括css,html元素。html元素已经存在，需要得到CSS
>   使用一个html文件，放置css class,用于让tailwind生成目标css,使用另一个css--input.css作为tailwind的输入css
> 试验：超链接输入对话框模板

# deploy
部署示例
```javascript
//对bootstrap的引用要放到引用main.bundle.js之前，因为在main.bundle.js构造中会使用bootstrap
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
<script src="./main.bundle.js"></script> //import module
<script>
    Quill.register('modules/ImageHost', ImageHost);//register module
    var editor = new Quill('#editor', {
        modules: {
            toolbar: {
                container: '#toolbar', // Selector for toolbar container
            },
            ImageHost:{}//use module withoud options for the module
        },
        theme: 'snow',
    });
</script>
```
## 产品模式构建
> webpack配置修改mode: "production"；删除掉devtool: 'inline-source-map',