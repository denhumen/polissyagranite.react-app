import { imgDB } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const uploadImage = (e) => {
    return new Promise((resolve, reject) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const uniqueFileName = `${Date.now()}_${file.name}`;
            const storageRef = ref(imgDB, `images/${uniqueFileName}`);

            uploadBytes(storageRef, file)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
        } else {
            reject("No file selected");
        }
    });
};

const deleteImage = (url) => {
    return new Promise((resolve, reject) => {
        const fileRef = ref(imgDB, url);

        deleteObject(fileRef)
            .then(() => {
                console.log("File deleted successfully");
                resolve();
            })
            .catch((error) => {
                console.error("Error while deleting the file:", error);
                reject(error);
            });
    });
};

export { uploadImage, deleteImage };
