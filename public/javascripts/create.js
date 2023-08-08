//이미지 미리보기
$(document).ready(function () {
    let imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
            let filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    $($.parseHTML("<img>"))
                        .attr("src", event.target.result)
                        .appendTo(placeToInsertImagePreview);
                };
                reader.readAsDataURL(input.files[i]);
            }
        }
    };
    $("#input-multi-files").on("change", function () {
        imagesPreview(this, "div.preview-images");
    });
});


const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
// const storeNameInput = document.querySelector('#store_name');
// const nickInput = document.querySelector('#nick');
const contentInput = document.querySelector('#content');
const fileInput = document.querySelector('#input-multi-files');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', titleInput.value);
    // formData.append('store_name', storeNameInput.value);
    // formData.append('nick', nickInput.value);
    formData.append('content', contentInput.value);
    for (const file of fileInput.files) {
        formData.append('files', file);
    }

    await axios.post('/board/multiple-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((req, res, next) => {
        location.href='/board';
    }).catch((error) => {
        console.error(error);
    });

});