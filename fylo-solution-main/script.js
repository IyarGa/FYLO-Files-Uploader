var files=[];
let maxSize=100;

<!-- This function displays a list of the uploaded images and can delete them from the list-->
function handleUserImages(event) {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const allowedExt = ['.jpg', '.jpeg', '.gif', '.png'];

        if (!allowedExt.some(ext => file.name.toLowerCase().endsWith(ext))) {
            alert("Error: File format is not supported.");
            console.error('Error: File format is not supported.');
        }
        if (checkImageSize(file)) {
            files.push(file);
            if(calcFileSize(file)<0){
                alert("Error: Files size is too large. Max size is 100MB.");
                console.error('Error: Files size is too large. Max size is 100MB.');
                files.pop();
                return 0;
            }
            displayFile(file);
        }
    }
}

    <!-- This function opens the file explorer -->
    function selectImage() {
        console.log('Select image');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '';
        fileInput.addEventListener('change', handleUserImages);
        fileInput.click();
    }

<!-- This function checks the size of the image that the user uploads-->
    function checkImageSize(file) {
        const imageSizeMB = ((file.size) / (1024 ** 2));
        console.log('File size is ', imageSizeMB, 'MB');
        if (imageSizeMB > maxSize) {
            alert("Error: This file size exceeded 100MG.");
            console.log("Error: This file size exceeded 100MG.");
            return false;
        } else
            return true;
    }

<!-- This function calculates the amount of MB that is left after the user uploads an image-->
    function calcFileSize(file) {
        if (checkImageSize(file)) {
            var totalUsedSpaceMb = Math.ceil(files.reduce((acc, curr) => acc + curr.size / (1024 ** 2), 0));
            const MbLeft = maxSize - totalUsedSpaceMb;
            console.log('MbLeft:', MbLeft);
            const StorageUsed = document.getElementById('StorageUsed');
            const StorageUsed1 = document.getElementById('StorageUsed1');
            StorageUsed.innerHTML = maxSize - MbLeft;
            StorageUsed1.innerHTML = maxSize - MbLeft;
            document.querySelector('.gradient-bar').style.width = StorageUsed.innerHTML + '%';
            const StorageLeft = document.getElementById('StorageLeft');
            StorageLeft.innerHTML = MbLeft;
            return MbLeft;
        }
        else {
            return 0;
        }
    }
<!-- This function displays a list of the uploaded images-->
function displayFile(file) {
    const fileList = document.getElementById('fileList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${file.name} <button class="deleteButton" onclick="deleteFile('${file.name}')"> x </button>`;
    fileList.appendChild(listItem);
}

<!-- This function can delete an uploaded image from the list-->
function deleteFile(fileName) {
    files = files.filter(file => file.name !== fileName);
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    files.forEach(file => displayFile(file));
}



