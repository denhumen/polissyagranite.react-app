import { rtDatabase } from "../firebase-config";
import { ref, get, update, push, set, onValue, child } from "firebase/database";
import { deleteImage } from "./firebase-storage";

const add_new_slider = async (parentId, imgUrl, titles, descriptions) => {
    try {
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
            alert("Success!");
        }).catch( (error) => {
            alert("Error!")
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
            alert("Success!");
        }).catch( (error) => {
            alert("Error!")
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
        console.log('No sliders found');
        return [];
    }
};

export { add_new_slider, get_sliders, delete_slider, add_stone_gallery_element, delete_stone_gallery_element, get_stone_gallery };
