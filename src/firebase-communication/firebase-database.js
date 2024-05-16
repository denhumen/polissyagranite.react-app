import { rtDatabase } from "../firebase-config";
import { ref, get, update, push, set, onValue, child } from "firebase/database";
import { deleteImage } from "./firebase-storage";
import { toast } from "react-custom-alert";

const alertSuccess = (text) => toast.success(text);
const alertError = (text) => toast.error(text);

const add_new_slider = async (parentId, imgUrl, titles, descriptions) => {
    try {
        const slidersRef = ref(rtDatabase, 'sliders/');
        const slidersSnapshot = await get(slidersRef);

        if (!slidersSnapshot.exists()) {
            parentId = 1;
            const firstGroupRef = ref(rtDatabase, `sliders/${parentId}`);
            await set(firstGroupRef, {});
        } else if (!parentId) {
            const slidersData = slidersSnapshot.val();
            const parentIds = Object.keys(slidersData).map(key => parseInt(key));
            parentId = parentIds.length > 0 ? Math.max(...parentIds) + 1 : 1;
        }

        const dbRefRead = ref(rtDatabase, `sliders/${parentId}/sliders`);
        const snapshot = await get(dbRefRead);

        let newId = 1;
        if (snapshot.exists()){
            const sliders = snapshot.val();
            const ids = Object.keys(sliders).map(key => sliders[key].id);
            newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        }

        const dbRefWrite = ref(rtDatabase, `sliders/${parentId}/sliders/${newId}`)

        set(dbRefWrite, 
            {
                id: newId,
                img_url: imgUrl,
                title: titles,
                description: descriptions
            }
        ).then( () => {
            alertSuccess("New slider added successfully.");
        }).catch( (error) => {
            alertError("Failed to add new slider.")
        });
      
        console.log("New slider added successfully with ID:", newId);
    } catch (error) {
        console.error("Failed to add new slider:", error);
    }
};

const get_sliders = async () => {
    const dbRefRead = ref(rtDatabase, 'sliders/');
    const snapshot = await get(dbRefRead);

    if (snapshot.exists()) {
        const slidersData = snapshot.val();

        const list = Object.keys(slidersData).map(key => ({
            id: key,
            ...slidersData[key]
        }));
        return list;
    } else {
        console.log('No sliders found');
        return [];
    }
};

const delete_slider = async (parentId, sliderId, imgUrl) => {
    try {
        await deleteImage(imgUrl);

        const dbRef = ref(rtDatabase, `sliders/${parentId}/sliders/${sliderId}`);
        await set(dbRef, null).then( () => {
            alert("Success!");
        }).catch( (error) => {
            alert("Error!")
        });
        console.log(`Slider with ID: ${sliderId} has been deleted successfully.`);
    } catch (error) {
        console.error(`Failed to delete slider with ID: ${sliderId}`, error);
    }
};

const add_stone_gallery_element = async (imgUrl, title) => {
    try {
        const dbRefRead = ref(rtDatabase, 'stone-galery/');
        const snapshot = await get(dbRefRead);

        let newId = 1;
        if (snapshot.exists()) {
            const stoneGalleryData = snapshot.val();
            const ids = Object.keys(stoneGalleryData).map(key => stoneGalleryData[key].id);
            newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        }

        const dbRefWrite = ref(rtDatabase, `stone-galery/${newId}`)

        set(dbRefWrite, 
            {
                id: newId,
                img_url: imgUrl,
                title: title,
            }
        ).then( () => {
            alertSuccess("New stone added successfully with");
        }).catch( (error) => {
            alertError("Failed to add new stone to gallery")
        });
        
        console.log("New stone added successfully with ID:", newId);
    }
    catch (error) {
        console.error("Failed to add new stone to gallery:", error);
    }
};

const delete_stone_gallery_element = async (stoneId, imgUrl) => {
    try {
        await deleteImage(imgUrl);

        const dbRef = ref(rtDatabase, `stone-galery/${stoneId}`);
        await set(dbRef, null).then( () => {
            alert("Success!");
        }).catch( (error) => {
            alert("Error!")
        });
        console.log(`Slider with ID: ${stoneId} has been deleted successfully.`);
    } catch (error) {
        console.error(`Failed to delete slider with ID: ${stoneId}`, error);
    }
};

const get_stone_gallery = async () => {
    const dbRefRead = ref(rtDatabase, 'stone-galery/');
    const snapshot = await get(dbRefRead);

    if (snapshot.exists()) {
        const stoneGalleryData = snapshot.val();

        const list = Object.keys(stoneGalleryData).map(key => ({
            id: key,
            ...stoneGalleryData[key]
        }));
        return list;
    } else {
        return [];
    }
};

const add_image_to_gallery = async (parentSliderId, sliderId, imgUrl) => {
    try {
        const dbRefRead = ref(rtDatabase, `gallery-pages/${parentSliderId}/images/${sliderId}`);
        const snapshot = await get(dbRefRead);

        let newId = 1;
        if (snapshot.exists()) {
            const galleryData = snapshot.val();
            const ids = Object.keys(galleryData).map(key => galleryData[key].id);
            newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        }

        const dbRefWrite = ref(rtDatabase, `gallery-pages/${parentSliderId}/images/${sliderId}/${newId}`);

        await set(dbRefWrite, {
            id: newId,
            img_url: imgUrl,
        });

        alertSuccess("New image added to gallery successfully.");
        console.log("New image added to gallery successfully with ID:", newId);
    } catch (error) {
        alertError("Failed to add new image to gallery.");
        console.error("Failed to add new image to gallery:", error);
    }
};

const delete_image_from_gallery = async (parentSliderId, sliderId, imageId, imgUrl) => {
    try {
        await deleteImage(imgUrl);

        const dbRef = ref(rtDatabase, `gallery-pages/${parentSliderId}/images/${sliderId}/${imageId}`);
        await set(dbRef, null);

        alertSuccess("Image deleted from gallery successfully.");
        console.log(`Image with ID: ${imageId} has been deleted successfully from gallery.`);
    } catch (error) {
        alertError("Failed to delete image from gallery.");
        console.error(`Failed to delete image with ID: ${imageId} from gallery`, error);
    }
};

const get_gallery = async (parentSliderId, sliderId) => {
    try {
        const dbRefRead = ref(rtDatabase, `gallery-pages/${parentSliderId}/images/${sliderId}`);
        const snapshot = await get(dbRefRead);

        if (snapshot.exists()) {
            const galleryData = snapshot.val();
            const list = Object.keys(galleryData).map(key => ({
                id: key,
                ...galleryData[key]
            }));
            return list;
        } else {
            console.log('No images found in the gallery.');
            return [];
        }
    } catch (error) {
        console.error("Failed to get gallery information:", error);
        return [];
    }
};

export { add_new_slider, get_sliders, delete_slider, add_stone_gallery_element, delete_stone_gallery_element, get_stone_gallery, add_image_to_gallery, delete_image_from_gallery, get_gallery };
