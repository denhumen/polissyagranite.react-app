import { rtDatabase } from "../firebase-config";
import { ref, get, update, push, set, onValue, child } from "firebase/database";
import { deleteImage } from "./firebase-storage";

const add_new_slider = async (parentId, imgUrl, titles, descriptions) => {
    try {
        console.log("1:" + imgUrl);
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
        // Convert object of objects into an array of objects
        
        const list = Object.keys(slidersData).map(key => ({
            id: key,
            ...slidersData[key]
        }));
        console.log(list);
        return list;
    } else {
        console.log('No sliders found');
        return []; // Return an empty array if no sliders exist
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

export { add_new_slider, get_sliders, delete_slider };
