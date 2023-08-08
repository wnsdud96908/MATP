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

const boardNo = window.location.pathname.split('/').pop();

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('board_title', titleInput.value);
    // formData.append('store_name', storeNameInput.value);
    // formData.append('nick', nickInput.value);
    formData.append('board_content', contentInput.value);
    for (const file of fileInput.files) {
        formData.append('files', file);
    }

    await axios.post(`/board/update/${boardNo}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((req, res, next) => {
        console.log("5555555555", req.data.url);
        location.href=`/board/detail/${boardNo}`;
    }).catch((error) => {
        console.error(error);
    });

});