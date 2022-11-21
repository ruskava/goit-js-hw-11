import axios from "axios";

export default class PhotoApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.PER_PAGE = 40; 
    }
    
    async fetchPhotos() {
        const axiosOptions = {
            method: 'get',
            url: 'https://pixabay.com/api/',
            params: {
                key: "30275914-f3575409f1027748e0e65aacc",
                q: `${this.searchQuery}`,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: `${this.page}`,
                per_page: `${this.PER_PAGE}`,
            }
        };
        try {
            const response = await axios(axiosOptions);
            const data = response.data;
            this.incrementPage();
            return data;
        }
        catch (error) {
            console.error(error);
        }
        }
    incrementPage() {
        this.page += 1;
         }

    resetPage() { 
        this.page = 1;
    }
    get query(){
            return this.searchQuery;
    }
    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
}

    


