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
const rgnInput = document.querySelector('#rgn_no');
const nameInput = document.querySelector('#store_nm');
const addrInput = document.querySelector('#store_addr');
const detailInput = document.querySelector('#store_detail_addr');
const telInput = document.querySelector('#store_tel');
const contentInput = document.querySelector('#store_content');
const wkdInput = document.querySelector('#store_wkd_time');
const wkndInput = document.querySelector('#store_wknd_time');
const breakInput = document.querySelector('#store_break_time');
const fileInput = document.querySelector('#input-multi-files');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('rgn_no', rgnInput.value);
    formData.append('store_nm', nameInput.value);
    formData.append('store_addr', addrInput.value);
    formData.append('store_detail_addr', detailInput.value);
    formData.append('store_tel', telInput.value);
    formData.append('store_content', contentInput.value);
    formData.append('store_wkd_time', wkdInput.value);
    formData.append('store_wknd_time', wkndInput.value);
    formData.append('store_break_time', breakInput.value);
    for (const file of fileInput.files) {
        formData.append('files', file);
    }


    await axios.post('/search/multiple-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((req, res, next) => {
        console.log("5555555555", req.data.url);
        location.href='/list';
    }).catch((error) => {
        console.error(error);
    });

});