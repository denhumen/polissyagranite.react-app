import { rtDatabase } from "../firebase-config";
import { ref, get, update, push, set, onValue, child } from "firebase/database";

function createSliderData(imgUrl, titles, descriptions) {
    return {
        img_url: imgUrl,
        title: {
            en: titles.en,
            ua: titles.ua,
            pl: titles.pl
        },
        description: {
            en: descriptions.en,
            ua: descriptions.ua,
            pl: descriptions.pl
        }
    };
}

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

export { add_new_slider };
