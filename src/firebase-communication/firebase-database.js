import { rtDatabase } from "../firebase-config";
import { ref, get, set } from "firebase/database";
import { deleteImage } from "./firebase-storage";
import { toast } from 'react-toastify';

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
        if (snapshot.exists()) {
            const sliders = snapshot.val();
            const ids = Object.keys(sliders).map(key => sliders[key].id);
            newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        }

        const dbRefWrite = ref(rtDatabase, `sliders/${parentId}/sliders/${newId}`);

        await set(dbRefWrite, {
            id: newId,
            img_url: imgUrl,
            title: titles,
            description: descriptions
        });

        toast.success("New slider added successfully.");
        console.log("New slider added successfully with ID:", newId);
    } catch (error) {
        toast.error("Failed to add new slider.");
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

const get_title_by_slider = async (parentId, sliderId) => {
    try {
        const dbRefRead = ref(rtDatabase, `sliders/${parentId}/sliders/${sliderId}`);
        const snapshot = await get(dbRefRead);

        if (snapshot.exists()) {
            const sliderData = snapshot.val();
            const { title } = sliderData;
            return title;
        } else {
            console.log('No slider found for the given IDs.');
            return null;
        }
    } catch (error) {
        console.error('Failed to get title by slider:', error);
        return null;
    }
};

const delete_slider = async (parentId, sliderId, imgUrl) => {
    try {
        try {
            await deleteImage(imgUrl);
        } catch (error) {
            console.error(`Failed to delete image: ${imgUrl}; `, error);
        }

        const dbRef = ref(rtDatabase, `sliders/${parentId}/sliders/${sliderId}`);
        await set(dbRef, null);

        toast.success("Slider deleted successfully.");
        console.log(`Slider with ID: ${sliderId} has been deleted successfully.`);
    } catch (error) {
        toast.error("Failed to delete slider.");
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

        const dbRefWrite = ref(rtDatabase, `stone-galery/${newId}`);

        await set(dbRefWrite, {
            id: newId,
            img_url: imgUrl,
            title: title,
        });

        toast.success("New stone added successfully.");
        console.log("New stone added successfully with ID:", newId);
    } catch (error) {
        toast.error("Failed to add new stone to gallery.");
        console.error("Failed to add new stone to gallery:", error);
    }
};

const delete_stone_gallery_element = async (stoneId, imgUrl) => {
    try {
        try {
            await deleteImage(imgUrl);
        } catch (error) {
            console.error("Failed to delete image:", error);
        }

        const dbRef = ref(rtDatabase, `stone-galery/${stoneId}`);
        await set(dbRef, null);

        toast.success("Stone gallery element deleted successfully.");
        console.log(`Stone gallery element with ID: ${stoneId} has been deleted successfully.`);
    } catch (error) {
        toast.error("Failed to delete stone gallery element.");
        console.error(`Failed to delete stone gallery element with ID: ${stoneId}`, error);
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

        toast.success("New image added to gallery successfully.");
        console.log("New image added to gallery successfully with ID:", newId);
    } catch (error) {
        toast.error("Failed to add new image to gallery.");
        console.error("Failed to add new image to gallery:", error);
    }
};

const delete_image_from_gallery = async (parentSliderId, sliderId, imageId, imgUrl) => {
    try {
        try {
            await deleteImage(imgUrl);
        } catch (error) {
            console.error("Failed to delete image:", error);
        }

        const dbRef = ref(rtDatabase, `gallery-pages/${parentSliderId}/images/${sliderId}/${imageId}`);
        await set(dbRef, null);

        toast.success("Image deleted from gallery successfully.");
        console.log(`Image with ID: ${imageId} has been deleted successfully from gallery.`);
    } catch (error) {
        toast.error("Failed to delete image from gallery.");
        console.error(`Failed to delete image with ID: ${imageId} from gallery`, error);
    }
};

const delete_gallery = async (parentSliderId, sliderId) => {
    try {
        const dbRef = ref(rtDatabase, `gallery-pages/${parentSliderId}/images/${sliderId}`);
        await set(dbRef, null);

        toast.success("Gallery deleted successfully.");
    } catch (error) {
        toast.error("Failed to delete gallery.");
        console.error("Failed to delete gallery:", error);
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
        toast.error("Failed to get gallery information.");
        console.error("Failed to get gallery information:", error);
        return [];
    }
};

export { add_new_slider, get_sliders, delete_slider, add_stone_gallery_element, delete_stone_gallery_element, get_stone_gallery, add_image_to_gallery, delete_image_from_gallery, delete_gallery, get_gallery, get_title_by_slider };
