import { imgDB } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

const uploadImage = (e) => {
    return new Promise((resolve, reject) => {
        // Check if any file is selected or not
        if (e.target.files[0]) {
            const file = e.target.files[0];  // Get the file from the event
            const storageRef = ref(imgDB, `images/${file.name}`);  // Create a reference to 'images/filename' in Firebase Storage

            // Upload the file to the designated reference
            uploadBytes(storageRef, file)
                .then((snapshot) => {
                    // Get the download URL after successful upload
                    getDownloadURL(snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);  // Resolve the promise with the URL
                        })
                        .catch((error) => reject(error));  // Handle any errors in fetching the URL
                })
                .catch((error) => reject(error));  // Handle any errors in uploading the file
        } else {
            // Reject the promise if no file is selected
            reject("No file selected");
        }
    });
};

const deleteImage = (url) => {
    return new Promise((resolve, reject) => {
        // Create a reference to the file to be deleted
        const fileRef = ref(imgDB, url);

        // Delete the file
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
