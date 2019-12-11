/* global Vue */
/* global fetch */

var app = new Vue({
    el: '#app',
    
    data: {
        pokemon_name: '',
        pokemon_info: '',
        total_num_pokemon: 807,
        isSearchActive: false,
        isViewSavedActive: false,
        savedPokemon: [],
    },
    
    created() {
        this.isSearchActive = true;
        this.isViewSavedActive = false;
        this.savedPokemon = this.getSavedPokemon();
    },
    
    methods: {
        handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        },
        getPokeInfo() {
            if (this.pokemon_name === '') {
                return;
            }
            
            this.pokemon_info = '';
            
            fetch('/getPokemonInfo?p=' + this.pokemon_name)
                .then(this.handleErrors)
                .then((data) => {
                    return data.json();
                })
                .then((pokeInfo) => {
                    console.log(pokeInfo);
                    this.pokemon_info  = pokeInfo;
                    this.pokemon_name = pokeInfo.id;
                })
                .catch(error => {
                    console.log(error);
                    this.pokemon_info = {error:"Invalid Search :("};
                });
        },
        getRandomPoke() {
            let min = 1
            let max = this.total_num_pokemon;
            let rand_poke = Math.floor(Math.random() * (max - min + 1)) + min;
            this.pokemon_name = rand_poke;
            this.getPokeInfo();
        },
        getStatPercentage(val, max) {
            return "width: " + (Math.round((val/max) * 100)).toString() + "%";
        },
        clickedViewSaved() {
            this.isViewSavedActive = true;
            this.isSearchActive = false;
        },
        clickedSearch() {
            this.isViewSavedActive = false;
            this.isSearchActive = true;
        },
        async savePokemon() {
            // don't add if pokemon is already saved
            for (var i = 0; i < this.savedPokemon.length; i++) {
                if (this.savedPokemon[i].id_number === this.pokemon_name) {
                    console.log("this pokemon has already been saved");
                    return;
                }
            }
            
            try {
                let response = await axios.post('/api/items', {
                    number: this.pokemon_name,
                    pic: this.pokemon_info.sprites.front_default,
                });
                console.log("succesfully added pokemon " + this.pokemon_name);
                this.getSavedPokemon();
            } catch (error) {
                console.log(error);
            }
        },
        async getSavedPokemon() {
            // TODO call the get from the db  
            try {
                let response = await axios.get('/api/items');
                this.savedPokemon = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async removePokemon(id) {
            console.log("removing pokemon " + id);
            try {
                let response = await axios.delete('/api/items/' + id);
                this.getSavedPokemon();
            } catch (error) {
                console.log(error);
            }
        },
    },
});
